const sinon = require('sinon');
const { expect } = require('chai');

const Class = require('../../../api/controllers/ClassController');
const serverError = require('../../../api/responses/serverError');
// comment
const ENVSANBOX = sinon.createSandbox();
describe('testfunction', () => {
    describe('testfunction', () => {
        before(async () => {
            console.log("PREPARING UNIT TEST testfunction ...");
            // do something
        });

        after(async () => {
            // do something
            console.log("CLEANING UNIT TEST testfunction ...");
            ENVSANBOX.restore();
        });

        it('Should return error when input invalid', async () => {
            const req = {
                body: { name: null }
            }
            const res = { serverError: ENVSANBOX.spy() }
            const result = await Class.createClass(req, res);
            expect(res.serverError.calledOnce).to.be.true;
        });

        it('Should return success when input valid', async () => {
            const req = {
                body: { name: 'Lớp 10A1', schoolYear: '2025-2026', gradeId: '68bfcfdd8e5c5401698d27ca' } // thêm data chuẩn vào
            }
            const res = { success: ENVSANBOX.spy() }
            const result = await Class.createClass(req, res);
            expect(res.success.calledOnce).to.be.true;
        });

        it('Should return error when class not found', async () => {
            const req = {
                param: ENVSANBOX.stub().returns('nonexistent-id')
            }
            const res = { notFound: ENVSANBOX.spy() }
            const result = await Class.showClass(req, res);
            expect(res.notFound.calledOnce).to.be.true;
        });
        it('Should return success when class found', async () => {
            const req = {
                param: ENVSANBOX.stub().returns(null) // null để lấy tất cả lớp
            }
            const res = { success: ENVSANBOX.spy() }
            const result = await Class.showClass(req, res);
            expect(res.success.calledOnce).to.be.true;
        });

        it('Should return badRequest when input invalid for updateClass', async () => {
            const req = {
                param: ENVSANBOX.stub().returns(null),
                body: { name: null }
            }
            const res = { badRequest: ENVSANBOX.spy() }
            const result = await Class.updateClass(req, res);
            expect(res.badRequest.calledOnce).to.be.true;
        });
        it('Should return notFound when class to update not found', async () => {
            const req = {
                param: ENVSANBOX.stub().returns('nonexistent-id'),
                body: { name: 'Lớp 10A1', schoolYear: '2025-2026', grade: '68bfcfdd8e5c5401698d27ca' }
            }
            const res = { notFound: ENVSANBOX.spy() }
            const result = await Class.updateClass(req, res);
            expect(res.notFound.calledOnce).to.be.true;
        });

        it('Should return success when update class with valid data', async () => {
            const req = {
                param: ENVSANBOX.stub().returns('68bfe066b2e994ece3d9bb71'), // thay 'existing-id' bằng id thực tế
                body: { name: 'Lớp 10A00000000000001', schoolYear: '2025-2026', grade: '68bfcfdd8e5c5401698d27ca' }
            }
            const res = { success: ENVSANBOX.spy() }
            const result = await Class.updateClass(req, res);
            expect(res.success.calledOnce).to.be.true;
        });
        it('Should handle server error gracefully', async () => {
            const req = {
                body: { name: 'Lớp 10A1', schoolYear: '2025-2026', gradeId: '68bfcfdd8e5c5401698d27cd' } // Mã khối lớp không tồn tại
            }
            const res = { serverError: ENVSANBOX.spy() }
            const result = await Class.createClass(req, res);
            expect(res.serverError.calledOnce).to.be.true;
        });

        it('serverError response structure', async () => {
            const req = {
                body: { name: null, schoolYear: '2025-2026', gradeId: '68bfcfdd8e5c5401698d27ca' }
            }; // Mock request object
            const res = { serverError: ENVSANBOX.spy() };
            const result = await Class.createClass(req, res);
            expect(res.serverError.calledOnce).to.be.true;
        });
    });
});