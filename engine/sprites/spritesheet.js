export default class Spritesheet {
    animations
    textures

    constructor(spriteData, callback) {
        this.spritesheet = new PIXI.Spritesheet(
            PIXI.BaseTexture.from(spriteData.meta.image),
            spriteData
        )
        this.spritesheet.parse().then(callback)

        return this.spritesheet
    }
}