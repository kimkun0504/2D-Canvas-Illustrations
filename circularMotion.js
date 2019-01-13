import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#590210', '#250205', '#BA0737', '#F33733', '#F5A9A7'];

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

// Objects
function Particle(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = .05;
    this.distanceFromCenter = utils.randomIntFromRange(40, 100);
    this.lastMouse = {x: x, y: y}
    // this.distanceFromCenter = {
    //     x: utils.randomIntFromRange(50, 120),
    //     y: utils.randomIntFromRange(50, 120)
    // }

    this.update = function () {

        const lastPoint = {x: this.x, y: this.y};
        //move points over time
        this.radians += this.velocity;

        //the drag effect
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        //circular motion
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        // this.y = this.lastMouse.y + Math.sin(this.radians) * 120;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        this.draw(lastPoint);
    }

    this.draw = lastPoint => {
        c.beginPath()
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke(); 
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        // c.fillStyle = this.color
        // c.fill()
        c.closePath()
    }
}

// Implementation
let particles;
function init() {
    particles = [];

    for (let i = 0; i < 100; i++) {
        const radius = (Math.random() * 2) + 1;
        particles.push(new Particle (canvas.width/2, canvas.height/2, radius, utils.randomColor(colors)));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(255, 255, 255, 0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
     particle.update();
    });
}

init()
animate()
