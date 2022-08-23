export default {
    frames: {
        idle: {
            frame: {x: 0, y: 0, w: 20, h: 20},
            sourceSize: {w: 20, h: 20},
            spriteSourceSize: {x: 0, y: 0, w: 20, h: 20}
        },
        walk_south1: {
            frame: {x: 0, y: 0, w: 20, h: 20},
            sourceSize: {w: 20, h: 20},
            spriteSourceSize: {x: 0, y: 0, w: 20, h: 20}
        },
        walk_south2: {
            frame: {x: 20, y: 0, w: 20, h: 20},
            sourceSize: {w: 20, h: 20},
            spriteSourceSize: {x: 0, y: 0, w: 20, h: 20}
        },
        walk_south3: {
            frame: {x: 40, y: 0, w: 20, h: 20},
            sourceSize: {w: 20, h: 20},
            spriteSourceSize: {x: 0, y: 0, w: 20, h: 20}
        },
        walk_south4: {
            frame: {x: 60, y: 0, w: 20, h: 20},
            sourceSize: {w: 20, h: 20},
            spriteSourceSize: {x: 0, y: 0, w: 20, h: 20}
        },
        walk_west1: {
            frame: {x: 0, y: 20, w: 20, h: 20},
            sourceSize: {w: 20, h: 20},
            spriteSourceSize: {x: 0, y: 0, w: 20, h: 20}
        },
        walk_west2: {
            frame: {x: 20, y: 20, w: 20, h: 20},
            sourceSize: {w: 20, h: 20},
            spriteSourceSize: {x: 0, y: 0, w: 20, h: 20}
        },
        walk_west3: {
            frame: {x: 40, y: 20, w: 20, h: 20},
            sourceSize: {w: 20, h: 20},
            spriteSourceSize: {x: 0, y: 0, w: 20, h: 20}
        },
        walk_west4: {
            frame: {x: 60, y: 20, w: 20, h: 20},
            sourceSize: {w: 20, h: 20},
            spriteSourceSize: {x: 0, y: 0, w: 20, h: 20}
        },
        walk_east1: {
            frame: {x: 0, y: 40, w: 20, h: 20},
            sourceSize: {w: 20, h: 20},
            spriteSourceSize: {x: 0, y: 0, w: 20, h: 20}
        },
        walk_east2: {
            frame: {x: 20, y: 40, w: 20, h: 20},
            sourceSize: {w: 20, h: 20},
            spriteSourceSize: {x: 0, y: 0, w: 20, h: 20}
        },
        walk_east3: {
            frame: {x: 40, y: 40, w: 20, h: 20},
            sourceSize: {w: 20, h: 20},
            spriteSourceSize: {x: 0, y: 0, w: 20, h: 20}
        },
        walk_east4: {
            frame: {x: 60, y: 40, w: 20, h: 20},
            sourceSize: {w: 20, h: 20},
            spriteSourceSize: {x: 0, y: 0, w: 20, h: 20}
        },
        walk_north1: {
            frame: {x: 0, y: 60, w: 20, h: 20},
            sourceSize: {w: 20, h: 20},
            spriteSourceSize: {x: 0, y: 0, w: 20, h: 20}
        },
        walk_north2: {
            frame: {x: 20, y: 60, w: 20, h: 20},
            sourceSize: {w: 20, h: 20},
            spriteSourceSize: {x: 0, y: 0, w: 20, h: 20}
        },
        walk_north3: {
            frame: {x: 40, y: 60, w: 20, h: 20},
            sourceSize: {w: 20, h: 20},
            spriteSourceSize: {x: 0, y: 0, w: 20, h: 20}
        },
        walk_north4: {
            frame: {x: 60, y: 60, w: 20, h: 20},
            sourceSize: {w: 20, h: 20},
            spriteSourceSize: {x: 0, y: 0, w: 20, h: 20}
        }
    },
    meta: {
        image: 'assets/sprites/character/player.png',
        format: 'RGBA8888',
        size: {w: 80, h: 80},
        scale: 1
    },
    animations: {
        walk_south: ['walk_south1', 'walk_south2', 'walk_south3', 'walk_south4'],
        walk_west: ['walk_west1', 'walk_west2', 'walk_west3', 'walk_west4'],
        walk_east: ['walk_east1', 'walk_east2', 'walk_east3', 'walk_east4'],
        walk_north: ['walk_north1', 'walk_north2', 'walk_north3', 'walk_north4'],
    }
}