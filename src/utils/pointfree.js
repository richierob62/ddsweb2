const compose = (...args) => {
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

const identity = x => x
const func_identity = x => () => x
const of = x => x.of

const map = func => object => {
    if (object.map) return object.map(func)
    return chain(
        compose(of(object), func),
        object
    )
}

const chain = func => monad => monad.chain ? monad.chain(func) : monad.then(func)
const fold = func => monad => monad.fold(func) 


// needs
const monad = {
// of, map, chain, fold
    fold: func => func(this.value),
    chain: func => compose( this.map(func))
    for (var item of list) {
        yield* transform(item);
    }
}
}

module.exports = [
    chain,
    compose,
    fold,
    func_identity,
    identity,
    map,
]