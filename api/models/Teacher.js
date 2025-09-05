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
        phone: {
            type: 'string'
        },
        address: {
            type: 'string'
        },
        specialization: {
            type: 'string'
        },
        qualification: {
            type: 'string'
        },
        joinDate: {
            type: 'string',
            columnType: 'date'
        },
        status: {
            type: 'string',
            isIn: ['Đang công tác', 'Nghỉ việc', 'Khác'],
            defaultsTo: 'Đang công tác'
        },
        avatar: {
            type: 'string'
        },
        account: {
            model: 'account'
        },
        classes: {
            collection: 'class',
            via: 'teacher'
        },
        grades: {
            collection: 'grade',
            via: 'teachers'
        },
        positions: {
            collection: 'position',
            via: 'teachers'
        },
        subject: {
            model: 'subject',   // Liên kết với model 'subject'
            // required: true    // Bạn có thể thêm dòng này nếu muốn bắt buộc mỗi giáo viên phải có một môn học
        },
    }
};
