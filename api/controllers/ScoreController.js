module.exports = {
    createScore: async (req, res) => {
        try {
            const { studentId, subjectId, regularScores, midtermScore, finalScore, semester, schoolYear } = req.body;
           if( !studentId || !subjectId || !semester || !schoolYear ) {
                return res.badRequest({ err: 1, message: 'Thiếu dữ liệu' });
           }
        } catch (error) {

        }
    }
};