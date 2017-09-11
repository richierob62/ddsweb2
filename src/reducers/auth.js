import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
	loggedIn: true,
	token: 'BQPXWxsJZsWFVmlUU_YmO@tTYN2Ub844TaMOvoTSuVMbu5u!okssmMGhxY@x_lRc',
	message: ''
})

const auth = (state = initial_state, action = {}) => {
	switch (action.type) {
		case 'BEGIN_LOGIN':
			return state
				.set('history_obj', action.payload.history)
				.set('next_page', action.payload.path)
				.set('loggedIn', false)
				.set('token', '')

		case 'AUTH_FAIL':
			return state.set('message', action.payload.message)

		case 'AUTH_SUCCESS':
			return state
				.set('email', action.payload.email)
				.set('name', action.payload.name)
				.set('code', action.payload.code)
				.set('token', action.payload.token)
				.set('loggedIn', true)
				.set('message', '')
				.set('sleep_start_time', new Date().getTime())

		case 'CLEAR_LOGIN_ERROR':
			return state.set('message', '')

		case 'CHECK_SLEEP':
			if (new Date().getTime() - state.get('sleep_start_time') > 5 * 60 * 1000)
				return state.set('loggedIn', false).set('token', '')
			return state

		default:
			return state
	}
}

export default auth
