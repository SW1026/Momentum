const body = document.querySelector("body");

const IMG_NUMBER = 4;

function paintImage(imgNumber){
    const image = new Image();  //img 오브젝트 생성
    image.src = `images/${imgNumber +1}.jpg`;
    image.classList.add('bgImage');
    body.prepend(image);

}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();