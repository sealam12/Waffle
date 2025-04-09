export class FetchWrapper {
    static fetch(url, method, headers, body) {
        const options = {
            method: method,
            headers: headers,
            body: body
        };
        return fetch(url, options);
    }
}
