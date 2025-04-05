class AppController {
    constructor(containerId) {
        this._containerId = containerId
        this.listUI = null
        this.ajaxperiodic = new AJAXPeriodic("data.json")

    }

    getElements(classname) {
        let elms = document.getElementById(this._containerId).getElementsByClassName(classname)
        return [...elms]
    }

    getElement(classname) {
        let elms = document.getElementById(this._containerId).getElementsByClassName(classname)
        if (elms.length != 1) return null
        return elms[0]
    }

    run() {

        this.ajaxperiodic.dataReceived = this.updatesReceived.bind(this)

        this.listUI = new ProjectListUI()

         this.ajaxperiodic.start()
        this.ajaxperiodic.stop();

    }


    updatesReceived(jsontext) {
        const res = JSON.parse(jsontext);
        if (!res) throw new ServerError()

        if (typeof res != "undefined") {

            this.listUI.clear();
            res.forEach((item) => { this.listUI.addProject(item)  })
        }
        return true
    }
}