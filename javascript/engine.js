// TODO: Refactor these from being global
let currentRoom = 'start';
const commands = ['go', 'pickup', 'look', 'talk'];

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
        default:
            exportLog('<p>Invalid command</p>');
    }
}

function playerName(input) {
    if (player.name === 'Player') {
        player.name = input;

        // TODO: Refactor these appends
        $('#console-text1').append(`<p>You are ${player.name} </p>`);
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
            let value = $('#player-name').val().toLowerCase();
            $('#player-name').val('');
            playerName(value);
        }
    });

});