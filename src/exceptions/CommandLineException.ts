// type CommandLineException = { msg: string };

class CommandLineException extends Error {
    constructor(msg) {
        super();
        this.name = 'CommandLineException';
        this.message = msg;
    }
}

export default CommandLineException;

