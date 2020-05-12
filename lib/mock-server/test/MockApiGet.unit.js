const axios = require('axios');
const chai = require('chai');
const { config } = require('simple-node-framework').Singleton;
const { expect: assertThat } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const MockApiGet = require('../MockApiGet');


let subject;


before(() => {
    chai.use(sinonChai);
});


describe('Mock Api Get', () => {

    beforeEach(() => {
    });

    afterEach(async () => {
        try {
            await subject.close();
            // eslint-disable-next-line no-empty
        } catch (error) { }

        sinon.restore();
    });

    const newApi = (url) => {
        return axios.create({
            baseURL: url,
        });
    };

    it('Sem parametros, retorna objeto mockado', async () => {
        config.testeConfig = {
            api: { url: 'ola' }
        };

        const properties = {
            urlConfig: 'testeConfig.api.url',
            api: 'mockGet',
            port: 2910
        };

        subject = new MockApiGet(properties);
        subject.setMockReturn({ status: 'ok' });

        assertThat(config.testeConfig.api.url).is.equal('ola');

        await subject.start();

        assertThat(config.testeConfig.api.url).is.equal('http://localhost:2910');

        const { data: retorno } = await newApi('http://localhost:2910').get('mockGet');

        assertThat(retorno).has.a.property('status', 'ok');

        await subject.close();

        assertThat(config.testeConfig.api.url).is.equal('ola');

    });

});
