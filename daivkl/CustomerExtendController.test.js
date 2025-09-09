const sinon = require('sinon');
const { expect } = require('chai');
const dataCache = {}
const ENVSANBOX = sinon.createSandbox();
const mainCtrl = require('../../../api/controllers/CustomerExtendController');
const MESSAGE = 'UNITEST CUSTOM MESSAGE'
describe('CustExtCtr.CustomerExtendController', () => {
    afterEach(function () {
        ENVSANBOX.restore();
    })
    describe('CustExtCtr_01. createCustomer', () => {
        let req, res = null;
        afterEach(function () {
            ENVSANBOX.restore();
        })
        beforeEach(function () {
            req = { body: {}, info: { user: { id: 1 } } }
            res = { json: ENVSANBOX.spy(), systemError: ENVSANBOX.spy() }
        })
        it('CustExtCtr_01_01. should create a new customer successfully', async () => {
            ENVSANBOX.stub(CustomerExtend, 'createCustomer').resolves({ err: 0, data: [] })
            await mainCtrl.createCustomer(req, res)
            expect(res.json.calledOnce).to.be.true;
        })
        it('CustExtCtr_01_02. should return error', async () => {
            ENVSANBOX.stub(CustomerExtend, 'createCustomer').rejects(common.systemError())
            await mainCtrl.createCustomer(req, res)
            expect(res.systemError.calledOnce).to.be.true;
        })
    });
    describe('CustExtCtr_02. updateCustomer', () => {
        let req, res = null;
        beforeEach(function () {
            req = { body: {}, info: { user: { id: 1 } } }
            res = { json: ENVSANBOX.spy(), systemError: ENVSANBOX.spy() }
        })
        afterEach(function () {
            ENVSANBOX.restore();
        })
        it('CustExtCtr_02_01. should update a customer successfully', async () => {
            ENVSANBOX.stub(CustomerExtend, 'updateCustomer').resolves({ err: 0, data: [] })
            await mainCtrl.updateCustomer(req, res)
            expect(res.json.calledOnce).to.be.true;
        })
        it('CustExtCtr_02_02. should return error', async () => {
            ENVSANBOX.stub(CustomerExtend, 'updateCustomer').rejects(new Error(MESSAGE))
            await mainCtrl.updateCustomer(req, res)
            expect(res.systemError.calledOnce).to.be.true;
        })
    });
});