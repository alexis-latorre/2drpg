import Spritesheet from "../sprites/spritesheet.js"
import terrainData from "../../data/sprites/terrain.data.js"

export default class TerrainContainer {
    background
    container
    sprites = {}
    init = false
    obstacles

    constructor() {
        this.background = new PIXI.Container()
        this.container = new PIXI.Container()
        const spritesheet = new Spritesheet(terrainData, () => {
            this.sprites = spritesheet.textures
            this.init = true
            console.log("Terrain is loaded")
        })
    }

    loadData = (data) => {
        this.init = false
        this.obstacles = new Map()
        this.setBackground(data.level)
        data.getMap().forEach((line, y) => {
            line.forEach((square, x) => {
                this.addSprite(this.getSprite(square), x, y)
                this.obstacles.set(`${x}:${y}`, {
                    x, y, walkable: terrainData.frames[Object.keys(this.sprites)[square]].walkable
                })
            })
        })
        this.init = true
        console.log("Level is loaded")
    }

    getSprite = (code) => {
        return new PIXI.Sprite(this.sprites[Object.keys(this.sprites)[code]])
    }

    setBackground = (data) => {
        try {
            for (let y = -data.width * 2; y < data.width * 2; y++) {
                for (let x = -data.height * 2; x < data.height * 2; x++) {
                    const sprite = this.getSprite(data.surroundingTexture)
                    sprite.x = x * 20
                    sprite.y = y * 20
                    this.background.addChild(sprite)
                }
            }
        } catch (_) {
            console.error(_)
        }
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

    getBackground = () => {
        return this.background
    }
}