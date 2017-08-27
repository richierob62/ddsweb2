import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
	title: '',
	type: '',
	message_list: []
})

const modal = (state = initial_state, action) => {
	let message_list

	let action_family = action.type
	if (action_family.indexOf('SAVE') !== -1 && action_family.indexOf('FAILED') !== -1) action_family = 'SAVE_FAILED'
	if (action_family.indexOf('DELETE') !== -1 && action_family.indexOf('FAILED') !== -1)
		action_family = 'DELETE_FAILED'
	if (action_family.indexOf('DELETE') !== -1 && action_family.indexOf('COMPLETED') !== -1)
		action_family = 'DELETE_COMPLETED'
	if (action_family.indexOf('SAVE') !== -1 && action_family.indexOf('COMPLETED') !== -1)
		action_family = 'SAVE_COMPLETED'

	switch (action_family) {
		case 'SAVE_FAILED':
			message_list = Object.keys(action.payload).map((key) => action.payload[key])
			return state
				.set('type', 'validation')
				.set('message_list', message_list)
				.set('title', 'Please fix the following...')

		case 'SAVE_COMPLETED':
			return state.set('type', 'success').set('title', 'Success').set('text', 'Saved successfully')

		case 'DELETE_FAILED':
			message_list = Object.keys(action.payload).map((key) => action.payload[key])

			return state
				.set('type', 'validation')
				.set('message_list', message_list)
				.set('title', 'Deletion Not Permitted')

		case 'DELETE_COMPLETED':
			return state.set('type', 'success').set('title', 'Success').set('text', 'Customer deleted')

		case 'CLOSE_MODAL':
			return state.set('type', '').set('message_list', []).set('title', '')

		case 'BEGIN_LOGIN':
			return state.set('type', 'login').set('message_list', []).set('title', 'Please log in')

		case 'AUTH_SUCCESS':
			return state.set('type', '').set('message_list', []).set('title', '')

		default:
			return state
	}
}

export default modal
