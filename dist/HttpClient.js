class HttpClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    async get(endpoint, options) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'GET',
            ...options,
        });
        return this.handleResponse(response);
    }
    async post(endpoint, body, options) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            body: JSON.stringify(body),
            ...options,
        });
        return this.handleResponse(response);
    }
    async handleResponse(response) {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'An error occurred');
        }
        return { data, status: response.status };
    }
}
export default HttpClient;
