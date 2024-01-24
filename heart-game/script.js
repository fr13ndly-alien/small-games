document.addEventListener('DOMContentLoaded', () => {
    const progressElement = document.getElementById('progress');
    const bodyElement = document.getElementsByTagName('body');

    const LOWER_SPEED = 1;
    const DEFAULT_TIME_INTERVAL = 500; // 0.5s
    const INIT_HEART_SIZE = 5;
    const INIT_TEXT_SIZE = 2;

    let isCompletetd = false;
    let isHoldingSpace = false;
    let isOver = false;
    let raiseSpeed = 5;
    let currentPercentage = 0;
    let interval;

    function setRaiseSpeed() {

        if (currentPercentage > 20 && currentPercentage < 60) {
            raiseSpeed = 3
        }

        if (currentPercentage > 80) {
            raiseSpeed = 2;
        }

        // to test the complete action
        // raiseSpeed = 25;
    }

    function startGame() {
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('keyup', handleKeyRelease);
    }

    function handleKeyPress(event) {
        if (event.key === ' ' && !isHoldingSpace) {
            if (!isOver) {
                isHoldingSpace = true;
                clearInterval(interval);
                interval = setInterval(raiseHeart, DEFAULT_TIME_INTERVAL);
            }
        }
    }

    function handleKeyRelease(event) {
        isHoldingSpace = false;
        if (event.key === ' ' && !isOver) {
            clearInterval(interval);
            interval = setInterval(lowerHeart, DEFAULT_TIME_INTERVAL);
        }
    }

    function raiseHeart() {
        setRaiseSpeed();
        if (currentPercentage < 100) {
            currentPercentage = Math.round(currentPercentage + raiseSpeed);
            updateHeart();
        } else {
            isOver = true;
            clearInterval(interval);
            doWin();
        }
    }

    function doWin() {
        // expand the heart and do exploit
        if (!isCompletetd) {
            isCompletetd = true;
            document.getElementById('heart').style.display = 'none';

            // init frame and first exploding
            startExploding();
            initParticles(config.particleNumber);
        }
    }

    function lowerHeart() {
        console.log('>> lower heart');
        if (currentPercentage > 0) {
            currentPercentage -= LOWER_SPEED;
            updateHeart();
        } else {
            clearInterval(interval);
            isOver = true;
        }
    }

    function updateHeart() {
        const percentage = Math.round(currentPercentage) + 'vh';
        updateProgress();
        if (currentPercentage > INIT_HEART_SIZE) {
            console.log('>> raising heart: ', percentage);
            const root = document.documentElement;
            root.style.setProperty('--heart-size', percentage);

            const roundedPercent = Math.round(currentPercentage);
            root.style.setProperty('--heart-height', roundedPercent + 'vh');
            root.style.setProperty('--heart-width', (roundedPercent * 1.3) + 'vh');
        }
    }

    function updateProgress() {
        const roundedPercent = Math.round(currentPercentage);
        const sizeInVh = roundedPercent / 10;
        progressElement.textContent = `${roundedPercent} %`;
        if (sizeInVh > INIT_TEXT_SIZE) {
            progressElement.style.setProperty('font-size', `${sizeInVh}vh`);
        } else {
            progressElement.style.setProperty('font-size', `2vh`);
        }
    }

    // Little Canvas things
    let canvas = document.querySelector("#canvas"),
        ctx = canvas.getContext('2d');

    // Set Canvas to be window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Configuration, Play with these
    var config = {
        particleNumber: 800,
        maxParticleSize: 10,
        maxSpeed: 40,
        colorVariation: 50
    };

    // Colors
    var colorPalette = {
        bg: { r: 239, g: 179, b: 59 },
        matter: [
            { r: 36, g: 18, b: 42 },
            { r: 221, g: 35, b: 99 },
            { r: 5, g: 138, b: 113 },
            { r: 200, g: 18, b: 18 }
        ]
    };

    // Some Variables hanging out
    var particles = [],
        centerX = canvas.width / 2,
        centerY = canvas.height / 2;

    // Draws the background for the canvas, because space
    function drawBg (ctx, color) {
        ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Particle Constructor
    var Particle = function (x, y) {
        // X Coordinate
        this.x = x || Math.round(Math.random() * canvas.width);
        // Y Coordinate
        this.y = y || Math.round(Math.random() * canvas.height);
        // Radius of the space dust
        this.r = Math.ceil(Math.random() * config.maxParticleSize);
        // Color of the rock, given some randomness
        this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)], true);
        // Speed of which the rock travels
        this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7);
        // Direction the Rock flies
        this.d = Math.round(Math.random() * 360);
    };

    // Provides some nice color variation
    // Accepts an rgba object
    // returns a modified rgba object or a rgba string if true is passed in for argument 2
    var colorVariation = function (color, returnString) {
        var r, g, b, a, variation;
        r = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation / 2)) + color.r);
        g = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation / 2)) + color.g);
        b = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation / 2)) + color.b);
        a = Math.random() + .5;
        if (returnString) {
            return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        } else {
            return { r, g, b, a };
        }
    };

    // Used to find the rocks next point in space, accounting for speed and direction
    var updateParticleModel = function (p) {
        var a = 180 - (p.d + 90); // find the 3rd angle
        p.d > 0 && p.d < 180 ? p.x += p.s * Math.sin(p.d) / Math.sin(p.s) : p.x -= p.s * Math.sin(p.d) / Math.sin(p.s);
        p.d > 90 && p.d < 270 ? p.y += p.s * Math.sin(a) / Math.sin(p.s) : p.y -= p.s * Math.sin(a) / Math.sin(p.s);
        return p;
    };

    // Just the function that physically draws the particles
    // Physically? sure why not, physically.
    function drawParticle (x, y, r, c) {
        ctx.beginPath();
        ctx.fillStyle = c;
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
    };

    // Remove particles that aren't on the canvas
    function cleanUpArray () {
        particles = particles.filter((p) => {
            return (p.x > -100 && p.y > -100);
        });
    };


    function initParticles (numParticles, x, y) {
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle(x, y));
        }
        particles.forEach((p) => {
            drawParticle(p.x, p.y, p.r, p.c);
        });
    };

    // That thing
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();


    // Our Frame function
    function startExploding () {
        // Draw background first
        drawBg(ctx, colorPalette.bg);
        // Update Particle models to new position
        particles.map((p) => {
            return updateParticleModel(p);
        });
        // Draw em'
        particles.forEach((p) => {
            drawParticle(p.x, p.y, p.r, p.c);
        });
        // Play the same song? Ok!
        window.requestAnimFrame(startExploding);
    };

    // Click listener
    document.body.addEventListener("click", function (event) {
        if (isOver) {
            var x = event.clientX,
            y = event.clientY;
            cleanUpArray();
            initParticles(config.particleNumber, x, y);
        }
    });

    startGame();
});
