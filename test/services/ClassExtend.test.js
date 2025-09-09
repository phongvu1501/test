const { expect } = require('chai');
const ClassExtend = require('../../../api/services/ClassExtend');

const dataCache = {};
let testGrade;
let testClass;

describe('ClassExt.ClassExtend', () => {
    before(async () => {
        await Class.destroy({});
        await Grade.destroy({});
        testGrade = await Grade.create({ name: 'Khối 10 Test' }).fetch();
        testClass = await Class.create({ name: 'Lớp 10A1 Chung', schoolYear: '2025', grade: testGrade.id }).fetch();
    });

    after(async () => {
        await Class.destroy({});
        await Grade.destroy({});
    });

    describe('ClassExt_01. createClass', () => {
        it('ClassExt_01_01. return success', async () => {
            const dataInput = { name: '10A2 Test', schoolYear: '2025', gradeId: testGrade.id };
            const result = await ClassExtend.createClass(dataInput);
            dataCache.classObj = result.data;
            expect(result.err).to.equal(0);
            expect(result.data.id).to.be.a('string');
        });

        it('ClassExt_01_02. return error: missing data', async () => {
            const dataInput = { name: '10A2 Test' };
            const result = await ClassExtend.createClass(dataInput);
            expect(result.err).to.equal(1);
            expect(result.message).to.equal('Thiếu dữ liệu');
        });
    });

    describe('ClassExt_02. showClass', () => {
        it('ClassExt_02_01. should return a single class', async () => {
            const result = await ClassExtend.showClass(testClass.id);
            expect(result.err).to.equal(0);
            expect(result.data.id).to.equal(testClass.id);
        });

        it('ClassExt_02_02. should return all classes', async () => {
            const result = await ClassExtend.showClass(null);
            expect(result.err).to.equal(0);
            expect(result.data).to.be.an('array').that.has.length.greaterThan(0);
        });
    });

    describe('ClassExt_03. updateClass', () => {
        it('ClassExt_03_01. should update a class successfully', async () => {
            const dataInput = { id: testClass.id, name: 'Lớp 10A1 Đã Sửa', schoolYear: '2026', gradeId: testGrade.id };
            const result = await ClassExtend.updateClass(dataInput);
            expect(result.err).to.equal(0);
            expect(result.data.name).to.equal('Lớp 10A1 Đã Sửa');
        });
    });

    describe('ClassExt_04. deleteClass', () => {
        it('ClassExt_04_01. should delete a class successfully', async () => {
            const tempClass = await Class.create({ name: 'Lớp Tạm', schoolYear: '2025', grade: testGrade.id }).fetch();
            const result = await ClassExtend.deleteClass(tempClass.id);
            expect(result.err).to.equal(0);
            const checkDb = await Class.findOne({ id: tempClass.id });
            expect(checkDb).to.be.null;
        });
    });
    
    describe('ClassExt_05. searchClass', () => {
        it('ClassExt_05_01. should find a class by name', async () => {
            const result = await ClassExtend.searchClass('Chung');
            expect(result.err).to.equal(0);
            expect(result.data).to.be.an('array').that.has.length.greaterThan(0);
        });
    });
});