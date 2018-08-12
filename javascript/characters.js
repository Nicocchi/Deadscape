// Base Character Class
// TODO: Add more methods
// TODO: Finish setters and getters
class Character {
    constructor(params) {
        this.charName = params.charName;
        this.charInventory = params.charInventory;
        this.charLeftHand = params.charLeftHand;
        this.charRightHand = params.charRightHand;
        this.charReady = params.charReady;
    }

    get name() {
        return this.charName;
    }
    set name(newName) {
        this.charName = newName;
    }

    get ready() { 
        return this.charReady;
    }
    set ready(bool) { 
        this.charReady = bool; 
    }

    get inventory() {
        return this.charInventory;
    }

    set inventory(item) {
        this.charInventory.push(item);
    }

    removeItem(item) {
        if (this.charInventory.includes(item)) {
            this.charInventory.splice(this.charInventory.indexOf(item));
        } else {
            console.log(`Failed to remove item ${item}. Check whether ${item} is in the iventory array or not.`);
        }
    }
}

// Character Objects
let player = new Character ({
    'charName': 'Player',
    'charInventory': [],
    'charLeftHand': 'nothing',
    'charRightHand': 'nothing',
    'charReady': false
});