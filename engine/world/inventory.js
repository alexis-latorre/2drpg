import EventDispatcher from "../core/eventDispatcher.js";

export default class Inventory {
    items

    constructor() {
        this.items = new Map()
    }

    add = (args) => {
        const name = args[0]
        const count = args.length > 1 ? args[1] : 1

        let amount = 0
        if (this.items.get(name)) amount = this.items.get(name)
        amount += count

        this.items.set(name, amount)
        EventDispatcher.getInstance().dispatch("player.inventory", "update")
    }

    getItems = () => {
        const items = []

        for (const key of this.items.keys()) {
            items.push({
                id: key,
                count: this.items.get(key)
            });
        }
        return items
    }
}