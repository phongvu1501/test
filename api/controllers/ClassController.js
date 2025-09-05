module.exports = {
    // Tạo lớp học mới
    createClass: async (req, res) => {
        try {
            const { name, schoolYear, gradeId } = req.body;
            if (!name || !schoolYear || !gradeId) {
                return res.badRequest({ err: 1, message: 'Thiếu dữ liệu' });
            }
            const Grade = sails.models.grade;
            const grade = await Grade.findOne({ id: gradeId });
            if (!grade) {
                return res.badRequest({ err: 1, message: 'Khối lớp không tồn tại' });
            }
            const newClass = await Class.create({ name, schoolYear, grade: gradeId });
            return res.success({ data: newClass });

        } catch (error) {
            sails.log.error('createClass error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },

    // Hiển thị lớp học theo id hoặc tất cả
    showClass: async (req, res) => {
        try {
            const id = req.param('id');
            if (id) {
                const Student = sails.models.student;
                const cls = await Class.findOne({ id });
                if (!cls) {
                    return res.notFound({ err: 1, message: 'Không tìm thấy lớp' });
                }
                const students = await Student.find({ class: cls.id });
                return res.success({ data: { class: cls, students } });
            }
            const list = await Class.find().sort('createdAt DESC');
            return res.success({ data: list });
        } catch (error) {
            sails.log.error('showClass error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },

    // Cập nhật lớp học
    updateClass: async (req, res) => {
        try {
            const id = req.param('id');
            const { name, schoolYear, grade: gradeId } = req.body;

            if (!id || !name || !schoolYear || !gradeId) {
                return res.badRequest({ err: 1, message: 'Thiếu dữ liệu' });
            }
            const Grade = sails.models.grade;
            const grade = await Grade.findOne({ id: gradeId });
            if (!grade) {
                return res.badRequest({ err: 1, message: 'Khối lớp không tồn tại' });
            }
            const updated = await Class.updateOne({ id }).set({ name, schoolYear, grade: gradeId });
            if (!updated) {
                return res.notFound({ err: 1, message: 'Không tìm thấy lớp' });
            }
            return res.success({ data: updated });
        } catch (error) {
            sails.log.error('updateClass error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },

    // Xóa lớp học
    deleteClass: async (req, res) => {
        try {
            const id = req.param('id');
            if (!id) return res.badRequest({ err: 1, message: 'Thiếu dữ liệu' });
            const deletedClass = await Class.destroyOne({ id });
            if (!deletedClass) return res.notFound({ err: 1, message: 'Không tìm thấy lớp' });
            return res.success({ data: deletedClass });
        } catch (error) {
            sails.log.error('deleteClass error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },
    // Tìm kiếm lớp học theo tên hoặc năm học
    searchClass: async (req, res) => {
        try {
            const searchText = (req.params.query || '').trim();
            if (!searchText) {
                return res.success({ data: [], msg: 'Không tìm thấy lớp học' });
            }
            const collection = Class.getDatastore().manager.collection(Class.tableName);
            const filter = {
                $or: [
                    { name: { $regex: new RegExp(searchText, 'i') } },
                    { schoolYear: { $regex: new RegExp(searchText, 'i') } }
                ]
            };
            const result = await collection.find(filter).limit(1000).toArray();
            return res.success({ data: result });
        } catch (error) {
            sails.log.error('searchClass error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    }

};
