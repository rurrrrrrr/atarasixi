let x = 0 ;

let blackBall;
let whiteBalls = [];

function setup() {
    createCanvas(500, 500);
    blackBall = { x: 30, y: height - 30, r: 200 }; // r = diameter for circle()
}

function draw() {
    background(98,251,98,50);

   

    // draw black ball at bottom-left (with white stroke so it's visible on dark bg)
    fill("#8a2be2");
    stroke(0);
    strokeWeight(2);
    circle(blackBall.x, blackBall.y, blackBall.r);
    noStroke();


    // update and draw white balls
    for (let i = whiteBalls.length - 1; i >= 0; i--) {
        let b = whiteBalls[i];
        b.x += b.vx;
        b.y += b.vy;
        fill("#ffff00");
        noStroke();
        circle(b.x, b.y, b.r);
        // remove if off screen
        if (b.x < -b.r || b.x > width + b.r || b.y < -b.r || b.y > height + b.r) {
            whiteBalls.splice(i, 1);
            
        }
    }
}

function spawnWhiteBall(targetX, targetY) {
    // default to current mouse/touch position when not provided
    if (targetX === undefined) targetX = mouseX;
    if (targetY === undefined) targetY = mouseY;

    // compute vector from black ball to target
    let dx = targetX - blackBall.x;
    let dy = targetY - blackBall.y;
    let mag = sqrt(dx * dx + dy * dy);
    if (mag === 0) {
        dx = 1;
        dy = 0;
        mag = 1;
    }

    let speed = (3, 9);
    let vx = (dx / mag) * speed;
    let vy = (dy / mag) * speed;

    // start from the edge of the purple ball in the direction of the target
    let startX = blackBall.x + (dx / mag) * (blackBall.r / 2 + 10);
    let startY = blackBall.y + (dy / mag) * (blackBall.r / 2 + 10);

    whiteBalls.push({
        x: startX,
        y: startY,
        vx: vx,
        vy: vy,
        r: 20
    });
}

function mousePressed() {
    if (dist(mouseX, mouseY, blackBall.x, blackBall.y) <= blackBall.r / 2) {
        spawnWhiteBall(mouseX, mouseY);
    }
}

function touchStarted() {
    if (dist(mouseX, mouseY, blackBall.x, blackBall.y) <= blackBall.r / 2) {
        spawnWhiteBall(mouseX, mouseY);
    }
    return false;
}

