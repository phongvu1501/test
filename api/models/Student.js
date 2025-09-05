module.exports = {
    attributes: {
        username: {
            type: 'string',
            required: true
        },
        gender: {
            type: 'string',
            isIn: ['Nam', 'Nữ', 'Khác'],
            defaultsTo: 'Khác'
        },
        birthday: {
            type: 'string',
            columnType: 'date'
        },
        address: {
            type: 'string'
        },
        phone: {
            type: 'string'
        },
        class: {
            model: 'class',
            required: true
        },
        grade: {
            model: 'grade',
            required: true
        },
        account: {
            model: 'account'
        },
        scores: {
            collection: 'diem',
            via: 'student'
        }
    }
};