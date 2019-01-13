import utils from './utils';

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#112F41', '#068587', '#4FB99F', '#F2B134', '#ED553B']

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
function Particles(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
        x: (Math.random() - .5) *5,
        y: (Math.random() - .5) *5
    }
    this.mass = 1;
    this.radius = radius;
    this.color = color;
    this.opacity = 0;

    this.update = (particles) => {
        this.draw();
        for(let i = 0; i < particles.length; i++){
            if(this === particles[i]) continue;
            if(utils.getDistance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0){
                utils.resolveCollision(this, particles[i]);
            }
        }

        if(this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
            this.velocity.x = -this.velocity.x;
        }

        if(this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
            this.velocity.y = -this.velocity.y;
        }

        // mouse collision interaction
        if(utils.getDistance(mouse.x, mouse.y, this.x, this.y) < 100 && this.opacity < 0.3){
            this.opacity += 0.03;
        } else if(this.opacity > 0 ) {
            this.opacity -= 0.03;

            this.opacity = Math.max(0, this.opacity);
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.save(); // the fill is just contained within the save and the restore function.
        c.globalAlpha = this.opacity; // makes the entire canvas light
        c.fillStyle = this.color;
        c.fill();
        c.restore(); // this will restore the fill style of the canvas to normal
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath()
    }

    
}

// Particles.prototype.draw = function() {
    
// }

// Particles.prototype.update = function() {
//     this.draw()
// }

// Implementation
let particles;
function init() {
    particles = []

    for (let i = 0; i < 200; i++) {
        const radius = 15;
        let x = utils.randomIntFromRange(radius, canvas.width - radius);
        let y = utils.randomIntFromRange(radius, canvas.height - radius);
        const color = utils.randomColor(colors);

        if( i !== 0) {
            for(let j = 0; j < particles.length; j++) {
                if(utils.getDistance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
                    x = utils.randomIntFromRange(radius, canvas.width - radius);
                    y = utils.randomIntFromRange(radius, canvas.height - radius);

                    j = -1;
                }  
            }
        }
        particles.push(new Particles(x, y, radius, color))
    }

    console.log(particles);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
    particles.forEach(particle => {
     particle.update(particles); //passing on the particles
    });
}

init()
animate()
