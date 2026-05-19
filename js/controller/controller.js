class AppController {
    constructor(containerId) {
        this._containerId = containerId
        this.domain =config.dev
        this.listUI = null
        this.barUI = null
        // used for page-content load
        this.page = location.pathname.split("/").pop();

        // Determine which page
        if (this.page === 'index.html' || this.page === '') {
            this.ajaxperiodic = new AJAXPeriodic(this.domain + "/data/proData.json")
        } else if (this.page === 'exp.html') {
            this.ajaxperiodic = new AJAXPeriodic(this.domain + "/data/expData.json")
        } else if (this.page === 'about.html') {
            this.ajaxperiodic = new AJAXPeriodic(this.domain + "/data/aboutData.json")
            this.ajaxBarChartperiodic = new AJAXPeriodic(this.domain + "/data/barChartData.json")
        }


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
        if (this.page === 'index.html' || this.page === '') {
            this.ajaxperiodic.dataReceived = this.updatesReceived.bind(this)
            this.ajaxperiodic.start()
            this.listUI = new ProjectListUI();
        } else if (this.page === 'exp.html') {
            this.ajaxperiodic.dataReceived = this.updatesReceived.bind(this)
            this.ajaxperiodic.start()
            this.listUI = new ExpListUI();
        } else if (this.page === 'about.html') {
            this.ajaxperiodic.dataReceived = this.updatesReceived.bind(this)
            this.ajaxBarChartperiodic.dataReceived = this.updateBarChart.bind(this)
            this.ajaxperiodic.start()
            this.ajaxBarChartperiodic.start()

            this.listUI = new AboutUI();
            this.barUI = new BarChartUI();
        }



        //   this.ajaxperiodic.stop();
    }


    updatesReceived(jsontext) {
        const res = JSON.parse(jsontext);
        if (!res) throw new ServerError()

        if (typeof res != "undefined") {
            if (this.page === 'index.html' || this.page === '') {
                this.listUI.clear();
                res.forEach((item) => {
                    this.listUI.addProject(item)
                })
            } else if (this.page === 'exp.html') {

                res.sort((a, b) => {
                    const dateA = new Date(a.serverTimeStamp.replace(/\u202F|\u00A0/g, ' ') // Replace non-breaking spaces with regular spaces
                        .replace(/\s+at\s+/i, ' ')  // Remove " at " (case-insensitive)
                        .trim());
                    const dateB = new Date(b.serverTimeStamp.replace(/\u202F|\u00A0/g, ' ')
                        .replace(/\s+at\s+/i, ' ')
                        .trim());
                    return dateB - dateA;
                });

                this.listUI.clear();
                res.forEach((item) => {
                    this.listUI.addExp(item);
                })
            } else if (this.page === 'about.html') {


                const storLang = localStorage.getItem('lang');
                this.aboutInfo = null;
                if (storLang) {
                    this.aboutInfo = res[storLang]
                } else {
                    this.aboutInfo = res.en; // default eng
                }

                this.listUI.clear();
                this.barUI.clear();
                this.listUI.addAbout(this.aboutInfo);
                this.barUI.addBarChart()

            }

        }
        return true
    }



    updateBarChart(jsontext) {
        const res = JSON.parse(jsontext);
        console.log(res);
        if (!res) throw new ServerError()

        if (typeof res != "undefined") {
             if (this.page === 'about.html') {
                this.barUI.clear();
                this.barUI.addBarChart(res)
            }

        }
        return true

    }
}