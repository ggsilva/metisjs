const MockApiGet = require('./MockApiGet');


class MockApiBuilder {

    constructor() {
        this.urlConfig;
        this.api;
        this.port;
        this.verb;
    }

    setUrlConfig(urlConfig) {
        this.urlConfig = urlConfig;
        return this;
    }

    setApi(api) {
        this.api = api;
        return this;
    }

    setPort(port) {
        this.port = port;
        return this;
    }

    isGet() {
        this.port = 'GET';
        return this;
    }

    build() {
        const properties = {
            urlConfig: this.urlConfig,
            api: this.api,
            port: this.port
        };
        return new MockApiGet(properties);
    }

}

module.exports = MockApiBuilder;
