module.exports = {
    createTeacher: async (req, res) => {
        try {
            const {
                username, gender, birthday, phone, address,
                specialization, qualification, joinDate,
                status, avatar, account, gradeId, classId, positionID, subjectID
            } = req.body;
            if (!username || !gender || !birthday || !phone || !address ||
                !specialization || !qualification || !joinDate || !status ||
                !avatar || !account || !classId || !gradeId || !positionID || !subjectID) {
                return res.badRequest({ err: 1, message: 'Thiếu thông tin' });
            }
            const [grade, classData, positionData, subjectData] = await Promise.all([
                sails.models.grade.findOne({ id: gradeId }),
                sails.models.class.findOne({ id: classId }),
                sails.models.position.findOne({ id: positionID }),
                sails.models.subject.findOne({ id: subjectID })
            ]);
            if (!grade || !classData || !positionData || !subjectData) {
                return res.badRequest({ err: 1, message: !grade ? 'Khối lớp không tồn tại' : !classData ? 'Lớp học không tồn tại' : !positionData ? 'Chức vụ không tồn tại' : 'Môn học không tồn tại' });
            }
            const newTeacher = await Teacher.create({
                username,
                gender,
                birthday,
                phone,
                address,
                specialization,
                qualification,
                joinDate,
                status,
                avatar,
                account,
                grades: [grade.id],
                classes: [classData.id],
                positions: [positionData.id],
                subjects: [subjectData.id],
                account: req.session.userId
            });
            const rowCreate = {
                ...newTeacher,
                gradeId: grade.id,
                classId: classData.id,
                positionId: positionData.id,
                subjectID: subjectData.id,
                account: req.session.userId
            }
            console.log('New Teacher Created:', rowCreate);
            return res.success({ data: rowCreate });
        } catch (error) {
            sails.log.error('createTeacher error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },
    showTeacher: async (req, res) => {
        try {
            const id = req.param('id');
            if (id) {
                const teacher = await Teacher.findOne({ id }).populate('classes').populate('subject').populate('grades').populate('positions');
                if (!teacher) {
                    return res.badRequest({ err: 1, message: 'Giáo viên không tồn tại' });
                }
                return res.success({ data: teacher });
            }
            const list = await Teacher.find().sort('createdAt DESC');
            return res.success({ data: list });
        } catch (error) {
            sails.log.error('showTeacher error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },
    updateTeacher: async (req, res) => {
        try {
            const {
                username, gender, birthday, phone, address,
                specialization, qualification, joinDate,
                status, avatar, account, gradeId, classId, positionID, subjectID
            } = req.body;
            if (!username || !gender || !birthday || !phone || !address ||
                !specialization || !qualification || !joinDate || !status ||
                !avatar || !account || !classId || !gradeId || !positionID || !subjectID) {
                return res.badRequest({ err: 1, message: 'Thiếu thông tin' });
            }
            const [grade, classData, positionData, subjectData] = await Promise.all([
                sails.models.grade.findOne({ id: gradeId }),
                sails.models.class.findOne({ id: classId }),
                sails.models.position.findOne({ id: positionID }),
                sails.models.subject.findOne({ id: subjectID })
            ]);
            if (!grade || !classData || !positionData || !subjectData) {
                return res.badRequest({ err: 1, message: !grade ? 'Khối lớp không tồn tại' : !classData ? 'Lớp học không tồn tại' : !positionData ? 'Chức vụ không tồn tại' : 'Môn học không tồn tại' });
            }
            const teacher = await Teacher.updateOne({ id }).set({
                username,
                gender,
                birthday,
                phone,
                address,
                specialization,
                qualification,
                joinDate,
                status,
                avatar,
                account,
                grades: [grade.id],
                classes: [classData.id],
                positions: [positionData.id],
                subjects: [subjectData.id],
                account: req.session.userId
            });
            const rowUpdate = {
                ...teacher,
                gradeId: grade.id,
                classId: classData.id,
                positionId: positionData.id,
                subjectID: subjectData.id,
                account: req.session.userId
            }
            if (!teacher) {
                return res.badRequest({ err: 1, message: 'Cập nhật thất bại' });
            }
            return res.success({ data: rowUpdate });
        } catch (error) {
            sails.log.error('updateTeacher error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },
    deleteTeacher: async (req, res) => {
        try {
            const id = req.param('id');
            if (!id) {
                return res.badRequest({ err: 1, message: 'Thiếu dữ liệu' });
            }
            const deleteTeacher = await Teacher.destroyOne({ id });
            if (!deleteTeacher) {
                return res.notFound({ err: 1, message: 'Không tìm thấy giáo viên' });
            }
            return res.success({ data: deleteTeacher });
        } catch (error) {
            sails.log.error('deleteTeacher error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },
    //Tìm kiếm
    searchTeacher: async (req, res) => {
        try {
            const searchText = (req.params.query || '').trim();
            if (!searchText) {
                return res.success({ data: [] });
            }
            const collection = Teacher.getDatastore().manager.collection(Teacher.tableName);
            const filter = {
                $or: [
                    { username: { $regex: new RegExp(searchText, 'i') } },
                ]
            };
            const result = await collection.find(filter).limit(1000).toArray();
            return res.success({ data: result });
        } catch (error) {
            sails.log.error('searchTeacher error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    }

};
