module.exports = {
    createPosition: async (req, res) => {
        try {
            const { positionName, description } = req.body;
            if (!positionName) {
                return res.badRequest({
                    err: 1,
                    message: 'Thiếu dữ liệu'
                });
            }
            const newPosition = await Position.create({ positionName, description });
            return res.success({
                data: newPosition
            });
        } catch (error) {
            sails.log.error('createPosition error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },
    showPosition: async (req, res) => {
        try {
            const id = req.param('id');
            if (id) {
                const position = await Position.findOne({ id });
                if (!position) {
                    return res.notFound({ err: 1, message: 'Không tìm thấy chức vụ' });
                }
                return res.success({ data: position });
            }
            const list = await Position.find().sort('createdAt DESC');
            return res.success({ data: list });
        } catch (error) {
            sails.log.error('showPosition error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },
    updatePosition: async (req, res) => {
        try {
            const id = req.param('id');
            if (!id) {
                return res.badRequest({ err: 1, message: 'Thiếu dữ liệu' });
            }
            const { positionName, description } = req.body;
            if (!positionName) {
                return res.badRequest({ err: 1, message: 'Thiếu dữ liệu' });
            }
            const updatedPosition = await Position.updateOne({ id }).set({ positionName, description });
            if (!updatedPosition) {
                return res.badRequest({ err: 1, message: 'Cập nhật thất bại' });
            }
            return res.success({ data: updatedPosition });
        } catch (error) {
            sails.log.error('updatePosition error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },
    deletePosition: async (req, res) => {
        try {
            const id = req.param('id');
            if (!id) {
                return res.badRequest({ err: 1, message: 'Thiếu dữ liệu' });
            }
            const deletedPosition = await Position.destroyOne({ id });
            if (!deletedPosition) {
                return res.badRequest({ err: 1, message: 'Xóa thất bại' });
            }
            return res.success({ data: deletedPosition });
        } catch (error) {
            sails.log.error('deletePosition error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },
    searchPosition: async (req, res) => {
        try {
            const searchText = (req.params.query || '').trim();
            if (!searchText) {
                return res.success({ data: [] });
            }
            const collection = Position.getDatastore().manager.collection(Position.tableName);
            const filter = {
                $or: [
                    { positionName: { $regex: new RegExp(searchText, 'i') } },
                    { description: { $regex: new RegExp(searchText, 'i') } }
                ]
            };
            const result = await collection.find(filter).limit(1000).toArray();
            return res.success({ data: result });
        } catch (error) {
            sails.log.error('searchPosition error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    }
}
