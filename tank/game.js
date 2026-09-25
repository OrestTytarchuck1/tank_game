const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let keys = {};
 
let player = {
    x: 400,
    y: 500,
    size: 40,
    speed: 2.5,
    hp: 3
};

// 





let enemies = [];
let bullets = [];

// Keyboard
document.addEventListener("keydown", e => {
    keys[e.key] = true;

    if(e.key === " ") {asdfasdf
        shoot();
    }
});


document.addEventListener("keyup", e => {
    keys[e.key] = false;
});

function shoot(){

    bullets.push({
        x: player.x + 18,
        y: player.y,
        speed: 8,
        owner:"player"
    });

}


// Enemy spawn every 3 seconds
setInterval(()=>{
let count = Math.floor(Math.random()*2)+2;

    for(let i=0;i<count;i++){

        enemies.push({

            x: Math.random()*760,
            y:50,
            size:40,
            hp:1,
            speed:2

        });

    }

},3000);



// Enemy shooting
setInterval(()=>{

    enemies.forEach(enemy=>{

        bullets.push({

            x:enemy.x+18,
            y:enemy.y+40,
            speed:4,
            owner:"enemy"

        });

    });


},1500);



function update(){


    // player movement

    if(keys["ArrowUp"])
        player.y-=player.speed;

    if(keys["ArrowDown"])
        player.y+=player.speed;

    if(keys["ArrowLeft"])
        player.x-=player.speed;

    if(keys["ArrowRight"])
        player.x+=player.speed;



    // bullets

    bullets.forEach(b=>{

        if(b.owner==="player")
            b.y-=b.speed;
        else
            b.y+=b.speed;


    });



    // Enemy movement

    enemies.forEach(e=>{
        e.y += e.speed;
    });



    collision();


}



function collision(){


    bullets.forEach((b,bi)=>{


        // player bullet hits enemy

        if(b.owner==="player"){

            enemies.forEach((e,ei)=>{


                if(hit(b,e)){

                    enemies.splice(ei,1);
                    bullets.splice(bi,1);

                }


            });

        }



        // enemy bullet hits player

        if(b.owner==="enemy"){


            if(hit(b,player)){


                player.hp--;

                bullets.splice(bi,1);

                updateHealth();


                if(player.hp<=0){

                    alert("GAME OVER");
                    location.reload();

                }

            }

        }


    });


}



function hit(a,b){

    return (
        a.x < b.x+b.size &&
        a.x+10 > b.x &&
        a.y < b.y+b.size &&
        a.y+10 > b.y
    );

}



function draw(){


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // player

    ctx.fillStyle="green";

    ctx.fillRect(
        player.x,
        player.y,
        player.size,
        player.size
    );



    // enemies

    ctx.fillStyle="red";

    enemies.forEach(e=>{

        ctx.fillRect(
            e.x,
            e.y,
            e.size,
            e.size
        );

    });



    // bullets

    ctx.fillStyle="yellow";

    bullets.forEach(b=>{

        ctx.fillRect(
            b.x,
            b.y,
            8,
            12
        );

    });


}



function updateHealth(){

    let h="";

    for(let i=0;i<player.hp;i++)
        h+="❤️";


    document.getElementById("health").innerHTML=h;

}



function gameLoop(){

    update();
    draw();

    requestAnimationFrame(gameLoop);

}


gameLoop(); 