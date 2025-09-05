module.exports = {
    attributes: {
        positionName: {
            type: 'string',
            required: true 
        },
        description: {
            type: 'string'
        },
        teachers: {
            collection: 'teacher',
            via: 'positions'
        }
    }
};