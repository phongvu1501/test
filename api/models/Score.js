module.exports = {
    attributes: {
        student: {
            model: 'student',
            required: true
        },
        subject: {
            model: 'subject',
            required: true
        },
        regularScores: {
            type: 'json',
            columnType: 'array',
            description: 'Mảng các điểm đánh giá thường xuyên (kiểm tra miệng, 15 phút, ...)',
        },
        midtermScore: {
            type: 'number',
            description: 'Điểm đánh giá giữa kỳ (kiểm tra 1 tiết)',
        },
        finalScore: {
            type: 'number',
            description: 'Điểm đánh giá cuối kỳ (thi cuối kỳ)',
        },
        semester: {
            type: 'number',
            isIn: [1, 2],
            required: true,
        },
        schoolYear: {
            type: 'string',
            required: true,
        },
    },
};