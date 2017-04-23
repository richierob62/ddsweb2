export const pipe = (...args) => {

    return (x) => {
        let result
        args.forEach(f => result = result ? f(result) : f(x))
        return result;
    }
}

export const compose = (...args) => {
    const len = args.length
    const reversed_list = args.reduce((acc, arg, idx, array) => {
        acc.push(array[len - 1 - idx])
    }, [])
    return (x) => {
        let result
        reversed_list.forEach(f => result = result ? f(result) : f(x))
        return result
    }
}

export const flatten = list => list.reduce((acc, item) => acc.concat(item), [])

export const chain = func => list => compose( flatten, list.map(func) )


