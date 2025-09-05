const { google } = require("../controllers/UserController");

module.exports = {
    attributes: {
        googleId: {
            type: 'string',
            unique: true
        },
        fullName: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            // required: true
            allowNull: true
        },
        role: {
            type: 'string',
            isIn: ['teacher', 'student', 'admin'],
            defaultsTo: 'student'
        },
        teacher: {
            model: 'teacher'
        },
        student: {
            model: 'student'
        },
        avatar: {
            type: 'string'
        }
    }
};