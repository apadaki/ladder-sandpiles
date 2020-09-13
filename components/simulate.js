import ladder from './ladder.js';

export default function simulate(initial) {
    let canvas = document.getElementById("screen");
    let ctx = canvas.getContext("2d");

    const SCREEN_WIDTH = 800;
    const SCREEN_HEIGHT = 500;
    const SCREEN_MARGIN_HOR = 50;
    const SCREEN_MARGIN_VERT = 25;

    if (document.getElementById("length").value === "blank") {
        alert("Please enter a value for the length of the ladder graph!")
        return;
    }
    if (!document.getElementById("pvalue").value || !(0 <= document.getElementById("pvalue").value && document.getElementById("pvalue").value <= 1)) {
        alert("Please enter a decimal value for p (between 0 and 1)!")
        return;
    }


    let N = parseInt(document.getElementById("length").value);
    let pValue = parseFloat(document.getElementById("pvalue").value);
    let ladderGraph;
    
    sim();
    if (!initial) {
        document.getElementById("simulate").disabled = true;
        solve();

    }


    function sim() {
        ladderGraph = new ladder(N, pValue);

        console.log(ladderGraph.unstableIndexes.length);
        console.log(ladderGraph.adjDict);

        draw();
        document.getElementById("simulate").disabled = false;

        
    }
    
    function solve() {
        if (document.getElementById("stopSwitch").status=="on") return;
        

        let index = ladderGraph.update();
        draw(index);
        let loopInterval;
        switch (document.getElementById("speed").value) {
            case "slow": 
                loopInterval=1000;
                break;
            case "medium":
                loopInterval=300;
                break;
            case "fast": 
                loopInterval=50;
                break;
            case "instantaneous":
                loopInterval=5;
                break;
        }
        if (!ladderGraph.isStable()) setTimeout(solve, loopInterval);
        else document.getElementById("simulate").disabled = false;

    }

    function draw(latestIndex) {
        console.log(latestIndex);
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

            ctx.font = "24px Consolas";
            ctx.fillStyle = "rgb(0,255,128)";
            if (latestIndex === i) {
                ctx.fillStyle = "rgb(255,0,100)";
                ctx.fillText(ladderGraph.grains[i], x-4, y1-10);
                ctx.fillStyle = "rgb(0,255,128)";
            }
            else ctx.fillText(ladderGraph.grains[i], x-4, y1-10);
            

            ctx.font = "24px Consolas";
            if (latestIndex === i+N) {
                ctx.fillStyle = "rgb(255,0,100)";
                ctx.fillText(ladderGraph.grains[i+N], x-4, y2+23);
                ctx.fillStyle = "rgb(0,255,128)";
            }
            else ctx.fillText(ladderGraph.grains[i+N], x-4, y2+23);

            ctx.fillStyle = "white";

            
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
}

