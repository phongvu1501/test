module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    schoolYear: {
      type: 'string',
      required: true
    },
    grade: {
      model: 'grade',
      required: true
    },
    teacher: {
      model: 'teacher'
    },
    students: {
      collection: 'student',
      via: 'class'
    }
  }
};