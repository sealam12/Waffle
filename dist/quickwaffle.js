import { FetchWrapper } from "./http.js";
import { WaffleResponse } from "./types.js";
import { Utils } from "./utils.js";
class QuickWaffle {
    static async Get(url, headers = new Headers()) {
        const response = await FetchWrapper.fetch(url, "GET", headers);
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
    async GenericPost(method, url, body, headers) {
        const response = await FetchWrapper.fetch(url, method, headers, JSON.stringify(body));
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
export default QuickWaffle;
