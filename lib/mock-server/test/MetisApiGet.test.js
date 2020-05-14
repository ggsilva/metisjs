const axios = require('axios');
const chai = require('chai');
const { expect: assertThat } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const MockApiGet = require('../MetisApiGet');


let subject;


before(() => {
    chai.use(sinonChai);
});


describe('Metis Api Get', () => {

    beforeEach(() => {
    });

    afterEach(async () => {
        try {
            await subject.close();
        } catch (error) { }

        sinon.restore();
    });

    const newApi = (url) => {
        return axios.create({
            baseURL: url,
        });
    };

    it('No paramns, return mock object', async () => {
        const config = {
            testConfig: {
                api: { url: 'hello' }
            }
        };

        const properties = {
            urlConfig: 'testConfig.api.url',
            config,
            api: 'mockGet',
            port: 2910
        };

        subject = new MockApiGet(properties);
        subject.setMockReturn({ body: { status: 'ok' } });

        assertThat(config.testConfig.api.url).is.equal('hello');

        await subject.start();

        assertThat(config.testConfig.api.url).is.equal('http://localhost:2910');

        const { data: retorno } = await newApi('http://localhost:2910').get('mockGet');

        assertThat(retorno).has.a.property('status', 'ok');

        await subject.close();

        assertThat(config.testConfig.api.url).is.equal('hello');
    });

    it('No paramns, return mock object, without url config', async () => {
        const properties = {
            api: 'mockGet',
            port: 2910
        };

        subject = new MockApiGet(properties);
        subject.setMockReturn({ body: { status: 'ok' } });

        await subject.start();

        const { data: retorno } = await newApi('http://localhost:2910').get('mockGet');

        assertThat(retorno).has.a.property('status', 'ok');

        await subject.close();
    });

});
