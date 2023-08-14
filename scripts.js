//Getting all required elements

const inputbox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container-id");
const pendingNum = document.querySelector(".pending-num");
const clearButton = document.querySelector(".clear-button");

//we will call this function while adding, deleting and checking-unchecking the task

function allTasks() {
  let tasks = document.querySelectorAll(".pending");

  //if tasks' length is 0 then pending num text content will be no, if not then pending num value will be task's length
  pendingNum.textContent = tasks.length === 0 ? "no" : tasks.length;

  let allLists = document.querySelectorAll(".list");
  if (allLists.length > 0) {
    listContainer.style.marginTop = "20px";
    clearButton.style.pointerEvents = "auto";
    return;
  }
  listContainer.style.marginTop = "0px";
  clearButton.style.pointerEvents = "none";
}
/* For Add Button */

 function addTask () {
    let inputVal = inputbox.value.trim();
    if(inputbox.value.trim() === '') {
        alert("You must write something.............!");
    }
    else{
        let liTag = ` <li class="list pending" onclick="handleStatus(this)">
        <span class="task">${inputVal}</span>
        <i class="uil uil-trash"></i>
      </li>`;
      listContainer.insertAdjacentHTML("beforeend", liTag); //inserting li tag inside the todolist div

      allTasks();
    }
    inputbox.value = ""; //removing value from input field
    saveData();
 }

 /* For Enter Key */
//add task while we put value in text area and press enter

 inputbox.addEventListener("keyup", (e) => {
  let inputVal= inputbox.value.trim();
  if (e.key === "Enter" && inputVal.length > 0) {
    let liTag = ` <li class="list pending" onclick="handleStatus(this)">
        <span class="task">${inputVal}</span>
        <i class="uil uil-trash"></i>
      </li>`;
      listContainer.insertAdjacentHTML("beforeend", liTag); //inserting li tag inside the todolist div
      inputbox.value = ""; //removing value from input field
      allTasks();
  }
  else if(inputbox.value.trim() === '') {
    alert("You must write something!");
  }
 });

 listContainer.addEventListener("click", function(e) {
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked-list");
    saveData();
    allTasks(); 
  }
  else if(e.target.tagName === "I"){
    e.target.parentElement.remove();
    saveData();
   allTasks(); 
  }
 }, false);


function saveData() {
  localStorage.setItem("data" , listContainer.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();


//deleting all the tasks while we click on the clear button.

clearButton.addEventListener("click", () => {
  listContainer.innerHTML = "";
  saveData();
  allTasks();
});