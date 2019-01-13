import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const gravity = 1;
const friction = 0.95;

const colors = ['#2B3A42', '#3F5866', '#BDD3DE', '#F0F0DF', '#FF8F00']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

addEventListener('click', () => {
    init();
})

// Objects
function Ball(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color

    this.update = function() {
        if(this.y + this.radius + this.dy > canvas.height){
            this.dy = -this.dy * friction;
        } else { // the gravity simulation
            this.dy += gravity;
        }

        if(this.x - this.radius <= 0|| this.x + this.radius + this.dx > canvas.width) {
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw()
    }    

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.stroke();
        c.closePath()
    }
}




// Implementation
let ball;
let ballArray = [];
function init() {
    ballArray = [];
    for (let i = 0; i < 400; i++) {
        let radius = utils.randomIntFromRange(10, 20); 
        let x = utils.randomIntFromRange(radius, canvas.width - radius);
        let y = utils.randomIntFromRange(0, canvas.height - radius);
        let dx = utils.randomIntFromRange(-2, 2);
        let dy = utils.randomIntFromRange(-2, 2);
        let color = utils.randomColor(colors);
        
        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height)

    for(let i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }
    ball.update();

    // objects.forEach(object => {
    //  object.update();
    // });
}

init()
animate()
