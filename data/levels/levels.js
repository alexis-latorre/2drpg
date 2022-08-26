import jsonLevels from "./levels.json"

export class LevelManager {
    static instance
    levels = new Map()

    constructor() {
        jsonLevels.forEach(level => {
            this.levels.set(level.id, level)
        })
    }

    static getInstance = () => {
        if (!LevelManager.instance) LevelManager.instance = new LevelManager()

        return LevelManager.instance
    }

    getLevel = (name) => {
        return this.levels.get(name)
    }
}

export class Level {
    level

    constructor(name) {
        const lm = LevelManager.getInstance()
        this.level = lm.getLevel(name)
    }

    getMap = () => {
        const map = []

        for (let i = 0; i < this.level.height; i++) {
            map.push((this.level.map.substring(i * this.level.width, i * this.level.width + this.level.width)).split(""))
        }
        return map
    }

    getPlayer = () => this.level.player
}