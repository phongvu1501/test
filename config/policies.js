/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

// const AuthController = require("../api/controllers/AuthController");

// const Position = require("../api/models/Position");

// // const { updateClass } = require("../api/controllers/ClassController");


module.exports.policies = {
  // '*': false,
  // AuthController: {
  //   google: true,
  //   googleCallback: true,
  // },

  ClassController: {
    '*': true,
  },
  GradeController: {
    '*': true,
  },
  StudentController: {
    '*': true,
  },
  TeacherController: {
    '*': true,
  },
  PositionController: {
    '*': true,
  },
  UserController: {
    '*': true,
  },
  SubjectController: {
    '*':true,
  },
  ScoreController: {
    '*': true,
  },

};
