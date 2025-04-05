"use strict";

class ServerError extends Error {
    constructor(message = "Connection to server failed") {
        super(message)
        this.name = "ServerError"
    }
}

class ApplicationError extends Error {
    constructor(message = "Application error") {
        super(message)
        this.name = "ServerError"
    }
}

class IllegalUseError extends Error {
    constructor(message = "Application was not used as intended") {
        super(message)
        this.name = "IllegalUseError"
    }
}
