import { expect } from 'chai';
import { Response } from 'supertest';

export class RequestValidator {
    private response: Response;

    constructor(response: Response) {
        this.response = response;
    }

    validateStatusCode = (expected: number) => {
        expect(this.response.statusCode).to.equal(expected);
        return this;
    };

    validateResponseBody = (expected: string) => {
        expect(this.response.body).to.equal(expected);
        return this;
    };

    validateContentType = (expected: string) => {
        expect(this.response.headers['content-type']).to.equal(expected);
        return this;
    };
}
