const sinon = require('sinon');
const { expect } = require('chai');

const classController = require('../../api/controllers/ClassController');

const ENVSANBOX = sinon.createSandbox();


const Class = {
    findOne: () => { },
    find: () => { },
    create: () => { },
    updateOne: () => { },
    destroyOne: () => { },
    getDatastore: () => { },
};
const Grade = {
    findOne: () => { }
};
const Student = {
    find: () => { }
};

global.sails = {
    models: { grade: Grade, student: Student },
    log: { error: () => { } },
};
global.Class = Class;

describe('ClassCtr.ClassController', () => {
    afterEach(function () {
        ENVSANBOX.restore();
    });

    //==================== 1. Test hàm createClass ====================
    describe('ClassCtr_01. createClass', () => {
        let res;
        const dataInput = { name: 'Lớp 10A1', schoolYear: '2025-2026', gradeId: 'g1' };
        const req = { body: dataInput };

        beforeEach(function () {
            res = {
                success: ENVSANBOX.spy(),
                badRequest: ENVSANBOX.spy(),
                serverError: ENVSANBOX.spy(),
            };
            ENVSANBOX.stub(sails.log, 'error');
        });

        it('ClassCtr_01_01. should return success with correct data', async () => {
            const expectedResult = { id: 'c1', ...dataInput };
            ENVSANBOX.stub(Grade, 'findOne').resolves({ id: 'g1' });
            ENVSANBOX.stub(Class, 'create').resolves(expectedResult);

            await classController.createClass(req, res);
            expect(res.success.calledOnce).to.be.true;
        });

        it('ClassCtr_01_02. should return badRequest error when missing data', async () => {
            await classController.createClass({ body: {} }, res);
            expect(res.badRequest.calledOnce).to.be.true;
        });

        it('ClassCtr_01_03. should return badRequest if grade does not exist', async () => {
            ENVSANBOX.stub(Grade, 'findOne').resolves(null);

            await classController.createClass(req, res);
            expect(res.badRequest.calledOnce).to.be.true;
        });

        it('ClassCtr_01_04. should return serverError on create failure', async () => {
            ENVSANBOX.stub(Grade, 'findOne').resolves({ id: 'g1' });
            ENVSANBOX.stub(Class, 'create').rejects(new Error('DB Error'));

            await classController.createClass(req, res);
            expect(res.serverError.calledOnce).to.be.true;
        });
    });

    //==================== 2. Test hàm updateClass ====================
    describe('ClassCtr_02. updateClass', () => {
        let res;
        const dataInput = { name: 'Lớp 10A1-Mới', schoolYear: '2025-2026', grade: 'g1' };
        const req = { param: () => 'c1', body: dataInput };

        beforeEach(() => {
            res = {
                success: ENVSANBOX.spy(),
                notFound: ENVSANBOX.spy(),
                serverError: ENVSANBOX.spy(),
                badRequest: ENVSANBOX.spy(),
            };
            ENVSANBOX.stub(sails.log, 'error');
        });

        it('ClassCtr_02_01. should return success with updated data', async () => {
            const expectedResult = { id: 'c1', ...dataInput };
            const setStub = ENVSANBOX.stub().resolves(expectedResult);
            ENVSANBOX.stub(Grade, 'findOne').resolves({ id: 'g1' });
            ENVSANBOX.stub(Class, 'updateOne').returns({ set: setStub });

            await classController.updateClass(req, res);
            expect(res.success.calledOnce).to.be.true;
        });

        it('ClassCtr_02_02. should return badRequest if grade does not exist', async () => {
            ENVSANBOX.stub(Grade, 'findOne').resolves(null);
            await classController.updateClass(req, res);
            expect(res.badRequest.calledOnce).to.be.true;
        });

        it('ClassCtr_02_03. should return notFound if class to update does not exist', async () => {
            const setStub = ENVSANBOX.stub().resolves(null);
            ENVSANBOX.stub(Grade, 'findOne').resolves({ id: 'g1' });
            ENVSANBOX.stub(Class, 'updateOne').returns({ set: setStub });

            await classController.updateClass(req, res);
            expect(res.notFound.calledOnce).to.be.true;
        });

        it('ClassCtr_02_04. should return serverError on update failure', async () => {
            const setStub = ENVSANBOX.stub().rejects(new Error('DB Error'));
            ENVSANBOX.stub(Grade, 'findOne').resolves({ id: 'g1' });
            ENVSANBOX.stub(Class, 'updateOne').returns({ set: setStub });

            await classController.updateClass(req, res);
            expect(res.serverError.calledOnce).to.be.true;
        });

        it('ClassCtr_02_05. should return badRequest if data is missing', async () => {
            const incompleteReq = { param: () => 'c1', body: { name: 'Thiếu dữ liệu' } };
            await classController.updateClass(incompleteReq, res);
            expect(res.badRequest.calledOnce).to.be.true;
        });
    });

    //==================== 3. Test hàm deleteClass ====================
    describe('ClassCtr_03. deleteClass', () => {
        let res;
        beforeEach(() => {
            res = {
                success: ENVSANBOX.spy(),
                notFound: ENVSANBOX.spy(),
                serverError: ENVSANBOX.spy(),
                badRequest: ENVSANBOX.spy(),
            };
            ENVSANBOX.stub(sails.log, 'error');
        });

        it('ClassCtr_03_01. should return success with deleted data', async () => {
            const req = { param: () => 'c1' };
            ENVSANBOX.stub(Class, 'destroyOne').resolves({ id: 'c1' });

            await classController.deleteClass(req, res);
            expect(res.success.calledOnce).to.be.true;
        });

        it('ClassCtr_03_02. should return notFound when class does not exist', async () => {
            const req = { param: () => 'c99' };
            ENVSANBOX.stub(Class, 'destroyOne').resolves(null);

            await classController.deleteClass(req, res);
            expect(res.notFound.calledOnce).to.be.true;
        });

        it('ClassCtr_03_03. should return serverError on delete failure', async () => {
            const req = { param: () => 'c1' };
            ENVSANBOX.stub(Class, 'destroyOne').rejects(new Error('DB Error'));

            await classController.deleteClass(req, res);
            expect(res.serverError.calledOnce).to.be.true;
        });

        it('ClassCtr_03_04. should return badRequest if id is missing', async () => {
            const req = { param: () => null };
            await classController.deleteClass(req, res);
            expect(res.badRequest.calledOnce).to.be.true;
        });
    });

    //==================== 4. Test hàm showClass ====================
    describe('ClassCtr_04. showClass', () => {
        let res;
        beforeEach(() => {
            res = {
                success: ENVSANBOX.spy(),
                notFound: ENVSANBOX.spy(),
                serverError: ENVSANBOX.spy(),
            };
            ENVSANBOX.stub(sails.log, 'error');
        });

        it('ClassCtr_04_01. should return a list of all classes', async () => {
            const req = { param: () => null };
            const sortStub = ENVSANBOX.stub().resolves([]);
            ENVSANBOX.stub(Class, 'find').returns({ sort: sortStub });

            await classController.showClass(req, res);
            expect(res.success.calledOnce).to.be.true;
        });

        it('ClassCtr_04_02. should return a single class with students', async () => {
            const req = { param: () => 'c1' };
            ENVSANBOX.stub(Class, 'findOne').resolves({ id: 'c1' });
            ENVSANBOX.stub(Student, 'find').resolves([]);

            await classController.showClass(req, res);
            expect(res.success.calledOnce).to.be.true;
        });

        it('ClassCtr_04_03. should return notFound if class does not exist', async () => {
            const req = { param: () => 'c99' };
            ENVSANBOX.stub(Class, 'findOne').resolves(null);

            await classController.showClass(req, res);
            expect(res.notFound.calledOnce).to.be.true;
        });

        it('ClassCtr_04_04. should return serverError on find failure', async () => {
            const req = { param: () => null };
            ENVSANBOX.stub(Class, 'find').rejects(new Error('DB Error'));

            await classController.showClass(req, res);
            expect(res.serverError.calledOnce).to.be.true;
        });
    });

    //==================== 5. Test hàm searchClass ====================
    describe('ClassCtr_05. searchClass', () => {
        let res;
        beforeEach(() => {
            res = {
                success: ENVSANBOX.spy(),
                serverError: ENVSANBOX.spy(),
            };
            ENVSANBOX.stub(sails.log, 'error');
        });

        it('ClassCtr_05_01. should return search results', async () => {
            const req = { params: { query: '10A1' } };
            const toArrayStub = ENVSANBOX.stub().resolves([]);
            const limitStub = ENVSANBOX.stub().returns({ toArray: toArrayStub });
            const findStub = ENVSANBOX.stub().returns({ limit: limitStub });
            const collectionStub = { find: findStub };
            const managerStub = { collection: ENVSANBOX.stub().returns(collectionStub) };
            ENVSANBOX.stub(Class, 'getDatastore').returns({ manager: managerStub });

            await classController.searchClass(req, res);
            expect(res.success.calledOnce).to.be.true;
        });

        it('ClassCtr_05_02. should return empty array for empty query', async () => {
            const req = { params: { query: '  ' } };
            await classController.searchClass(req, res);
            expect(res.success.calledOnce).to.be.true;
        });

        it('ClassCtr_05_03. should return serverError on search failure', async () => {
            const req = { params: { query: 'error' } };
            ENVSANBOX.stub(Class, 'getDatastore').rejects(new Error('DB Error'));

            await classController.searchClass(req, res);
            expect(res.serverError.calledOnce).to.be.true;
        });

        it('ClassCtr_05_04. should handle missing query property', async () => {
            const req = { params: {} };
            await classController.searchClass(req, res);
            expect(res.success.calledOnce).to.be.true;
        });
    });
});

