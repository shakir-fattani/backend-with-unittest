const chai = require('chai');

chai.use(require('chai-http'));
chai.use(require('chai-asserttype'));
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));
chai.use(require('dirty-chai'));
chai.use(require('deep-equal-in-any-order'));
chai.use(require('chai-nock'));

module.exports = chai;
