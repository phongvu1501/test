// api/controllers/ClassController.js
module.exports = {
    createClass: async (req, res) => {
        try {
            const result = await ClassExtend.createClass(req.body);
            if (result.err) {
                return res.badRequest(result);
            }
            return res.success(result);
        } catch (error) {
            sails.log.error('ClassController.createClass error:', error);
            return res.serverError({ err: 1, message: 'Lỗi hệ thống' });
        }
    },

    showClass: async (req, res) => {
        try {
            const result = await ClassExtend.showClass(req.params.id);
            if (result.err) {
                return res.badRequest(result);
            }
            return res.success(result);
        } catch (error) {
            sails.log.error('ClassController.showClass error:', error);
            return res.serverError({ err: 1, message: 'Lỗi hệ thống' });
        }
    },

    updateClass: async (req, res) => {
        try {
            const dataInput = { ...req.body, id: req.params.id };
            const result = await ClassExtend.updateClass(dataInput);
            if (result.err) {
                return res.badRequest(result);
            }
            return res.success(result);
        } catch (error) {
            sails.log.error('ClassController.updateClass error:', error);
            return res.serverError({ err: 1, message: 'Lỗi hệ thống' });
        }
    },

    deleteClass: async (req, res) => {
        try {
            const result = await ClassExtend.deleteClass(req.params.id);
            if (result.err) {
                return res.badRequest(result);
            }
            return res.success(result);
        } catch (error) {
            sails.log.error('ClassController.deleteClass error:', error);
            return res.serverError({ err: 1, message: 'Lỗi hệ thống' });
        }
    },

    searchClass: async (req, res) => {
        try {
            const result = await ClassExtend.searchClass(req.params.query);
            if (result.err) {
                return res.badRequest(result);
            }
            return res.success(result);
        } catch (error) {
            sails.log.error('ClassController.searchClass error:', error);
            return res.serverError({ err: 1, message: 'Lỗi hệ thống' });
        }
    }
};