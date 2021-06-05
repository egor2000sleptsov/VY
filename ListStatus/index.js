export default {
    notExist: (data = null) => ({
        status: 'notExist',
        data: data,
    }),

    success: (data = null) => ({
        status: 'success',
        data: data,
    }),

    notSuccess: (data = null) => ({
        status: 'notSuccess',
        data: data,
    }),

    invalidSubmethod: (data = null) => ({
        status: 'invalidSubmethod',
        data: data,
    }),

    invalidMethod: (data = null) => ({
        status: 'invalidMethod',
        data: data,
    }),
}
