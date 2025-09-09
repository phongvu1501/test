module.exports = {
    createScore: async function (req, res) {
        try {
            const { student, subject, regularScores, midtermScore, finalScore, semester, schoolYear } = req.body;

            if (!student || !subject || !semester || !schoolYear) {
                return res.badRequest({ err: 1, message: 'Student, Subject, Semester, and School Year are required fields.' });
            }

            const [studentData, subjectData] = await Promise.all([
                sails.models.student.findOne({ id: student }),
                sails.models.subject.findOne({ id: subject })
            ]);

            if (!studentData || !subjectData) {
                return res.badRequest({ err: 1, message: !studentData ? 'Student not found' : 'Subject not found' });
            }

            const newScore = await Score.create({
                student: studentData.id,
                subject: subjectData.id,
                regularScores,
                midtermScore,
                finalScore,
                semester,
                schoolYear
            });
            return res.success({ data: newScore });
        } catch (err) {
            sails.log.error('createScore error:', err);
            return res.serverError({ err: 1, message: 'Thất bại', details: err.message });
        }
    },

    showScore: async (req, res) => {
        try {
            const id = req.param('id');
            if (id) {
                const score = await Score.findOne({ id }).populate('student').populate('subject');
                if (!score) {
                    return res.badRequest({ err: 1, message: 'Score not found' });
                }
                return res.success({ data: score });
            }
            const lists = await Score.find().sort('createdAt DESC');
            return res.success({ data: lists });
        } catch (error) {
            sails.log.error('showScore error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },

    updateScore: async (req, res) => {
        try {
            const id = req.param('id');
            if (!id) {
                return res.badRequest({ err: 1, message: 'Score ID is required' });
            }
            const { student, subject, regularScores, midtermScore, finalScore, semester, schoolYear } = req.body;

            if (!student || !subject || !semester || !schoolYear) {
                return res.badRequest({ err: 1, message: 'Student, Subject, Semester, and School Year are required fields.' });
            }

            const [studentData, subjectData] = await Promise.all([
                sails.models.student.findOne({ id: student }),
                sails.models.subject.findOne({ id: subject })
            ]);

            if (!studentData || !subjectData) {
                return res.badRequest({ err: 1, message: !studentData ? 'Student not found' : 'Subject not found' });
            }

            const updatedScore = await Score.updateOne({ id }).set({
                student: studentData.id,
                subject: subjectData.id,
                regularScores,
                midtermScore,
                finalScore,
                semester,
                schoolYear
            });

            return res.success({ data: updatedScore });
        } catch (error) {
            sails.log.error('updateScore error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });
        }
    },
    deleteScore: async (req, res) => {
        try {
            const id = req.param('id');
            if (!id) {
                return res.badRequest({ err: 1, message: 'Score ID is required' });
            }
            const deletedScore = await Score.destroyOne({ id });
            if (!deletedScore) {
                return res.notFound({ err: 1, message: 'Score not found' });
            }
            return res.success({ data: deletedScore });
        } catch (error) {
            sails.log.error('deleteScore error:', error);
            return res.serverError({ err: 1, message: 'Thất bại', details: error.message });    
        }
    }

};