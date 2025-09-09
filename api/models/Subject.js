/**
 * Subject.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      description: 'Tên môn học',
    },
    subjectCode: {
      type: 'string',
      required: true,
      unique: true, // Đảm bảo mỗi mã môn học là duy nhất
    },
    teachers: {
      collection: 'teacher', // Liên kết với model 'teacher'
      via: 'subject'         // Thông qua thuộc tính 'subject' bên model Teacher
    },
    scores: {
      collection: 'score',
      via: 'subject'
    }
  }
}

