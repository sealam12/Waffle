import { FetchWrapper } from "./http.js"
import { WaffleResponse } from "./types.js";
import { Utils } from "./utils.js";

export class Waffle {
    baseurl: string;
    headers: Headers;

    constructor(baseurl: string, headers: Headers = new Headers()) {
        this.baseurl = baseurl;
        this.headers = headers;
    }

    private CombineHeaders(NewHeaders: Headers): Headers {
        const NewH = new Headers(this.headers);
        NewHeaders.forEach((value, key) => {
            NewH.append(key, value);
        });

        return NewH;
    }

    AddHeader(name: string, value: string) { this.headers.append(name, value) }
    ExtendHeaders(headers: Headers) { this.headers = this.CombineHeaders(headers) }

    async Get(endpoint: string, headers: Headers = new Headers()): Promise<WaffleResponse> {
        const combinedHeaders = this.CombineHeaders(headers);
        const response = await FetchWrapper.fetch(`${this.baseurl}${endpoint}`, "GET", combinedHeaders);

        const code = response.status;
        const statusText = response.statusText;
        const contentType = Utils.GetContentType(response);

        let responseBody: any;
        if (contentType.includes('application/json')) {
            responseBody =  await response.json();
        } else {
            responseBody = await response.text();
        }

        return new WaffleResponse(code, responseBody, statusText, contentType, response.headers);
    }

    private async GenericPost(method: string, endpoint: string, body: any, headers: Headers): Promise<WaffleResponse> {
        const response = await FetchWrapper.fetch(`${this.baseurl}${endpoint}`, "POST", headers, body);

        const code = response.status;
        const statusText = response.statusText;
        const contentType = Utils.GetContentType(response);
        
        let responseBody: any;
        if (contentType.includes('application/json')) {
            responseBody =  await response.json();
        } else {
            responseBody = await response.text();
        }

        return new WaffleResponse(code, responseBody, statusText, contentType, response.headers);
    }

    async Post(endpoint: string, body: any, headers: Headers = new Headers()): Promise<WaffleResponse> {
        return this.GenericPost("POST", endpoint, body, headers);
    }
}