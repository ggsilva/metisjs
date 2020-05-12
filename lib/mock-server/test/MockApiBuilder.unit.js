const chai = require('chai');
const { expect: assertThat } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const MockApiBuilder = require('../MockApiBuilder');
const MockApiGet = require('../MockApiGet');


let subject;


before(() => {
    chai.use(sinonChai);
});


describe('Mock Api Server', () => {

    beforeEach(() => {
        subject = new MockApiBuilder();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('isGet', async () => {
        const mockApi = subject
            .isGet()
            .setUrlConfig('apiConfig.url')
            .setApi('api/urlMock')
            .setPort(2910)
            .build();

        assertThat(mockApi).is.instanceOf(MockApiGet);
        assertThat(mockApi.getProperties()).has.a.property('urlConfig', 'apiConfig.url');
        assertThat(mockApi.getProperties()).has.a.property('api', 'api/urlMock');
        assertThat(mockApi.getProperties()).has.a.property('port', 2910);
    });

});
