import playerData from "../../data/sprites/player.data.js"
import Spritesheet from "../sprites/spritesheet.js";
import {AnimatedSprite, Sprite} from "../sprites/sprite.js";
import Inventory from "../world/inventory.js";

export default class PlayerContainer {
    container
    sprites = {}
    currentSprite
    init = false
    inventory

    constructor() {
        this.container = new PIXI.Container()
        const spritesheet = new Spritesheet(playerData, () => {
            this.sprites.walkSouth = new AnimatedSprite(spritesheet.animations.walk_south)
            this.sprites.walkWest = new AnimatedSprite(spritesheet.animations.walk_west)
            this.sprites.walkEast = new AnimatedSprite(spritesheet.animations.walk_east)
            this.sprites.walkNorth = new AnimatedSprite(spritesheet.animations.walk_north)
            this.sprites.idle = new Sprite(spritesheet.textures.idle)
            this.setSprite(this.sprites.idle)
            this.inventory = new Inventory()
            this.init = true
            console.log("Player is loaded")
        })
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

    getContainer = () => {
        return this.container
    }

    removeSprite = (index = 0) => {
        try {
            this.container.removeChildAt(index)
        } catch (_) {
        }
    }

    addSprite = (sprite) => {
        try {
            this.container.addChild(sprite)
        } catch (_) {
            console.error(_)
        }
    }

    setSprite = (sprite) => {
        this.removeSprite()
        this.currentSprite = sprite
        this.addSprite(this.currentSprite)
        return this.currentSprite
    }

    setAnimatedSprite = (sprite) => {
        this.removeSprite()
        this.currentSprite = sprite
        this.currentSprite.play()
        this.addSprite(this.currentSprite)
        return this.currentSprite
    }

    idle = () => this.setSprite(this.sprites.idle)

    animateLeft = () => this.setAnimatedSprite(this.sprites.walkWest)

    animateRight = () => this.setAnimatedSprite(this.sprites.walkEast)

    animateUp = () => this.setAnimatedSprite(this.sprites.walkNorth)

    animateDown = () => this.setAnimatedSprite(this.sprites.walkSouth)

    addItem = (name, quantity) => this.inventory.add(name, quantity)
}