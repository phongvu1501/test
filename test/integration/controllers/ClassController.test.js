// test/integration/controllers/ClassController.test.js

const { expect } = require('chai');

const classController = require('../../../api/controllers/ClassController');

let testGrade;
let testClass;

describe('ClassController', () => {

    before(async () => {
        await Class.destroy({});
        await Grade.destroy({});
        testGrade = await Grade.create({ name: 'Khối 10 Test' }).fetch();
        testClass = await Class.create({
            name: 'Lớp 10A1 Dùng Chung',
            schoolYear: '2025',
            grade: testGrade.id
        }).fetch();
    });

    // (TEARDOWN) Chạy 1 lần sau khi tất cả test kết thúc
    after(async () => {
        await Class.destroy({});
        await Grade.destroy({});
    });

    const createFakeRes = () => ({
        success: (payload) => payload,
        badRequest: (payload) => payload,
        notFound: (payload) => payload,
        serverError: (payload) => payload,
    });


    //==================== createClass ====================
    describe('createClass', () => {
        it('should create a class successfully', async () => {
            const req = { body: { name: '10A2 Mới', schoolYear: '2025', gradeId: testGrade.id } };
            
            const result = await classController.createClass(req, createFakeRes());
            
            expect(result.data).to.exist;
            expect(result.data.name).to.equal('10A2 Mới');
            
            const classInDb = await Class.findOne({ id: result.data.id });
            expect(classInDb).to.not.be.null;
        });
    });

    //==================== showClass ====================
    describe('showClass', () => {
        it('should return a single class by id', async () => {
            const req = { param: (key) => key === 'id' ? testClass.id : null };
            const result = await classController.showClass(req, createFakeRes());
            expect(result.data.class.id).to.equal(testClass.id);
        });

        it('should return a list of all classes', async () => {
            const req = { param: () => null }; // Không có id
            const result = await classController.showClass(req, createFakeRes());
            expect(result.data).to.be.an('array');
            expect(result.data.length).to.be.greaterThan(0);
        });
    });

    //==================== updateClass ====================
    describe('updateClass', () => {
        it('should update a class successfully', async () => {
            const req = {
                param: (key) => key === 'id' ? testClass.id : null,
                body: { name: 'Lớp 10A1 Đã Cập Nhật', schoolYear: '2026', grade: testGrade.id }
            };
            const result = await classController.updateClass(req, createFakeRes());
            expect(result.data.name).to.equal('Lớp 10A1 Đã Cập Nhật');
        });
    });

    //==================== deleteClass ====================
    describe('deleteClass', () => {
        it('should delete a class successfully', async () => {
            const tempClass = await Class.create({ name: 'Lớp Sẽ Bị Xóa', schoolYear: '2025', grade: testGrade.id }).fetch();
            const req = { param: (key) => key === 'id' ? tempClass.id : null };

            await classController.deleteClass(req, createFakeRes());

            const classInDb = await Class.findOne({ id: tempClass.id });
            expect(classInDb).to.be.null;
        });
    });
});