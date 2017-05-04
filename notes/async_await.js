const apiService = async (foo) => {
    const response = await fetch(foo)
    const body = await response.json()
    if (body.error !== undefined)
        throw Error(body.error.message)
    return body
}


const apiServiceCaller = async (bar) => {

    try {

        const [data1, data2] = await Promise.all([
            apiService(bar),
            apiService(bar + 'something')
        ])

        console.log(data1.foo)
        console.log(data2.something)

    } catch (err) {

        console.log(err)

    }
}

apiServiceCaller('baz')