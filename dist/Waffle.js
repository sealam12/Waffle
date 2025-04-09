import HttpClient from './HttpClient.js';
class Waffle {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.client = new HttpClient(baseUrl);
    }
    get(endpoint, options) {
        return this.client.get(endpoint, options);
    }
    post(endpoint, body, options) {
        return this.client.post(endpoint, body, options);
    }
}
export default Waffle;
