"use strict";

class AJAXPeriodic {
    constructor(url) {
        /* Public */
        this.getPathArray = null



        this.getData = null

        this.dataReceived = null

        /* Private */
        this._url = url
        this._ajax = new AJAXConnection(url)
        this._timer = null

        this._ajax.onsuccess = this.dataFromServer.bind(this)
    }

    start() {
        let data = null
        let pathArray = null
        if (typeof this.getData == "function") {
            data = this.getData()
        }
        if (typeof this.getPathArray == "function") {
            pathArray = this.getPathArray()
        }
        console.info('[AJAXPeriodic' + new Date() + '] Sending data')
        this._ajax.get(pathArray,data)
    }

    stop() {
        if (this._timer == null) throw new ApplicationError()
        console.info('[AJAXPeriodic' + new Date() + '] Cancelling periodic data')
        window.clearTimeout(this._timer)
    }

    dataFromServer(respons) {
        if (! this.dataReceived) return
        if (! this.dataReceived(respons)) return
        this._timer = window.setTimeout(this.start.bind(this),4000)
    }
}
