// Base Room class
class Room {
    constructor(params) {
        this.name = params.name;
        this.description = params.description;
        this.directions = params.directions;
        this.items = params.items;
        this.npcs = params.npcs;
    }
}

// Room Objects
const rooms = [
    start = new Room ({
        'name': 'start',
        'description': '<p> You are in a dark cold alleyway. You see a light in the <b>north</b> and a light at the <b>south</b>.</p>',
        'directions': {
            'north': 'clearing1',
            'south': 'clearing2'
        },
        'items': {},
        'npcs': {}
    }),
    
    clearing1 = new Room ({
        'name': 'clearing1',
        'description': '<p> You see a man running <b>west</b>. </p>',
        'directions': {
            'south': 'start',
            'west': 'road1'
        },
        'items': {},
        'npcs': {}
    }),
    
    clearing2 = new Room ({
        'name': 'clearing2',
        'description': '<p> You see a women running <b>west</b>. </p>',
        'directions': {
            'north': 'start',
            'west': 'road2'
        },
        'items': {},
        'npcs': {}
    })
];