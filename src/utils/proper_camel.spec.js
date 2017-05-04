import proper_camel from './proper_camel'


it('converts a snaked table name to proper camel case', () => {
    expect( proper_camel('foo_bar')).toEqual('FooBar')
    expect( proper_camel('foo_bar_baz')).toEqual('FooBarBaz')
    expect( proper_camel('foo')).toEqual('Foo')
})



