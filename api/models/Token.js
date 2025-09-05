module.exports = {
    attributes: {
        token: {
            type: 'string',
            required: true,
            unique: true,
            description: 'JWT hoặc access token đại diện cho phiên đăng nhập',
        },
        // Liên kết với Account (1 account có thể có nhiều token trên nhiều thiết bị)
        account: {
            model: 'account',
            required: true,
            description: 'Tài khoản sở hữu token',
        },
        expiredAt: {
            type: 'ref',
            columnType: 'datetime',
            required: true,
            description: 'Thời điểm token hết hạn',
        },
        deviceId: {
            type: 'string',
            defaultsTo: '',
            description: 'Thiết bị tạo token (mobile, web...)',
        },
        status: {
            type: 'number',
            isIn: [0, 1, 2, 3],
            defaultsTo: 1,
            description: 'Trạng thái của token',
        },
        client: {
            type: 'string',
            required: true,
            description: 'Đối tượng sử dụng token'
        },
        channel: {
            type: 'string',
            isIn: ['mobile', 'web', 'google', 'facebook'],
            defaultsTo: 'web',
            description: 'Kênh tạo token (normal, google login...)',
        },
        ip: {
            type: 'string',
            defaultsTo: '',
            description: 'Địa chỉ IP tạo token',
        },
    },
};
