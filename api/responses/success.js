module.exports = function success(dataInput = { data: {} }) {
    var req = this.req;
    var res = this.res;
    return res.status(200).json({
        err: 0,
        ...dataInput,
        message: 'Thành công'
    });
};