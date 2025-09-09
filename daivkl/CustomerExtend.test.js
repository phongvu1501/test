const sinon = require('sinon');
const { expect } = require('chai');
// Mock constants
const { createStore, destroyStore } = require('../models/GlobalFunc.test')
const ENVSANBOX = sinon.createSandbox();
const MESSAGE = 'UNITEST MESSAGE CUSTOM';
const dataCache = {
    info: null,
    customerObj: null
}
describe('CustExt.CustomerExtend', () => {
    before(async () => {
        dataCache.info = await createStore();
        dataCache.info.user = { id: 1, name: 'unitest', phone: '0987654321' }
    });
    beforeEach(() => {
    });
    afterEach(() => {
        ENVSANBOX.restore();
    });
    after(async () => {
        await destroyStore(dataCache.info);
        await Customer.destroy({ PARTNERREFID: dataCache.info.PARTNERREFID });
    })

    describe('CustExt_01. validateFormData', () => {
        afterEach(async () => {
            ENVSANBOX.restore();
        });
        const typeAction = 'create';
        it('CustExt_01_01. should validate required fields successfully', async () => {
            const client = {
                PARTNERREFID: 1,
                branch: 1,
                PARTNERREFINFO: { groupCustomerSystem: 1 },
                user: { id: 1 }
            };
            const dataInput = {
                type: Customer.TYPE.PERSONAL,
                name: 'Test Customer',
                phone: '0123456789',
                birthday: '2000-01-01',
                groupCustomer: [{ id: 1 }],
                address: 'Test Address',
                province: { id: 1 },
                district: { id: 1 },
                ward: { id: 1 },
                gender: 1,
                email: 'test@example.com',
                facebook: 'facebook.com/test',
                description: 'Test description'
            };
            ENVSANBOX.stub(common, 'validateArrayField').returns({ err: 0, data: dataInput });
            const result = await CustomerExtend.validateFormData(dataInput, client, typeAction);
            expect(result.err).to.equal(0);
            expect(result.data.name).to.equal(dataInput.name.toUpperCase());
            expect(result.data.groupCustomer).to.deep.equal([1]);
        });
        it('CustExt_01_02. should return validation error for missing required fields', async () => {
            const client = {
                PARTNERREFID: 1,
                branch: 1,
                PARTNERREFINFO: { groupCustomerSystem: 1 },
                user: { id: 1 }
            };
            const dataInput = {
                name: '', // Empty name
                type: 3, // Invalid type
                phone: '123', // Too short phone
                birthday: 'invalid-date', // Invalid date
                groupCustomer: [] // Empty groupCustomer
            };
            ENVSANBOX.stub(common, 'validateArrayField').returns({
                err: 1,
                errors: ['Invalid type', 'Name is required', 'Phone is too short', 'Invalid date']
            });
            const result = await CustomerExtend.validateFormData(dataInput, client, typeAction);
            expect(result.err).to.equal(1);
        });
        it('CustExt_01_03. should handle system errors gracefully', async () => {
            const client = {
                PARTNERREFID: 1,
                branch: 1,
                PARTNERREFINFO: { groupCustomerSystem: 1 },
                user: { id: 1 }
            };
            const dataInput = {
                name: 'Test Customer',
                type: Customer.TYPE.PERSONAL
            };
            ENVSANBOX.stub(common, 'validateArrayField').throws(new Error(MESSAGE));
            const result = await CustomerExtend.validateFormData(dataInput, client, typeAction);
            expect(result.err).to.be.above(0)
        });

    });
    describe('CustExt_02. findExistCode', () => {
        afterEach(async () => {
            ENVSANBOX.restore();
        });
        it('CustExt_02_01. return data empty', async () => {
            const client = {
                PARTNERREFID: 1,
                branch: 1,
                PARTNERREFINFO: { groupCustomerSystem: 1 },
                user: { id: 1 }
            };
            const codeInput = '';
            const existedData = await CustomerExtend.findExistCode(codeInput, client, 'create');
            expect(existedData.length).to.equal(0);
        });
        it('CustExt_02_02. return array data find', async () => {
            const client = {
                PARTNERREFID: 1,
                branch: 1,
                PARTNERREFINFO: { groupCustomerSystem: 1 },
                user: { id: 1 }
            };
            const codeInput = 'TEST001-9123888888';
            const existedData = await CustomerExtend.findExistCode(codeInput, client, 'create');
            expect(existedData.length).to.be.a('number');
        });
    });
    describe('CustExt_03. createCustomer', () => {
        afterEach(async () => {
            ENVSANBOX.restore();
        });
        it('CustExt_03_01. return success', async () => {
            const dataInput = {
                name: 'Test Customer',
                type: Customer.TYPE.PERSONAL,
                phone: '0987456321',
                birthday: '2000-01-01',
                groupCustomer: [{ id: 1 }],
                address: 'Test Address',
                province: { id: 1 },
                district: { id: 1 },
                ward: { id: 1 },
                gender: 1,
                email: 'test@example.com',
                facebook: 'facebook.com/test',
                description: 'Test description',
                usingRewardPoint: false
            };
            const result = await CustomerExtend.createCustomer(dataInput, dataCache.info);
            dataCache.customerObj = result.data;
            expect(result.err).to.equal(0);
            expect(result.data.id).to.be.above(0);
        });
        it('CustExt_03_02. return error: missing name', async () => {
            const dataInput = {
                type: Customer.TYPE.PERSONAL,
                phone: '0987456321',
                birthday: '2000-01-01',
                groupCustomer: [{ id: 1 }],
                address: 'Test Address',
                province: { id: 1 },
                district: { id: 1 },
                ward: { id: 1 },
                gender: 1,
                email: 'test@example.com',
                facebook: 'facebook.com/test',
                description: 'Test description',
                usingRewardPoint: false
            };
            const result = await CustomerExtend.createCustomer(dataInput, dataCache.info);
            expect(result.err).to.be.above(0)
        });
        it('CustExt_03_03. return error: data existed', async () => {
            const dataInput = {
                name: 'abc',
                codeManual: 'TEST001-9123888888',
                type: Customer.TYPE.PERSONAL,
                phone: '0987456321',
                birthday: '2000-01-01',
                groupCustomer: [{ id: 1 }],
                address: 'Test Address',
                province: { id: 1 },
                district: { id: 1 },
                ward: { id: 1 },
                gender: 1,
                email: 'test@example.com',
                facebook: 'facebook.com/test',
                description: 'Test description',
                usingRewardPoint: false
            };
            ENVSANBOX.stub(CustomerExtend, 'findExistCode').returns([{ id: 1, codeManual: 'TEST001-9123888888' }]);
            const result = await CustomerExtend.createCustomer(dataInput, dataCache.info);
            expect(result.err).to.be.above(0)
        });
        it('CustExt_03_04. return error: generateCode return error', async () => {
            const dataInput = {
                name: 'abc',
                codeManual: 'TEST001-9123888888',
                type: Customer.TYPE.PERSONAL,
                phone: '0987456321',
                birthday: '2000-01-01',
                groupCustomer: [{ id: 1 }],
                address: 'Test Address',
                province: { id: 1 },
                district: { id: 1 },
                ward: { id: 1 },
                gender: 1,
                email: 'test@example.com',
                facebook: 'facebook.com/test',
                description: 'Test description',
                usingRewardPoint: false
            };
            ENVSANBOX.stub(CustomerExtend, 'findExistCode').returns([]);
            ENVSANBOX.stub(GenerateCode, 'generateCode').resolves({ err: 1, msg: MESSAGE });
            const result = await CustomerExtend.createCustomer(dataInput, dataCache.info);
            expect(result.err).to.be.above(0)
        });
        it('CustExt_03_05. return error: throw error', async () => {
            ENVSANBOX.stub(CustomerExtend, 'validateFormData').rejects(new Error(MESSAGE));
            const result = await CustomerExtend.createCustomer({}, dataCache.info);
            expect(result.err).to.be.above(0)
        });

    });
    describe('CustExt_04. updateCustomer', () => {
        afterEach(async () => {
            ENVSANBOX.restore();
        });
        it('CustExt_04_01. return success', async () => {
            const dataInput = {
                id: dataCache.customerObj.id,
                name: 'Test Customer',
                type: Customer.TYPE.PERSONAL,
                phone: '0987456321',
                birthday: '2000-01-01',
                groupCustomer: [{ id: 1 }],
                address: 'Test Address',
                province: { id: 1 },
                district: { id: 1 },
                ward: { id: 1 },
                gender: 1,
                email: 'test@example.com',
                facebook: 'facebook.com/test',
                description: 'Test description',
                usingRewardPoint: false
            };
            const result = await CustomerExtend.updateCustomer(dataInput, dataCache.info);
            expect(result.err).to.equal(0);
            expect(result.data.id).to.be.above(0);
        });
        it('CustExt_04_02. return error: missing id', async () => {
            const dataInput = {
                type: Customer.TYPE.PERSONAL,
                name: 'Test Customer',
                phone: '0987456321',
                birthday: '2000-01-01',
                groupCustomer: [{ id: 1 }],
                address: 'Test Address',
                province: { id: 1 },
                district: { id: 1 },
                ward: { id: 1 },
                gender: 1,
                email: 'test@example.com',
                facebook: 'facebook.com/test',
                description: 'Test description',
                usingRewardPoint: false
            };
            const result = await CustomerExtend.updateCustomer(dataInput, dataCache.info);
            expect(result.err).to.be.above(0)
        });
        it('CustExt_04_03. return error: data existed', async () => {
            const dataInput = {
                id: dataCache.customerObj.id,
                name: 'abc',
                codeManual: 'TEST001-9123888888',
                type: Customer.TYPE.PERSONAL,
                phone: '0987456321',
                birthday: '2000-01-01',
                groupCustomer: [{ id: 1 }],
                address: 'Test Address',
                province: { id: 1 },
                district: { id: 1 },
                ward: { id: 1 },
                gender: 1,
                email: 'test@example.com',
                facebook: 'facebook.com/test',
                description: 'Test description',
                usingRewardPoint: false
            };
            const dataCreate = _.cloneDeep(dataInput);
            delete dataCreate.id;
            await CustomerExtend.createCustomer(dataCreate, dataCache.info);
            const result = await CustomerExtend.updateCustomer(dataInput, dataCache.info);
            expect(result.err).to.be.above(0)
        });
        it('CustExt_04_05. return error: throw error in function', async () => {
            ENVSANBOX.stub(CustomerExtend, 'validateFormData').rejects(new Error(MESSAGE));
            const result = await CustomerExtend.updateCustomer({}, dataCache.info);
            expect(result.err).to.be.above(0)
        });
        it('CustExt_04_05. return error: throw error in transaction', async () => {
            const dataInput = {
                id: dataCache.customerObj.id,
                name: 'Test Customer',
                type: Customer.TYPE.PERSONAL,
                phone: '0987456321',
                birthday: '2000-01-01',
                groupCustomer: [{ id: 1 }],
                address: 'Test Address',
                province: { id: 1 },
                district: { id: 1 },
                ward: { id: 1 },
                gender: 1,
                email: 'test@example.com',
                facebook: 'facebook.com/test',
                description: 'Test description',
                usingRewardPoint: false
            };
            const client = dataCache.info;
            delete client.user
            const result = await CustomerExtend.updateCustomer(dataInput, client);
            expect(result.err).to.be.above(0);
        });

    })





});