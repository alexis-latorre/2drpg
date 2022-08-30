import Player from "./player";
import TerrainContainer from "../layers/terrain.js";
import PlayerContainer from "../layers/player.js";
import InterfaceContainer from "../layers/interface.js";
import {Level} from "../../data/levels/levels.js";
import EventDispatcher from "../core/eventDispatcher.js";

export default class World {
    map
    player
    layers = {}
    ui = {}
    terrainLayer
    playerLayer
    interfaceLayer
    moving = false
    eventDispatcher
    init = false

    constructor(width, height, layers) {
        this.initWorld(width, height, layers).then()
    }

    initWorld = async (width, height) => {
        this.eventDispatcher = EventDispatcher.getInstance()
        this.map = new Map()
        this.terrainLayer = new TerrainContainer()
        this.layers["bg"] = this.terrainLayer.getBackground()
        this.layers["terrain"] = this.terrainLayer.getContainer()
        this.playerLayer = new PlayerContainer()
        this.layers["player"] = this.playerLayer.getContainer()

        await this.terrainLayer.ready()
        const level = new Level("level2")
        await this.terrainLayer.loadMap(level)
        await this.playerLayer.ready()
        this.eventDispatcher.register("player.items", this.playerLayer.inventory)


        this.interfaceLayer = new InterfaceContainer(this.playerLayer)
        await this.interfaceLayer.ready()
        this.ui["interface"] = this.interfaceLayer.getContainer()
        this.eventDispatcher.register("player.inventory", this.interfaceLayer.bag)

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.map.set(`${x}:${y}`, {
                    walkable: true
                })
            }
        }

        this.player = new Player(level.getPlayer().x, level.getPlayer().y)

        this.playerLayer.idle().x = this.player.pos.x * 20
        this.playerLayer.idle().y = this.player.pos.y * 20

        this.terrainLayer.obstacles.forEach(obstacle => {
            if (obstacle.walkable === false)
                this.editMap(obstacle.x, obstacle.y, {walkable: obstacle.walkable})
        })
        this.init = true
    }

    ready = () => new Promise((resolve, reject) => {
        setInterval(() => {
            if (this.init)
                resolve(true);
        }, 100);
        setTimeout(() => {
            reject("timeout")
        }, 10000)
    })

    editMap = (x, y, props) => {
        let initial = this.map.get(`${x}:${y}`)

        Object.keys(props).forEach(k => {
            initial[k] = props[k]
        })
        this.map.set(`${x}:${y}`, initial)
    }

    clone = (o) => Object.assign(Object.create(Object.getPrototypeOf(o)), o)

    getBackground = () => this.terrainLayer.getBackground()

    getLayers = () => Object.values(this.layers)

    getUiLayers = () => Object.values(this.ui)

    playerAbsoluteMove = (x, y) => {
        if (this.map.has(`${x}:${y}`) && this.map.get(`${x}:${y}`).walkable) {
            this.player.move(x, y)
            return true
        }
        return false
    }

    playerSpriteMove = (sprite, from, to) => {
        if (this.moving) return
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
            if (i > 19) {
                this.moving = false
                clearInterval(int)
            }
        }, 25)

    }

    moveLayers = (direction) => {
        this.getLayers().forEach(layer => {
            let i = 0

            const int = setInterval(() => {
                switch (direction) {
                    case "left":
                        layer.x++;
                        break;
                    case "right":
                        layer.x--;
                        break;
                    case "up":
                        layer.y++;
                        break;
                    case "down":
                        layer.y--;
                        break;
                }
                i++
                if (i > 19) clearInterval(int)
            }, 25)
        })
    }

    playerMoveLeft = () => {
        const sprite = this.playerLayer.animateLeft()

        if (this.playerAbsoluteMove(this.player.pos.x - 1, this.player.pos.y)) {
            this.playerSpriteMove(sprite, {
                x: this.player.pos.x + 1,
                y: this.player.pos.y
            }, {
                x: this.player.pos.x,
                y: this.player.pos.y
            })
            this.moveLayers("left")
        } else
            this.playerSpriteMove(sprite, {
                x: this.player.pos.x,
                y: this.player.pos.y
            }, {
                x: this.player.pos.x,
                y: this.player.pos.y
            })
    }

    playerMoveRight = () => {
        const sprite = this.playerLayer.animateRight()

        if (this.playerAbsoluteMove(this.player.pos.x + 1, this.player.pos.y)) {
            this.playerSpriteMove(sprite, {
                x: this.player.pos.x - 1,
                y: this.player.pos.y
            }, {
                x: this.player.pos.x,
                y: this.player.pos.y
            })
            this.moveLayers("right")
        } else
            this.playerSpriteMove(sprite, {
                x: this.player.pos.x,
                y: this.player.pos.y
            }, {
                x: this.player.pos.x,
                y: this.player.pos.y
            })
    }

    playerMoveUp = () => {
        const sprite = this.playerLayer.animateUp()

        if (this.playerAbsoluteMove(this.player.pos.x, this.player.pos.y - 1)) {
            this.playerSpriteMove(sprite, {
                x: this.player.pos.x,
                y: this.player.pos.y + 1
            }, {
                x: this.player.pos.x,
                y: this.player.pos.y
            })
            this.moveLayers("up")
        } else
            this.playerSpriteMove(sprite, {
                x: this.player.pos.x,
                y: this.player.pos.y
            }, {
                x: this.player.pos.x,
                y: this.player.pos.y
            })
    }

    playerMoveDown = () => {
        const sprite = this.playerLayer.animateDown()

        if (this.playerAbsoluteMove(this.player.pos.x, this.player.pos.y + 1)) {
            this.playerSpriteMove(sprite, {
                x: this.player.pos.x,
                y: this.player.pos.y - 1
            }, {
                x: this.player.pos.x,
                y: this.player.pos.y
            })
            this.moveLayers("down")
        } else
            this.playerSpriteMove(sprite, {
                x: this.player.pos.x,
                y: this.player.pos.y
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

        this.moving = false
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

    toggleInterface = (name) => {
        this.interfaceLayer.toggle(name)
    }

    getEventDispatcher = () => this.eventDispatcher
}