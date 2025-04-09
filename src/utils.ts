import { InvalidResponseError } from "./types.js";

export class Utils {
    static GetContentType(response: Response): string {
        let contentType: string;
        const contentTypeHeader = response.headers.get('content-type');

        if (contentTypeHeader !== null) {
            contentType = contentTypeHeader;
        } else {
            throw new InvalidResponseError("Invalid contentType");
        }

        return contentType;
    }
}