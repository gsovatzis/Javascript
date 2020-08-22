// My person object, implemented with closures
var person = function() {
    // Private properties
    var name = '';
    var surname = '';
    var age = 0;

    return {
        getName: function() {
            return name;
        },
        setName: function(value) {
            name = value;
        },
        getSurname: function() {
            return surname;
        },
        setSurname: function(value) {
            surname = value;
        },
        getAge: function() {
            return age;
        },
        setAge: function(value) {

            if(isNaN(value))
                throw new Error('Invalid Age');

            if(value<0 || value >120)
                throw new Error('Invalid Age');
            
            age = value;
        },
        toString: function() {
            return `Hello, my full name is ${name} ${surname} and I am ${age} years old.`;
        }
    }

};


// Initialize button callbacks
document.getElementById("testClosure").addEventListener('click', testClosure);

function testClosure() {
    var p1 = person();
    p1.name = 'Maria';  // This is just a dynamic property which is not saved with our object
    console.log(p1.toString());     // as you can see, the name Maria doesn't appear

    try {
        p1.setName('George'); p1.setSurname('Sovatzis'); p1.setAge('abc');
        console.log(p1.toString());
    } catch(ex) {
        console.log(ex);            // Print error with full stack trace
        console.log(ex.message);    // Just print error's message
    }
    
}

function makeSizer2(size) {
    document.body.style.fontSize = size + 'px';
}

function makeSizer(size) {
    return function () {
        document.body.style.fontSize = size + 'px';
    };
}

var size12 = makeSizer(12);
var size22 = makeSizer(22);
var size32 = makeSizer(32);

document.getElementById('size-12').onclick = size12;
document.getElementById('size-22').onclick = function() { makeSizer2(22);};
document.getElementById('size-32').onclick = size32;
