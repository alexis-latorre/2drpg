import Spritesheet from "../sprites/spritesheet.js"
import terrainData from "../../data/sprites/terrain.data.js"

export default class TerrainContainer {
    container
    sprites = {}
    init = false

    constructor() {
        this.container = new PIXI.Container()
        const spritesheet = new Spritesheet(terrainData, () => {
            this.sprites = spritesheet.textures
            this.init = true
        })
    }

    loadData = (data) => {
        this.init = false
        data.forEach((line, y) => {
            line.forEach((square, x) => {
                this.addSprite(this.getSprite(square), x, y)
            })
        })
        this.init = true
    }

    getSprite = (code) => {
        return new PIXI.Sprite(this.sprites[Object.keys(this.sprites)[code]])
    }

    addSprite = (sprite, x = 0, y = 0) => {
        try {
            sprite.x = x * 20
            sprite.y = y * 20
            this.container.addChild(sprite)
        } catch (_) {
            console.error(_)
        }
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

    loadMap = (data) => new Promise((resolve, reject) => {
        this.loadData(data)
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
}