const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];   //deleteToDo함수에서 바꾸어주기 때문에 let으로


function deleteToDo(evnet){
    const btn = event.target;   //지울버튼.
    const li = btn.parentNode;  //지울 list. 그런데 parentNode를 하면 string으로 바뀜(filter함수에서 애먹는 부분)
    toDoList.removeChild(li);   //HTML에서 ul의 한 list를 지운다.

    //여기서는 로컬스토리지에서 지우고 저장하기
    const cleanToDos = toDos.filter(function(toDo){ //list지운거 빼고 저장(new arr생성)
        return toDo.id !== parseInt(li.id); //li.id가 string형식으로 변형되서 parseInt 함수를 통해 int형으로
    }); //new arr
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1; //숫자
    delBtn.innerText ="❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);   //toDoList는 ul(총알리스트)형식
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);    //const여도 list는 push 가능하구나
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;   //input의 value는 text.
    paintToDo(currentValue);
    toDoInput.value = "";
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){ //toDo는 toDoObj 형식의 오브젝트다.
            paintToDo(toDo.text);
        });

    } else{

    }
}

function init(){    //새로고침 누를 때 마다 작동!
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();