const { update } = require("lodash");

module.exports = {
    //Thêm khối mới
    createGrade: async (req, res) => {
        try {
            const { name } = req.body;
            if (!name) {
                return res.badRequest({
                    err: 1,
                    message: 'Thiếu dữ liệu'
                });
            }
            const newGrade = await Grade.create({ name });
            return res.success({
                data: newGrade
            });

        } catch (error) {
            sails.log.error('createGrade error:', error);
            return res.s({
                err: 1,
                message: 'Thất bại',
                details: error.message
            });
        }
    },
    //Lấy 1 hoặc tất cả các khối 
    showGrade: async (req, res) => {
        try {
            const id = req.param('id');
            if (id) {
                const Class = sails.models.class;
                const showOneGrade = await Grade.findOne({ id });
                if (!showOneGrade) {
                    return res.notFound({
                        err: 1,
                        message: "Không tìm thấy khối lớp"
                    });
                }
                return res.success({
                    data: { showOneGrade, classes: await Class.find({ grade: id }) }
                });
            }
            const listGrade = await Grade.find().sort('createdAt DESC');
            return res.success({
                data: listGrade
            });
        } catch (error) {
            sails.log.error('showGrade error:', error);
            return res.serverError({
                err: 1,
                message: 'Thất bại',
                details: error.message
            });
        }
    },
    // Cập nhật khối
    updateGrade: async (req, res) => {
        try {
            const id = req.param('id');
            const { name } = req.body;
            if (!id || !name) {
                return res.badRequest({
                    err: 1,
                    message: 'Thiếu dữ liệu'
                });
            }
            const updatedGrade = await Grade.updateOne({ id }).set({ name });
            if (!updatedGrade) {
                return res.notFound({
                    err: 1,
                    message: 'Không tìm thấy khối lớp'
                });
            }
            return res.success({
                data: updatedGrade
            });
        } catch (error) {
            sails.log.error('updateGrade error:', error);
            return res.serverError({
                err: 1,
                message: 'Thất bại',
                details: error.message
            });
        }
    },
    // Xóa khối
    deleteGrade: async (req, res) => {
        const id = req.param('id');
        if (!id) {
            return res.badRequest({
                err: 1,
                message: 'Thiếu dữ liệu'
            });
        }
        try {
            const deletedGrade = await Grade.destroyOne({ id });
            if (!deletedGrade) {
                return res.notFound({
                    err: 1,
                    message: 'Không tìm thấy khối lớp'
                });
            }
            return res.success({
                data: deletedGrade
            });
        } catch (error) {
            sails.log.error('deleteGrade error:', error);
            return res.serverError({
                err: 1,
                message: 'Thất bại',
                details: error.message
            });
        }
    },
    // Tìm kiếm khối học theo tên 
    searchGrade: async (req, res) => {
        try {
            const searchText = (req.params.query || '').trim();
            if (!searchText) {
                return res.success({ data: [] });
            }
            const collection = Grade.getDatastore().manager.collection(Grade.tableName);
            const filter = {
                $or: [
                    { name: { $regex: new RegExp(searchText, 'i') } }
                ]
            };
            const result = await collection.find(filter).limit(1000).toArray();
            return res.success({ data: result });
        } catch (error) {
            sails.log.error('searchGrade error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    }
};
