// Base Room class
class Room {
    constructor(params) {
        this.name = params.name;
        this.description = params.description;
        this.examineDescription = params.examineDescription;
        this.directions = params.directions;
        this.items = params.items;
        this.npcs = params.npcs;
    }
}
// Example Room
// corridor = new Room ({
//     'name': 'corridor',
//     'description': '<p>You walk down a narrow corridor. Humming that same song you always hum when you get nervous.</p>',
//     'examineDescription': '<p>You looked around the room but did not find anything.</p>',
//     'directions': {
//         'north': 'clearing1',
//         'south': 'clearing2'
//     },
//     'items': [{ 
//         'name': 'key',
//         'description': 'You see a shiny metalic object in the far distance.',
//         'pickupDes': 'You walked towards the shiny metalic object and found a <b>key</b>!',
//         'taken': false
//     }, {
//         'name':  'bat',
//         'description': 'You see a wooden object with a baseball ingraved onto it.',
//         'pickupDes': 'You walked towards the wooden objet and found a baseball <b>bat</b>!',
//         'taken': false
//     }],
//     'npcs': {}
// }),

// Room Objects
const rooms = [
    start = new Room ({
        'name': 'start',
        'description': '<p>You see north and south</p>',
        'examineDescription': '<p>You looked around the room but did not find anything.</p>',
        'directions': {
            'north': 'clearing1',
            'south': 'clearing2'
        },
        'items': [],
        'npcs': {}
    }),
    
    clearing1 = new Room ({
        'name': 'clearing1',
        'description': '<p> You see a man running <b>west</b>. </p>',
        'examineDescription': '<p>You looked around the room but did not find anything.</p>',
        'directions': {
            'south': 'start',
            'west': 'road1'
        },
        'items': [],
        'npcs': {}
    }),
    
    clearing2 = new Room ({
        'name': 'clearing2',
        'description': '<p> You see a women running <b>west</b>. </p>',
        'examineDescription': '<p>You looked around the room but did not find anything.</p>',
        'directions': {
            'north': 'start',
            'west': 'road2'
        },
        'items': [],
        'npcs': {}
    })
];