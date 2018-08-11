let currentRoom = 'start';
const commands = ['go', 'pickup', 'look', 'talk'];
let inventory = [];

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
    if (inventory.length <= 0) {
        exportLog('<p>You are not carrying anything.</p>');
        return;
    }

    exportLog('<p>Here is your inventory: </p>');
    exportLog('<p><ul>');
    for (let i = 0; i < inventory.length; i++) {
        exportLog(`<li> ${inventory[i]} </li>`);
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
            exportLog('<p>Invalid command');
    }
}

/**
 * When the DOM is ready, execute
 * @param  {} document
 * @param  {} .ready(function(
 */
$(document).ready(function() {
    exportLog(start.description);

    /**
     * Get the key pressed.
     * If 'Enter' then get the value of input
     * @param  {} document
     * @param  {} .keypress(function(key
     */
    $(document).keypress(function(key) {
        if (key.which === 13 && $('#player-input').is(':focus')) {
            let value = $('#player-input').val().toLowerCase();
            $('#player-input').val('');
            playerInput(value);
        }
    });

});