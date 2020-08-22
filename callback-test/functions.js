
document.getElementById('btnGetName').addEventListener('click', function() {
    getName(greeting)
});

function getName(callback) {
    var name = prompt('Please enter your name.');
    callback(name);
}

function greeting(name) {
    alert('Hello ' + name);
}