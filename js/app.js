// CODE EXPLAINED channel

// select the  Elements

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");


 // Classes names

 const  CHECK = "fa-check-circle";
 const  UNCHECK = "fa-circle-thin";
 const  LINE_THROUGH  = "lineThrough";


 // variables

let LIST  ,id 
// get data from localstorege 

let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
LIST = JSON.parse(data);
    // loadToDo(LIST)
id = LIST.length; // set the id to the last one in list 
console.log(id)
loadToDo(LIST); // load the list to the user interface    
}else{
// if data is empty 

LIST = [];
id = 0;
}

function loadToDo(array){
array.forEach(element => {
    addToDo(element.name,element.id,element.done,element.trash);
});

}

// clear the  localstorage
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
})
// Show todays Date
const options = {weekday:"long",month:"short",day:"numeric"};
const today = new Date;
dateElement.innerHTML = today.toLocaleDateString("en-US", options);



// add do do function 

 function addToDo(todo,id,done,trash){
if(trash){return;} 
const Done = done ? CHECK : UNCHECK
const Line = done ?LINE_THROUGH: "";          
const item = ` <li class ="item">
                <i class="fa ${Done} co" job="complete" id="${id}"></i>
                <p class="text ${Line}">${todo}</p>
                 <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
                  </li>
                 `;
                  
const position = "beforeend"

list.insertAdjacentHTML(position,item);

}

// add an item to the list when user hits the enter Key

document.addEventListener("keyup",function(event){
 if(event.keyCode ==13){
const toDo = input.value;
// if todo is not empty 

   if(toDo){

addToDo(toDo,id,false,false);
LIST.push({
    name:toDo,
    id:id,
    done : false,
    trash : false
})

// add items to localstorage (this code must be added  where the ist array  is updated)
localStorage.setItem("TODO",JSON.stringify(LIST));
id++;
}
input.value = "";
 }
                       
});

// complete to do 

function completeToDo(element){
element.classList.toggle(CHECK);
element.classList.toggle(UNCHECK);
element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

LIST[element.id].done = LIST[element.id].done ? false :true;

}

// remove to do 

function remove(element){
element.parentNode.parentNode.removeChild(element.parentNode);
 
 LIST[element.id].trash = true;
}

// target the element dynamically

list.addEventListener("click",function(event){

const element = event.target; //  
const elementjob = element.attributes.job.value;  

if(elementjob == "complete"){
    completeToDo(element);
}
else if (elementjob == "delete"){
    remove(element);
}
// add items to localstorage (this code must be added  where the ist array  is updated)
localStorage.setItem("TODO",JSON.stringify(LIST));
})



