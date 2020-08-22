const ajax = require('./ajax');

//jest.setTimeout(30000);

test('Test a user fetch', () => {
    return expect(ajax.getUser('123')).resolves.toEqual({"Username": "gpapadop", "Email": "gpapadop@gmail.com", "FirstName":"George","LastName":"Papadopoulos"});
});