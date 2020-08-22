const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1,2)).toBe(3);
});

test('object assignment', () => {
    var person = {name:'George'};
    expect(person).toEqual({name:'George'});
});

test('string test', () => {
    var name = 'Maria';
    expect(name).not.toMatch('George');
});