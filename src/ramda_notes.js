import R from 'ramda'


// flow
R.compose(f, f)
R.cond([[f, f], [f, f], [f, f]])
R.ifElse(f, f, f)
R.pipe(f, f)
R.unless(f, f)
R.when(f, f)

// conditional
R.all(f, array);
R.both(a, b)
R.complement(f)
R.contains(a, array)
R.either(a, b)
R.equals(a, b)
R.filter(f, array)
R.gt(a, b)
R.gte(a, b)
R.has('a');
R.lt(a, b)
R.lte(a, b)
R.reject(f, array)

// iterate over
R.chain(f, array)
R.forEach(f, array)
R.map(f, array)

// select subset
R.drop(1, array)
R.dropLast(1, array)
R.find(f, array)
R.head(array)
R.init(array)
R.last(array)
R.nth(1, array)
R.remove(2, 3, array)
R.slice(2, 4, array)
R.tail(array)
R.take(2, array)
R.takeLast(2, array)
R.without(array, array)

// transform
R.always(a)
R.append(a, array)
R.assoc('a', b, obj)
R.assocPath(['a', 'b', 'c'], d, obj)
R.concat('a', 'b')
R.curry(f)
R.defaultTo(a, b)
R.dissoc('a', obj)
R.dissocPath(['a', 'b', 'c'], obj)
R.evolve(obj, obj)
R.flip(f)
R.identity
R.insert(2, 'x', array)
R.merge(obj, obj)
R.of(a)
R.over(lens, f, obj)
R.prepend(a, array)
R.reduce(f, init, array)
R.set(lens, a, obj)
R.update(1, a, array)
L.set(lens, a, obj)
L.over(lens, f, obj)


// properties
R.lens(f, f)
R.lensIndex(a)
R.lensPath(['x', 0, 'y'])
R.lensProp('a')
R.omit(['a', 'b'], obj)
R.path(['a', 'b'], obj)
R.pathOr('c', ['a', 'b'], obj)
R.pick(['a', 'b'], obj)
R.pickAll(['a', 'b'], obj)
R.prop(a, obj)
R.propOr('a', 'b', obj)
R.view(lens, obj)
L.makeLenses(['a', 'b', 'c', 'd', 'e', 'f'])
L.num(1)
L.view(lens, obj)
L.mapped
L.traversed
