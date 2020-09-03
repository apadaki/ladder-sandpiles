let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 500;
const SCREEN_MARGIN_HOR = 50;
const SCREEN_MARGIN_VERT = 25


let N = 30;

import ladder from './ladder.js';
let ladderGraph = new ladder(N, 0.333);

console.log(ladderGraph.unstableIndexes.length);
console.log(ladderGraph.adjDict);
draw();
function loop() {
    ladderGraph.update();
    draw();
    if (!ladderGraph.isStable()) setTimeout(loop, 5)
}
loop();

function draw() {
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    ctx.fillStyle = "#bbb";

    



    let edgeLength = Math.min(Math.floor((SCREEN_WIDTH-2*SCREEN_MARGIN_HOR) / (N-1)), SCREEN_HEIGHT-2*SCREEN_MARGIN_VERT);
    let x1 = Math.floor((SCREEN_WIDTH - (N-1)*edgeLength)/2)
    let y1 = Math.floor((SCREEN_HEIGHT-edgeLength)/2);
    let y2 = SCREEN_HEIGHT - y1;
    for (let i = 0; i < N; i++) {
        let x = x1 + i * edgeLength;

        ctx.font = "18px Consolas";
        ctx.fillText(ladderGraph.grains[i], x-4, y1-10);

        ctx.font = "18px Consolas";
        ctx.fillText(ladderGraph.grains[i+N], x-4, y2+20);

        
        ctx.beginPath();
        ctx.arc(x, y1, (N < 32) ? (N < 16) ? 3 : 2 : 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.arc(x, y2, (N < 32) ? (N < 16) ? 3 : 2 : 1, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x,y1);
        ctx.lineTo(x,y2);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + (N-1) * edgeLength, y1);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x1, y2);
    ctx.lineTo(x1 + (N-1) * edgeLength, y2);
ctx.stroke();

}


function sleep(millisecs) {
    return new Promise(resolve => setTimeout(resolve, millisecs));
}