const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",  // user local storage
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){   // 원래 디폴트 인자가 있음. 그게 data를 다른 곳으로 보내줌.
    event.preventDefault(); //enter 쳐도 넘어가지 않음.
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){   //she is
    form.classList.remove(SHOWING_CN);  //form 형식인 what is your name을 지워준다.
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello, ${text}!`;

}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser == null){
        askForName();
    } else {    //she is
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}
init();