// Reducers
it('should return the initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual([
        {
            text: 'Use Redux',
            completed: false,
            id: 0
        }
    ])

    expect(
        reducer([], {
            type: types.ADD_TODO,
            text: 'Run the tests'
        })
    ).toEqual(
        [
            {
                text: 'Run the tests',
                completed: false,
                id: 0
            }
        ]
        )
})

// Components
it('renders without crashing', () => {
    const el = shallow(<CustomerList store={store} />);
    expect(shallowToJson(el)).toMatchSnapshot();
});

it('handles a line select', () => {
    const el = mount(<CustomerList store={store_2} />);
    el.find('#data-row-1').simulate('click');
    expect(store_2.dispatch).toBeCalledWith({ "payload": 1, "type": "SELECT_CUSTOMER" });
});

