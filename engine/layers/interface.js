import Bag from "../world/bag.js";

export default class InterfaceContainer {
    container
    bag
    elements = new Map()
    init = false

    constructor() {
        this.container = new PIXI.Container()

        const bagsOrigin = { x: 530, y: 50, w: 400, h: 500 }
        this.bag = new Bag(bagsOrigin)
        this.bag.ready().then(() => {
            const bag = this.bag.update()

            this.elements.set("bags", bag)

            this.container.addChild(bag)

            this.init = true
            console.log("Interface is loaded")
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

    update = (...args) => {
        console.log("Update inventory", args[0])
    }
}