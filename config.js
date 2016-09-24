module.exports =   {
    endpoints: {
        product: {
            list: {
                type: 'GET',
                url: '/products'
            },
            insertMany: {
                type: 'POST',
                url: '/insertMany'
            }
        },
        auth: {
            token: {
                type: 'GET',
                url: '/token'
            }
        }

    }
}