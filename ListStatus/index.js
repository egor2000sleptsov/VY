export default {
    notExist: (data = null) => ({
        status: 'notExist',
        data,
    }),

    success: (data = null) => ({
        status: 'success',
        data,
    }),

    notSuccess: (data = null) => ({
        status: 'notSuccess',
        data,
    }),
}
