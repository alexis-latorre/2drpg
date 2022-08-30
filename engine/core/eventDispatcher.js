export default class EventDispatcher {
    static instance
    registry

    constructor() {
        this.registry = new Map()
    }

    static getInstance = () => {
        if (!EventDispatcher.instance) EventDispatcher.instance = new EventDispatcher()

        return EventDispatcher.instance
    }

    register = (name, object) => {
        this.registry.set(name, object)
        console.log(name, "registered")
    }

    getRegistry = (name) => this.registry.get(name)

    dispatch = (name, functionName, ...args) => {
        try {
            return this.registry.get(name)[functionName](args)
        } catch (e) {
            console.error(e)
        }
    }
}