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

    it('Sem parametros, retorna objeto mockado', async () => {
        const config = {
            testeConfig: {
                api: { url: 'ola' }
            }
        };

        const properties = {
            urlConfig: 'testeConfig.api.url',
            config,
            api: 'mockGet',
            port: 2910
        };

        subject = new MockApiGet(properties);
        subject.setMockReturn({ body: { status: 'ok' } });

        assertThat(config.testeConfig.api.url).is.equal('ola');

        await subject.start();

        assertThat(config.testeConfig.api.url).is.equal('http://localhost:2910');

        const { data: retorno } = await newApi('http://localhost:2910').get('mockGet');

        assertThat(retorno).has.a.property('status', 'ok');

        await subject.close();

        assertThat(config.testeConfig.api.url).is.equal('ola');
    });

});
