export class FetchWrapper {
    static fetch(url: string, method: string, headers: HeadersInit, body?: string) {
        const options: RequestInit = {
            method: method,
            headers: headers,
            body: body
        };

        return fetch(url, options);
    }
}