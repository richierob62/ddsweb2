// Structure Types and methods
// -----------------------------------------------
// map => Functor
// map, ap, of => Applicative (function in Monad)
// map, ap, of, chain => Monad

// ramda-fantasy structures usage
// -----------------------------------------------
// if/else => Either
// possible errors => Either
// try/catch => Either
// possible null value => Maybe
// possible null parameters => Applicative
// async operation => Future

// Maybe specifics
// -----------------------------------------------
// Maybe.Just
// Maybe.Nothing
// getOrElse

// Either specifics
// -----------------------------------------------
// Either.Left
// Either.Right
// Either.either  error_handler => success_handler => Either => *

// Future specifics
// -----------------------------------------------

// IO specifics
// -----------------------------------------------

// Reader specifics
// -----------------------------------------------

// State specifics
// -----------------------------------------------

// Tuple specifics
// -----------------------------------------------

// Identity specifics
// -----------------------------------------------



// ramda funcs
// -----------------------------------------------
// prop
// path
// curry
// curryN
// traverse
// compose
// pipe



// Strategies
// -----------------------------------------------
// Applicative = Monad.map(curriedFunction)
// Monad = Monad.chain(FunctionReturningMonad)
// Monad = Applicative.ap(Monad)

