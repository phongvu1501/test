const sinon = require('sinon');
const { expect } = require('chai');

const mainCtrl = require('../../../api/controllers/ClassController');
const ClassExtend = require('../../../api/services/ClassExtend');
const ENVSANBOX = sinon.createSandbox();

describe('ClassCtr.ClassController', () => {
    let req, res;
    
    beforeEach(function () {
        req = { body: {}, params: {} };
        res = { 
            success: ENVSANBOX.spy(), 
            badRequest: ENVSANBOX.spy(),
            serverError: ENVSANBOX.spy()
        };
    });

    afterEach(function () {
        ENVSANBOX.restore();
    });

    describe('ClassCtr_01. createClass', () => {
        it('ClassCtr_01_01. should call res.success on successful creation', async () => {
            ENVSANBOX.stub(ClassExtend, 'createClass').resolves({ err: 0, data: {} });
            await mainCtrl.createClass(req, res);
            expect(res.success.calledOnce).to.be.true;
        });

        it('ClassCtr_01_02. should call res.badRequest on service error', async () => {
            ENVSANBOX.stub(ClassExtend, 'createClass').resolves({ err: 1 });
            await mainCtrl.createClass(req, res);
            expect(res.badRequest.calledOnce).to.be.true;
        });

        it('ClassCtr_01_03. should call res.serverError on exception', async () => {
            // Sửa ở đây: Stub service để nó văng ra một exception thật sự
            ENVSANBOX.stub(ClassExtend, 'createClass').rejects(new Error('Lỗi database'));
            
            // Khi gọi, controller sẽ bắt lỗi này trong khối catch và gọi res.serverError
            await mainCtrl.createClass(req, res);
            
            // Bây giờ, kiểm tra này sẽ đúng
            expect(res.serverError.calledOnce).to.be.true;
        });
    });

    describe('ClassCtr_02. showClass', () => {
        it('ClassCtr_02_01. should call res.success when class is found', async () => {
            ENVSANBOX.stub(ClassExtend, 'showClass').resolves({ err: 0, data: {} });
            await mainCtrl.showClass(req, res);
            expect(res.success.calledOnce).to.be.true;
        });
        it('ClassCtr_02_02. should call res.badRequest when class is not found', async () => {
            ENVSANBOX.stub(ClassExtend, 'showClass').resolves({ err: 1 });
            await mainCtrl.showClass(req, res);
            expect(res.badRequest.calledOnce).to.be.true;
        });
    });

    describe('ClassCtr_03. updateClass', () => {
        it('ClassCtr_03_01. should call res.success on successful update', async () => {
            ENVSANBOX.stub(ClassExtend, 'updateClass').resolves({ err: 0, data: {} });
            await mainCtrl.updateClass(req, res);
            expect(res.success.calledOnce).to.be.true;
        });
         it('ClassCtr_03_02. should call res.badRequest on service error', async () => {
            ENVSANBOX.stub(ClassExtend, 'updateClass').resolves({ err: 1 });
            await mainCtrl.updateClass(req, res);
            expect(res.badRequest.calledOnce).to.be.true;
        });
    });
    
    describe('ClassCtr_04. deleteClass', () => {
        it('ClassCtr_04_01. should call res.success on successful deletion', async () => {
            ENVSANBOX.stub(ClassExtend, 'deleteClass').resolves({ err: 0, data: {} });
            await mainCtrl.deleteClass(req, res);
            expect(res.success.calledOnce).to.be.true;
        });
    });
    
    describe('ClassCtr_05. searchClass', () => {
        it('ClassCtr_05_01. should call res.success on search', async () => {
            ENVSANBOX.stub(ClassExtend, 'searchClass').resolves({ err: 0, data: [] });
            await mainCtrl.searchClass(req, res);
            expect(res.success.calledOnce).to.be.true;
        });
    });
});