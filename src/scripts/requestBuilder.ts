import { agent as request, Test } from 'supertest';

import { requestOptions } from './run/types';

export class HttpRequest {
    public options: requestOptions;
    public req: Test;

    constructor(options: requestOptions) {
        this.options = options;
    }

    send() {
        return this.req;
    }
}

export class GetRequest extends HttpRequest {
    constructor(options: requestOptions) {
        super(options);
        this.req = request(this.options.environment).get(this.options.endpoint);
    }

    send(): Test {
        return super.send();
    }
}

export class PostRequest extends HttpRequest {
    constructor(options: requestOptions) {
        super(options);
        this.req = request(this.options.environment).post(this.options.endpoint);
    }

    setType() {
        this.req = this.req.type(this.options.type);
    }

    setBody() {
        this.req = this.req.send(this.options.body);
    }

    send(): Test {
        this.setType();
        this.setBody();
        return super.send();
    }
}

export class PutRequest extends HttpRequest {
    constructor(options: requestOptions) {
        super(options);
        this.req = request(this.options.environment).put(this.options.endpoint);
    }

    setType() {
        this.req = this.req.type(this.options.type);
    }

    setBody() {
        this.req = this.req.send(this.options.body);
    }

    send(): Test {
        this.setType();
        this.setBody();
        return super.send();
    }
}
