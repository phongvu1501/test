module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    classes: {
      collection: 'class',
      via: 'grade'
    },
    students: {
      collection: 'student',
      via: 'grade'
    },
    teachers: {
      collection: 'teacher',
      via: 'grades'
    }
  }
};
