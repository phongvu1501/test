module.exports.routes = {
  // 'POST /api/student': {
  //   controller: 'StudentController',
  //   action: 'createStudent'
  // },
  //class
  'POST /api/class': {
    controller: 'ClassController',
    action: 'createClass'
  },
  'GET /api/class': {
    controller: 'ClassController',
    action: 'showClass'
  },
  'GET /api/class/:id': {
    controller: 'ClassController',
    action: 'showClass'
  },
  'POST /api/class/:id': {
    controller: 'ClassController',
    action: 'updateClass'
  },
  'DELETE /api/class/:id': {
    controller: 'ClassController',
    action: 'deleteClass'
  },
  'GET /api/class/search/:query': {
    controller: 'ClassController',
    action: 'searchClass'
  },
  //grade
  'POST /api/grade': {
    controller: 'GradeController',
    action: 'createGrade'
  },
  'GET /api/grade/:id': {
    controller: 'GradeController',
    action: 'showGrade'
  },
  'GET /api/grade': {
    controller: 'GradeController',
    action: 'showGrade'
  },
  'POST /api/grade/:id': {
    controller: 'GradeController',
    action: 'updateGrade'
  },
  'DELETE /api/grade/:id': {
    controller: 'GradeController',
    action: 'deleteGrade'
  },
  'GET /api/grade/search/:query': {
    controller: 'GradeController',
    action: 'searchGrade'
  },
  //student
  'POST /api/student': {
    controller: 'StudentController',
    action: 'createStudent'
  },
  'GET /api/student/:id': {
    controller: 'StudentController',
    action: 'showStudent'
  },
  'GET /api/student': {
    controller: 'StudentController',
    action: 'showStudent'
  },
  'POST /api/student/:id': {
    controller: 'StudentController',
    action: 'updateStudent'
  },
  'DELETE /api/student/:id': {
    controller: 'StudentController',
    action: 'deleteStudent'
  },
  'GET /api/student/search/:query': {
    controller: 'StudentController',
    action: 'searchStudent'
  },
  //teacher
  'POST /api/teacher': {
    controller: 'TeacherController',
    action: 'createTeacher'
  },
  'GET /api/teacher/:id': {
    controller: 'TeacherController',
    action: 'showTeacher'
  },
  'GET /api/teacher': {
    controller: 'TeacherController',
    action: 'showTeacher'
  },
  'POST /api/teacher/:id': {
    controller: 'TeacherController',
    action: 'updateTeacher'
  },
  'DELETE /api/teacher/:id': {
    controller: 'TeacherController',
    action: 'deleteTeacher'
  },
  'GET /api/teacher/search/:query': {
    controller: 'TeacherController',
    action: 'searchTeacher'
  },
  //position
  'POST /api/position': {
    controller: 'PositionController',
    action: 'createPosition'
  },
  'GET /api/position': {
    controller: 'PositionController',
    action: 'showPosition'
  },
  'GET /api/position/:id': {
    controller: 'PositionController',
    action: 'showPosition'
  },
  'POST /api/position/:id': {
    controller: 'PositionController',
    action: 'updatePosition'
  },
  'DELETE /api/position/:id': {
    controller: 'PositionController',
    action: 'deletePosition'
  },
  'GET /api/position/search/:query': {
    controller: 'PositionController',
    action: 'searchPosition'
  },
  //auth
  'GET /auth/google': {
    controller: 'AuthController',
    action: 'google'
  },

  'GET /auth/google/callback': {
    controller: 'AuthController',
    action: 'googleCallback'
  },

  //Môn học 

  'POST /api/subject': {
    controller: 'SubjectController',
    action: 'createSubject'
  },
  'GET /api/subject': {
    controller: 'SubjectController',
    action: 'showSubject'
  },
  'GET /api/subject/:id': {
    controller: 'SubjectController',
    action: 'showSubject'
  },
  'POST /api/subject/:id': {
    controller: 'SubjectController',
    action: 'updateSubject'
  },
  'DELETE /api/subject/:id': {
    controller: 'SubjectController',
    action: 'deleteSubject'
  },
  'GET /api/subject/search/:query': {
    controller: 'SubjectController',
    action: 'searchSubject'
  }
};
