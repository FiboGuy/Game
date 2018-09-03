


var player1 = {
    x: 100,
    y: canvas.height/2,
    velY: 0,
    velX: 0,
    color: "blue"
},
player2 = {
    x: canvas.width-100,
    y: canvas.height/2,
    velY: 0,
    velX: 0,
    color: "red"
};

var x = 150,
    y = 150,
    velY = 0,
    velX = 0,
    speed = 2,
    friction = 0.98,
    keys = [];

    var top1=38;
    var down1=40;
    var right1=39;
    var left1=37;
    var top2=87;
    var down2=83;
    var right2=68;
    var left2=65;


function update() {

    if (keys[top1]) {
        player1.y-=1
    }

    if (keys[down1]) {
        player1.y+=1
    }
    if (keys[right1]) {
        player1.x+=1
    }
    if (keys[left1]) {
        player1.x-=1
    }

    if (keys[top2]) {
        player2.y-=1
    }

    if (keys[down2]) {
        player2.y+=1
    }
    if (keys[right2]) {
        player2.x+=1
    }
    if (keys[left2]) {
        player2.x-=1
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePlayer(player1);
    updatePlayer(player2);
    setTimeout(update, 10);
}

function updatePlayer(player) {
    
    if (player.x >= canvas.width-5) {
        player.x = canvas.width-5;
    } else if (player.x <= 5) {
        player.x = 5;
    }

    if (player.y > canvas.height-5) {
        player.y = canvas.height-5;
    } else if (player.y <= 5) {
        player.y = 5;
    }

    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, 5, 0, Math.PI * 2);
    ctx.fill();
}

update();

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
