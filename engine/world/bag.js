import Spritesheet from "../sprites/spritesheet.js";
import itemsData from "../../data/sprites/items.data.js";
import EventDispatcher from "../core/eventDispatcher.js";

export default class Bag {
    bag
    graphicsOrigin
    sprites
    bagItems
    init = false

    constructor(graphicsOrigin) {
        this.graphicsOrigin = graphicsOrigin
        const spritesheet = new Spritesheet(itemsData, () => {
            this.sprites = spritesheet.textures
            this.bag = new PIXI.Graphics()
            this.bag.beginFill(0x402206)
                .drawRect(this.graphicsOrigin.x, this.graphicsOrigin.y, this.graphicsOrigin.w, this.graphicsOrigin.h)
                .endFill()
            const style = new PIXI.TextStyle({
                fill: 0xF7C43D,
                fontFamily: "Tahoma",
                fontWeight: "bold",
                strokeThickness: 2
            });
            const text = new PIXI.Text('Bag', style);
            text.x = this.graphicsOrigin.x + 10
            text.y = this.graphicsOrigin.y + 2
            this.bag.addChild(text)
            this.bag.visible = false
            this.init = true
        })
    }

    update = () => {
        if (this.bagItems) this.bagItems.destroy()
        this.bagItems = new PIXI.Container()
        const items = EventDispatcher.getInstance().dispatch("player.items", "getItems")

        items.forEach((item, i) => {
            const itemContainer = new PIXI.Container()
            const sprite = new PIXI.Sprite(this.sprites[item.id])
            sprite.x = this.graphicsOrigin.x + 10 + i * 40
            sprite.y = this.graphicsOrigin.y + 100

            const style = new PIXI.TextStyle({
                fill: 0xF7C43D,
                fontFamily: "Arial",
                fontSize: 12,
                fontWeight: "normal",
                strokeThickness: 2
            });
            const text = new PIXI.Text('x' + item.count, style);
            text.x = sprite.x + 28 - text.width
            text.y = sprite.y + 18

            itemContainer.addChild(sprite)
            itemContainer.addChild(text)
            itemContainer.interactive = true
            itemContainer.buttonMode = true

            itemContainer.on('pointerdown', () => {
                console.log("hello")
            })

            this.bagItems.addChild(itemContainer)
        })

        this.bag.addChild(this.bagItems)
        return this.bag
    }

    toggle = () => {
        console.log("Toggle bag")
        this.bag.visible = !this.bag.visible
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
}