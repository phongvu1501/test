module.exports = {
    //Tạo học sinh mới(join với khối và lớp)
    createStudent: async (req, res) => {
        try {
            const { username, gender, birthday, address, phone, classId, gradeId } = req.body;
            if (!username || !gender || !birthday || !address || !phone || !classId || !gradeId) {
                return res.badRequest({ err: 1, message: 'Thiếu thông tin' });
            }
            const [grade, classData] = await Promise.all([
                sails.models.grade.findOne({ id: gradeId }),
                sails.models.class.findOne({ id: classId })
            ]);
            if (!grade || !classData) {
                return res.badRequest({ err: 1, message: !grade ? 'Khối lớp không tồn tại' : 'Lớp học không tồn tại' });
            }
            const student = await Student.create({
                username,
                gender,
                birthday,
                address,
                phone,
                grade: grade.id,
                class: classData.id,
                account: req.session.userId
            });
            // const rowCreate = {

            // }
            return res.success({ data: student });
        } catch (error) {
            sails.log.error('createStudent error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },
    //Show 1 hoặc nhiều học sinh
    showStudent: async (req, res) => {
        try {
            const id = req.param('id');
            if (id) {
                const student = await Student.findOne({ id });
                if (!student) {
                    return res.badRequest({ err: 1, message: 'Không tìm thấy học sinh' });
                }
                return res.success({ data: student });
            }
            const list = await Student.find().sort('createdAt DESC');
            return res.success({ data: list });
        } catch (error) {
            sails.log.error('showStudent error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },
    //Cập nhật học sinh
    updateStudent: async (req, res) => {
        try {
            const id = req.param('id');
            if (!id) {
                return res.badRequest({ err: 1, message: 'Thiếu dữ liệu' });
            }
            const { username, gender, birthday, address, phone, classId, gradeId } = req.body;
            if (!username || !gender || !birthday || !address || !phone || !classId || !gradeId) {
                return res.badRequest({ err: 1, message: 'Thiếu dữ liệu' });
            }
            const [grade, classData] = await Promise.all([
                sails.models.grade.findOne({ id: gradeId }),
                sails.models.class.findOne({ id: classId })
            ]);
            if (!grade || !classData) {
                return res.badRequest({ err: 1, message: !grade ? 'Khối lớp không tồn tại' : 'Lớp học không tồn tại' });
            }
            const student = await Student.updateOne({ id }).set({
                username,
                gender,
                birthday,
                address,
                phone,
                grade: grade.id,
                class: classData.id,
                account: req.session.userId
            });
            if (!student) {
                return res.badRequest({ err: 1, message: 'Cập nhật thất bại' });
            }
            return res.success({ data: student });
        } catch (error) {
            sails.log.error('updateStudent error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },
    //xóa học sinh
    deleteStudent: async (req, res) => {
        try {
            const id = req.param('id');
            if (!id) {
                return res.badRequest({ err: 1, message: 'Thiếu dữ liệu' });
            }
            const deletedStudent = await Student.destroyOne({ id });
            if (!deletedStudent) {
                return res.notFound({ err: 1, message: 'Không tìm thấy học sinh' });
            }
            return res.success({ data: deletedStudent });
        } catch (error) {
            sails.log.error('deleteStudent error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },
    //Tìm kiếm
    searchStudent: async (req, res) => {
        try {
            const searchText = (req.params.query || '').trim();
            if (!searchText) {
                return res.success({ data: [] });
            }
            const collection = Student.getDatastore().manager.collection(Student.tableName);
            const filter = {
                $or: [
                    { username: { $regex: new RegExp(searchText, 'i') } },
                    { birthday: { $regex: new RegExp(searchText, 'i') } }
                ]
            };
            const result = await collection.find(filter).limit(1000).toArray();
            return res.success({ data: result });
        } catch (error) {
            sails.log.error('searchStudent error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    }

}