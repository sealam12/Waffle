import { FetchWrapper } from "./http.js";
import { WaffleResponse } from "./types.js";
import { Utils } from "./utils.js";
export class Waffle {
    constructor(baseurl, headers = new Headers()) {
        this.baseurl = baseurl;
        this.headers = headers;
    }
    CombineHeaders(NewHeaders) {
        const NewH = new Headers(this.headers);
        NewHeaders.forEach((value, key) => {
            NewH.append(key, value);
        });
        return NewH;
    }
    async Get(endpoint, headers = new Headers()) {
        const combinedHeaders = this.CombineHeaders(headers);
        const response = await FetchWrapper.fetch(`${this.baseurl}${endpoint}`, "GET", combinedHeaders);
        const code = response.status;
        const statusText = response.statusText;
        const contentType = Utils.GetContentType(response);
        let responseBody;
        if (contentType.includes('application/json')) {
            responseBody = await response.json();
        }
        else {
            responseBody = await response.text();
        }
        return new WaffleResponse(code, responseBody, statusText, contentType, response.headers);
    }
    async GenericPost(method, endpoint, body, headers) {
        const response = await FetchWrapper.fetch(`${this.baseurl}${endpoint}`, "POST", headers, JSON.stringify(body));
        const code = response.status;
        const statusText = response.statusText;
        const contentType = Utils.GetContentType(response);
        let responseBody;
        if (contentType.includes('application/json')) {
            responseBody = await response.json();
        }
        else {
            responseBody = await response.text();
        }
        return new WaffleResponse(code, responseBody, statusText, contentType, response.headers);
    }
    async Post(endpoint, body, headers = new Headers()) {
        return this.GenericPost("POST", endpoint, body, headers);
    }
}
