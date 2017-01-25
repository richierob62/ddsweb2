export const pipe = (...args) => {

    return (x) => {
        let result
        args.forEach( f => result = result ? f(result) : f(x))
        return result;
    }
}
