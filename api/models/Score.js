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

    // customToJSON: function () {
    //     var obj = this.toObject();

    //     let canCalculate = true;
    //     let sumRegular = 0;
    //     if (!obj.regularScores || obj.regularScores.length === 0) {
    //         canCalculate = false;
    //     } else {
    //         sumRegular = obj.regularScores.reduce((acc, score) => acc + parseFloat(score), 0);
    //     }

    //     if (obj.midtermScore == null || obj.finalScore == null) {
    //         canCalculate = false;
    //     }

    //     if (canCalculate) {
    //         const avgRegular = sumRegular / obj.regularScores.length;

    //         // Áp dụng công thức: (Điểm TX * 1 + Điểm GK * 2 + Điểm CK * 3) / 6
    //         const semesterAverage = (avgRegular + (obj.midtermScore * 2) + (obj.finalScore * 3)) / 6;

    //         obj.semesterAverage = parseFloat(semesterAverage.toFixed(2));
    //     } else {
    //         // Nếu không đủ điểm, trả về null
    //         obj.semesterAverage = null;
    //     }

    //     return obj;
    // }

};