const url = require('url');
const sinon = require('sinon');
const express = require('express');
const { config } = require('simple-node-framework').Singleton;

class MockApiGet {

    constructor(properties) {
        this.properties = properties;
        this.server;
        this.mockReturn;
        this.mockQueryParams;
        this.mockBodyParams;
    }

    getProperties() {
        return this.properties;
    }

    setMockReturn(value) {
        this.mockReturn = value;
    }

    async start() {
        const app = express();
        app.use(express.json());

        this.mockUrlConfig();
        this.initMocks();

        app.get(`/${this.properties.api}`, (request, response) => {
            const urlParts = url.parse(request.url, true);
            const { query } = urlParts;
            this.mockQueryParams({ ...query });
            this.mockBodyParams(request.body);

            return response
                .status(this.mockReturn.status || 200)
                .json(this.mockReturn.body);
        });

        this.server = await app.listen(this.properties.port);
    }

    mockUrlConfig() {
        this.setValueUrlConfig(`http://localhost:${this.properties.port}`);
    }

    setValueUrlConfig(value) {
        const fields = this.properties.urlConfig.split('.');

        let index = -1;

        const setField = (object) => {
            index += 1;
            if (index < fields.length - 2) {
                setField(object[fields[index]]);
                return;
            }
            const fatherField = object[fields[index]];
            const field = fields[index + 1];
            this.originalUrlConfig = fatherField[field];
            fatherField[field] = value;
        };

        setField(config);
    }

    initMocks() {
        this.mockQueryParams = sinon.stub();
        this.mockBodyParams = sinon.stub();
    }

    async close() {
        await this.server.close();
        this.recoverUrlConfig();
    }

    recoverUrlConfig() {
        this.setValueUrlConfig(this.originalUrlConfig);
    }

    getQueryParams() {
        return this.mockQueryParams;
    }

    getBodyParams() {
        return this.mockBodyParams;
    }

}

module.exports = MockApiGet;
