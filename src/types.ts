export class WaffleResponse {
    code: number;
    body: any;
    statustext: string;
    contenttype: string;
    headers: Headers;

    constructor(code: number, body: any, contenttype: string, statustext: string, headers: Headers) {
        this.code = code;
        this.body = body;
        this.statustext = statustext;
        this.contenttype = contenttype;
        this.headers = headers;
    }

    // You can add methods to parse the body if needed
    async json() {
        return this.body instanceof Object ? this.body : JSON.parse(this.body);
    }
}

export class InvalidResponseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidResponseError"; // Set the error name
        Object.setPrototypeOf(this, InvalidResponseError.prototype); // Restore prototype chain
    }
}