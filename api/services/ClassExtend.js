// api/services/ClassExtend.js
module.exports = {
  createClass: async (dataInput) => {
    try {
      const { name, schoolYear, gradeId } = dataInput;

      if (!name || !schoolYear || !gradeId) {
        return { err: 1, message: 'Thiếu dữ liệu' };
      }
      const grade = await Grade.findOne({ id: gradeId });
      if (!grade) {
        return { err: 1, message: 'Khối lớp không tồn tại' };
      }

      const newClass = await Class.create({ name, schoolYear, grade: gradeId }).fetch();
      return { err: 0, data: newClass };
    } catch (error) {
      sails.log.error('ClassExtend.createClass error:', error);
      return { err: 1, message: 'Lỗi hệ thống', details: error.message };
    }
  },

  showClass: async (id) => {
    try {
      if (id) {
        const classRecord = await Class.findOne({ id }).populate('students');
        if (!classRecord) {
          return { err: 1, message: 'Không tìm thấy lớp' };
        }
        return { err: 0, data: classRecord };
      }
      const list = await Class.find().sort('createdAt DESC').populate('grade');
      return { err: 0, data: list };
    } catch (error) {
      sails.log.error('ClassExtend.showClass error:', error);
      return { err: 1, message: 'Lỗi hệ thống', details: error.message };
    }
  },

  updateClass: async (dataInput) => {
    try {
      const { id, name, schoolYear, gradeId } = dataInput;
      if (!id || !name || !schoolYear || !gradeId) {
        return { err: 1, message: 'Thiếu dữ liệu' };
      }
      const grade = await Grade.findOne({ id: gradeId });
      if (!grade) {
        return { err: 1, message: 'Khối lớp không tồn tại' };
      }

      const updatedClass = await Class.updateOne({ id }).set({ name, schoolYear, grade: gradeId }).fetch();
      if (!updatedClass) {
        return { err: 1, message: 'Không tìm thấy lớp' };
      }
      return { err: 0, data: updatedClass };
    } catch (error) {
      sails.log.error('ClassExtend.updateClass error:', error);
      return { err: 1, message: 'Lỗi hệ thống', details: error.message };
    }
  },

  deleteClass: async (id) => {
    try {
      if (!id) {
        return { err: 1, message: 'Thiếu dữ liệu' };
      }
      const deletedClass = await Class.destroyOne({ id });
      if (!deletedClass) {
        return { err: 1, message: 'Không tìm thấy lớp' };
      }
      return { err: 0, data: deletedClass };
    } catch (error) {
      sails.log.error('ClassExtend.deleteClass error:', error);
      return { err: 1, message: 'Lỗi hệ thống', details: error.message };
    }
  },
  
  searchClass: async (searchText) => {
    try {
      const cleanSearchText = (searchText || '').trim();
      if (!cleanSearchText) {
        return { err: 0, data: [] };
      }
      const result = await Class.find({
        where: {
          or: [
            { name: { 'contains': cleanSearchText } },
            { schoolYear: { 'contains': cleanSearchText } }
          ]
        },
        limit: 20
      });
      return { err: 0, data: result };
    } catch (error) {
        sails.log.error('ClassExtend.searchClass error:', error);
        return { err: 1, message: 'Lỗi hệ thống', details: error.message };
    }
  }
};