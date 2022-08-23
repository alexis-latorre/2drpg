export class Sprite {
    sprite

    constructor(texture) {
        this.sprite = new PIXI.Sprite.from(texture)
        return this.sprite
    }
}

export class AnimatedSprite {
    sprite

    constructor(texture, speed = 0.125) {
        this.sprite = new PIXI.AnimatedSprite(texture)
        this.sprite.animationSpeed = speed
        return this.sprite
    }
}