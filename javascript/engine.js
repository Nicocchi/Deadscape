// TODO: Refactor these from being global
let currentRoom = 'start';
const commands = ['go', 'pickup', 'examine', 'talk'];

/**
 * Appends the game's text onto the DOM elements
 * @param  {} value
 */
function exportLog(value) {
    $('#console-text').append(value);
}

/**
 * Changes the room
 * @param  {} dir
 */
function changeRoom(dir) {

    const cr = currentRoom;

    const room = rooms.filter(roo => roo.name.includes(cr));

    if (room[0].directions[dir] !== undefined) {
        currentRoom = room[0].directions[dir];
        const nextRoom = rooms.filter(roo => roo.name.includes(currentRoom));
        exportLog(nextRoom[0].description);
    }
    else {
        exportLog('<p>You cannot go that way</p>');
    }
}

/**
 * Show the help menu
 */
function showHelp() {
    exportLog('<p>Here is your inventory: </p>');
    exportLog('<p><ul>');
    for (let i = 0; i < commands.length; i++) {
        exportLog(`<li> ${commands[i]} </li>`);
    }
    exportLog('</ul></p>');
}

/**
 * Examines the room for any objects and returns
 * the first description of any object not picked up.
 */
function examineRoom() {
    const room = rooms.filter(roo => roo.name.includes(currentRoom));

    // Check if room is undefined/empty and return the room's examine description.
    if (room[0].items <= 0 || room[0].items === undefined) {
        exportLog(room[0].examineDescription);
        return;
    }

    let items = [];
    
    // Check each element for an object and return the object's description.
    room[0].items.forEach(function(element) {
        if (element.taken === false) {
            items.push(element.description);
        }
    });

    exportLog(`<p>${items[0]}</p>`);

}

// Pickup's an object if it is in the room
function pickup(name) {
    const room = rooms.filter(roo => roo.name.includes(currentRoom));
    if (room[0].items <= 0 || room[0].items === undefined) {
        exportLog('<p>You looked around the room but did not find anything to pickup.</p>');
        return;
    }

    let item = [];

    /**
     *  Loop through each item and if it exists and is not taken
     *  then add it to the inventory, and make the 'taken' property
     * to true.
     */
    room[0].items.forEach(function(element) {
        if (element.taken === false && element.name === name) {
            player.inventory.push(element.name);
            element.taken = true;
            item.push(element.name);
            exportLog(`<p>${element.pickupDes}</p>`);
        }
    }); 
    
    if (item === undefined || item.length <= 0) {
        return exportLog(`<p>You looked for a <b>${name}</b> and could not find it.</p>`);
    }
}

/**
 * Show the inventory menu
 */
function showInventory() {
    if (player.inventoryIsEmpty()) {
        exportLog('<p>You are not carrying anything.</p>');
        return;
    }

    exportLog('<p>Here is your inventory: </p>');
    exportLog('<p><ul>');
    for (let i = 0; i < player.inventory.length; i++) {
        exportLog(`<li> ${player.inventory[i]} </li>`);
    }
    exportLog('</ul></p>');
}

/**
 * Get the room and change it
 * @param  {} input
 */
function playerInput(input) {
    const command = input.split(' ')[0];

    player.moves =+ 1;
    $('#status-moves').text(`Moves: ${player.moves}`);

    switch(command) {
        case 'go':
            const dir = input.split(' ')[1];
            changeRoom(dir);
        break;
        case 'help':
            showHelp();
        break;
        case 'inventory':
            showInventory();
        break;
        case 'examine':
            examineRoom();
        break;
        case 'pickup':
            const item = input.split(' ')[1];
            pickup(item);
        break;
        default:
            exportLog('<p>Invalid command</p>');
    }
}

function playerName(input) {
    if (player.name === 'Player') {
        player.name = input;

        // TODO: Refactor these appends
        $('#console-text1').append(`<p>You are <b>${player.name}</b> </p>`);
        $('#player-name').attr('placeholder','Please type your command...');
        $('#console-text1').append(`<p>Type start to start the game.</p>`);
        return;
    }

    switch(input) {
        case 'start':
            $('#player-creation').remove();
            $('#play-area').css('visibility', 'visible');
            $('#player-input').val('');
            setTimeout(function() {$('#player-input').focus();}, 10);
            exportLog(start.description);
            player.ready = true;
        break;
        default:
            $('#console-text1').append(`<p>Invalid command</p>`);
    }
}


/**
 * When the DOM is ready, execute
 * @param  {} document
 * @param  {} .ready(function(
 */
$(document).ready(function() {
    /**
     * Get the key pressed.
     * If 'Enter' then get the value of input
     * @param  {} document
     * @param  {} .keypress(function(key
     */
    $(document).keypress(function(key) {
        if (key.which === 13 && $('#player-input').is(':focus')) {
            if (player.ready) {
                let value = $('#player-input').val().toLowerCase();
                $('#player-input').val('');
                playerInput(value);
            }
        } else if (key.which === 13 && $('#player-name').is(':focus')) {
            let value = $('#player-name').val();
            $('#player-name').val('');
            playerName(value);
        }
    });

});