module.exports = {
    createSubject: async (req, res) => {
        try {
            const { name, subjectCode } = req.body;
            if (!name || !subjectCode) {
                return res.badRequest({ err: 1, message: "Thất bại" });
            }
            const newSubject = await Subject.create({ name, subjectCode });
            return res.success({ data: newSubject });
        } catch (error) {
            sails.log.error('createSubject error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },

    //show 1 hoặc nhiều

    showSubject: async (req, res) => {
        try {
            const id = req.param('id');
            if (id) {
                const subject = await Subject.findOne({ id });
                if (!subject) {
                    return res.badRequest({ err: 1, message: "Thất bại" });
                }
                return res.success({ data: subject });
            }
            const listSubject = await Subject.find().sort('createdAt DESC')
            return res.success({ data: listSubject });
        } catch (error) {
            sails.log.error('showSubject error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },

    updateSubject: async (req, res) => {
        try {
            const id = req.param('id');
            if (!id) {
                return res.badRequest({ err: 1, message: "Thất bại" });
            }
            const { name, subjectCode } = req.body;
            if (!name || !subjectCode) {
                return res.badRequest({ err: 1, message: "Thất bại" });
            }
            const newSubject = await Subject.updateOne({ id }).set({ name, subjectCode });
            if (!newSubject) {
                return res.badRequest({ err: 1, message: "Thất bại" });
            }
            return res.success({ data: newSubject });
        } catch (error) {
            sails.log.error('updateSubject error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },
    deleteSubject: async (req, res) => {
        try {
            const id = req.param('id');
            if (!id) {
                return res.badRequest({ err: 1, message: 'Thiếu dữ liệu' });
            }
            const deleteSubject = await Subject.destroyOne({ id });
            if (!deleteSubject) {
                return res.notFound({ err: 1, message: 'Không tìm thấy môn học' });
            }
            return res.success({ data: deleteSubject });
        } catch (error) {
            sails.log.error('deleteSubject error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },
    //Tìm kiếm
    searchSubject: async (req, res) => {
        try {
            const searchText = (req.params.query || '').trim();
            if (!searchText) {
                return res.success({ data: [] });
            }
            const collection = Subject.getDatastore().manager.collection(Subject.tableName);
            const filter = {
                $or: [
                    { name: { $regex: new RegExp(searchText, 'i') } },
                    { subjectCode: { $regex: new RegExp(searchText, 'i') } }
                ]
            };
            const result = await collection.find(filter).limit(1000).toArray();
            return res.success({ data: result });
        } catch (error) {
            sails.log.error('searchSubject error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    }

}