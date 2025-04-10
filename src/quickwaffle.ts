import { FetchWrapper } from "./http.js"
import { WaffleResponse } from "./types.js";
import { Utils } from "./utils.js";

class QuickWaffle {
    static async Get(url: string, headers: Headers = new Headers()): Promise<WaffleResponse> {
        const response = await FetchWrapper.fetch(url, "GET", headers);

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

    private async GenericPost(method: string, url: string, body: any, headers: Headers): Promise<WaffleResponse> {
        const response = await FetchWrapper.fetch(url, method, headers, body);

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

export default QuickWaffle;