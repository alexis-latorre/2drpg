import Player from "./player";
import TerrainContainer from "../layers/terrain.js";
import PlayerContainer from "../layers/player.js";

export default class World {

    level = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 8, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 6, 6, 6, 6, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 8, 6, 6, 6, 6, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 8, 8, 6, 6, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1, 6, 6, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 3, 3, 3, 3, 2, 2, 0, 0, 0, 1, 8, 8, 8, 8, 8, 6, 6, 6, 6, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 3, 3, 3, 3, 2, 2, 2, 2, 0, 0, 1, 1, 0, 8, 8, 8, 8, 6, 6, 6, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 3, 3, 3, 2, 2, 2, 2, 0, 0, 0, 1, 0, 8, 8, 8, 8, 8, 6, 6, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 3, 1, 1, 3, 3, 2, 2, 2, 2, 2, 0, 0, 1, 1, 8, 8, 8, 8, 8, 6, 6, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 3, 3, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 1, 8, 8, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 1, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3, 3, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 3, 3, 3, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 3, 3, 3, 3, 2, 2, 0, 2, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2, 2, 2, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

    map
    player
    layers = {}
    terrainLayer
    playerLayer

    constructor(width, height, layers) {
        this.init(width, height, layers).then()
    }

    init = async (width, height, layers) => {
        this.map = new Map()
        this.terrainLayer = new TerrainContainer()
        this.layers["terrain"] = this.terrainLayer.getContainer()
        this.playerLayer = new PlayerContainer()
        this.layers["player"] = this.playerLayer.getContainer()

        await this.terrainLayer.ready()
        await this.terrainLayer.loadMap(this.level)
        await this.playerLayer.ready()

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.map.set(`${x}:${y}`, {
                    texture: "grass",
                    walkable: true
                })
            }
        }

        this.player = new Player(Math.floor(width / 2), Math.floor(height / 2))
        this.ghost = this.clone(this.player)

        this.playerLayer.idle().x = this.player.pos.x * 20
        this.playerLayer.idle().y = this.player.pos.y * 20

        this.editMap(2, 10, {walkable: false})

        setInterval(() => {
            if (!this.player.equals(this.ghost)) {
                this.editMap(this.player.pos.x, this.player.pos.y, {occupied: true})
                this.ghost = this.clone(this.player)
            }
        }, 50)
    }

    editMap = (x, y, props) => {
        let initial = this.map.get(`${x}:${y}`)

        Object.keys(props).forEach(k => {
            initial[k] = props[k]
        })
        this.map.set(`${x}:${y}`, initial)
    }

    clone = (o) => Object.assign(Object.create(Object.getPrototypeOf(o)), o)

    getLayers = () => Object.values(this.layers)

    playerAbsoluteMove = (x, y) => {
        if (this.map.has(`${x}:${y}`) && this.map.get(`${x}:${y}`).walkable) {
            this.player.move(x, y)
            return true
        }
        return false
    }

    playerSpriteMove = (sprite, from, to) => {
        sprite.x = from.x * 20
        sprite.y = from.y * 20
        const xFrames = to.x - from.x
        const yFrames = to.y - from.y

        let i = 0

        const int = setInterval(() => {
            if (xFrames !== 0)
                sprite.x = from.x * 20 + i * xFrames
            else sprite.x = to.x * 20

            if (yFrames !== 0)
                sprite.y = from.y * 20 + i * yFrames
            else sprite.y = to.y * 20
            i++
            if (i > 19) clearInterval(int)
        }, 25)
    }

    playerMoveLeft = () => {
        const sprite = this.playerLayer.animateLeft()

        if (this.playerAbsoluteMove(this.player.pos.x - 1, this.player.pos.y))
            this.playerSpriteMove(sprite, {
                x: this.player.pos.x + 1,
                y: this.player.pos.y
            }, {
                x: this.player.pos.x,
                y: this.player.pos.y
            })
    }

    playerMoveRight = () => {
        const sprite = this.playerLayer.animateRight()

        if (this.playerAbsoluteMove(this.player.pos.x + 1, this.player.pos.y))
            this.playerSpriteMove(sprite, {
                x: this.player.pos.x - 1,
                y: this.player.pos.y
            }, {
                x: this.player.pos.x,
                y: this.player.pos.y
            })
    }

    playerMoveUp = () => {
        const sprite = this.playerLayer.animateUp()

        if (this.playerAbsoluteMove(this.player.pos.x, this.player.pos.y - 1))
            this.playerSpriteMove(sprite, {
                x: this.player.pos.x,
                y: this.player.pos.y + 1
            }, {
                x: this.player.pos.x,
                y: this.player.pos.y
            })
    }

    playerMoveDown = () => {
        const sprite = this.playerLayer.animateDown()

        if (this.playerAbsoluteMove(this.player.pos.x, this.player.pos.y + 1))
            this.playerSpriteMove(sprite, {
                x: this.player.pos.x,
                y: this.player.pos.y - 1
            }, {
                x: this.player.pos.x,
                y: this.player.pos.y
            })
    }

    playerMove = (keys) => {
        const filtered = Object.keys(keys).filter(k => {
            if (keys[k] === true) return k
            return false
        })
        if (filtered.length === 0) {
            const sprite = this.playerLayer.idle()
            sprite.x = this.player.pos.x * 20
            sprite.y = this.player.pos.y * 20
            return
        }

        switch (filtered[0]) {
            case "q":
                this.playerMoveLeft();
                break
            case "z":
                this.playerMoveUp();
                break
            case "d":
                this.playerMoveRight();
                break
            case "s":
                this.playerMoveDown();
                break
            default:
                break
        }
    }
}