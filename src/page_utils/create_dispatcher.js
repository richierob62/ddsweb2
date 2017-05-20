const createEventDispatcher = (fst, last, { dispatch, act, data }) => {
    const action = fst + data.get('action_word') + last
    const func = act[action]
    return (payload) => dispatch(func(payload))
}

export default createEventDispatcher


