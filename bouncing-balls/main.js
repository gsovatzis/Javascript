// setup canvas
var canvas = document.querySelector('canvas');  // Get the canvas HTML element
var ctx = canvas.getContext('2d');              // Get the 2D context to draw on
var animationId;
var animationStopped = false;   

// get the width and height of the browser viewport - we chain the assignments:
// width <- canvas.width <- window.innerWidth
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

document.getElementById("stopStart").addEventListener('click', stopStartAnim);
window.onresize = resizeCanvas;

// The array that will keep our balls objects
var balls = [];

// function to generate random number
function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

// The ball object
function Ball(x, y, velX, velY, color, size) {
    this.x = x;             // the x coordinate that the ball will start on the screen
    this.y = y;             // the y coordinate that the ball will start on the screen
    this.velX = velX;       // velocity X -> how many pixels will be added to x in order to move the ball
    this.velY = velY;       // velocity Y -> how many pixels will be added to y in order to move the ball
    this.color = color;     // the color of the ball
    this.size = size;       // the size of the ball in pixels (radius)
}

// Add ball draw method
Ball.prototype.draw = function () {
    ctx.beginPath();                                        // Tell the context that we want to draw
    ctx.fillStyle = this.color;                             // Setup the drawing color
    ctx.strokeStyle = this.color;                             
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);     // Draw a circle (arc), on position x,y, radius in px, start-end degrees in radians (0, 360 degrees)
    ctx.fill();                                             // Do the actual drawing (finish the beginPath command)
}

/* Add ball update method -> It checks whether the x/y coordinates have reached the viewport limits (0,0 - width,height)
   and reverses the velX and velY in order for the ball to travel to the opposite direction
*/
Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}

// Ball collission detection function
// It basically checks if the current ball has collided with another ball in the balls array
Ball.prototype.collisionDetect = function () {
    for (var j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {         // we don't want to check ourselves (the current ball)
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            // If balls collide, change their color to a new random color
            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        }
    }
}

// This is the animation loop function that does all the work!
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';  // Set canvas fill color to semi-transparent black - play with the last parameter on transparency
    ctx.fillRect(0, 0, width, height);      // Draw a rectangle to the whole viewPort

    // for each ball, draw and update position
    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    /*
        requestAnimationFrame requests the browser to call the callback function
        before the next repaint. Call-back is usuall 60 times per second or matches the refresh rate.
        If browser tab is hidden or running on the background, calls are paused to save CPU and battery!

        It returns a number which you can pass to window.cancelAnimationFrame(requestID) to cancel the refresh callback!
    */
    animationId = requestAnimationFrame(loop);
}

initBalls(25);
loop(); // Start the animation loop!

function stopStartAnim() {
    if(animationStopped)
    {
        animationId = requestAnimationFrame(loop);
        animationStopped = false;
    } else {
        cancelAnimationFrame(animationId);
        animationStopped = true;
    }

}

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initBalls(25);
}

function initBalls(ballsNumber) {
    balls = [];
    
    // The following loop creates 25 random ball objects and pushes them in the array
    // We can add more than 25 balls if our processing power permits
    while (balls.length < ballsNumber) {
        var size = random(10, 20);  // Random size between 10 and 20 pixels
        var ball = new Ball(
            // ball position always drawn at least one ball width
            // away from the edge of the canvas, to avoid drawing errors
            random(0 + size, width - size),
            random(0 + size, height - size),
            random(-7, 7),  // Velocity X between -7 and 7
            random(-7, 7),  // Velocity Y between -7 and 7
            'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',    // Random RGB color
            size
        );
        balls.push(ball);   // push the ball in our balls array
    }
}