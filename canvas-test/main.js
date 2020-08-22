document.getElementById("btnDraw").addEventListener('click', drawSomething);

function drawSomething() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var canvas2 = document.getElementById("myCanvas2");
    var ctx2 = canvas2.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = 'orange';
    ctx.rect(100,100,100,100);
    ctx.fill();

    ctx2.strokeStyle = 'red';
    ctx2.font = '48px serif';
    ctx2.strokeText("Hello from Canvas", 50, 50);
}