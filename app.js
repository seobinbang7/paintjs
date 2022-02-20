const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // context는 픽셀을 컨트롤
const colors = document.getElementsByClassName("jsColor");
                      // querySelector은 수 많은 div 중 맨 처음 하나의 div만 선택.
                      // getElementsByClassName과 같은 효과를 나타내려면 querySelectiorAll()을 사용.
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const fileName = document.getElementById("jsName");
const randomBtn = document.getElementById("jsRandom");
const resetBtn = document.getElementById("jsReset");

const INITAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// 브라우저 크기, 높이랑 캔버스는 다르다.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE; 

// 처음 캔버스 색상 white.
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITAL_COLOR; // 색상
ctx.lineWidth = 2.5; // 라인 넓이

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    if (!filling) {
        painting = true;
    }
}

function onMouseMove(event) {
    // console.log(event);
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath(); // path은 선이다. path 시작점은 마우스가 움직이는 곳.
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y); // path의 전 시점부터(클릭 전) 지금 위치까지 선을 만든다.
        ctx.stroke(); // 선 획긋는 건 stroke이다.
    }
}

function onResetClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRandomClick() {
    let color = Array.from(colors);
    const colorsCount = Math.floor(Math.random() * color.length);
    ctx.strokeStyle = color[colorsCount].style.backgroundColor;
}

function handleRangeChange(event) {
    // console.log(event) 하면 target에서 target.value 를 볼 수 있다.(step, range)    
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
                // 시작점 x, y  가로 세로 크기
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    // from의 기본 event 방지할 때도 쓰인다. 
    // 여기서는 우클릭 메뉴 미노출.
    event.preventDefault();
}

function handleSaveClick() {
    // canvasElement.toDataURL()은 기본적으로 png로 설정된 type parameter에 의해 지정된 포맷의 이미지 표현을 포함한 data url을 반환함.
    // toDataURL("image/jpeg");
    const image = canvas.toDataURL("image");
    const link = document.createElement("a");
    link.href = image; 
    link.download = fileName.value; // 다운로드에는 이름설정.
    link.click(); // 가짜 클릭
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    // contextmenu는 실행될 때 실행됨
    // 우클릭 방지.
    canvas.addEventListener("contextmenu", handleCM);
}

// obj로부터 array를 만든다.
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

if (randomBtn) {
    randomBtn.addEventListener("click", handleRandomClick);
}

if (resetBtn) {
    resetBtn.addEventListener("click", onResetClick);
}

