//Make random char
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


const task1 = _("tasks1");
const task2 = _("tasks2");
const task3 = _("tasks3");
const pTask = _q(".pTask");
const oTask = _q(".oTask");
const cTask = _q(".cTask");
const tasks = document.querySelectorAll(".tasks");

const addButton = _("addButton");
const moveButton = _("moveButton");
const completeButton = _("completeButton");
const deleteButton = _("deleteButton");

function getDate() {
  return new Date();
}

//Toggle containers
task1.addEventListener("click", () => {
  removeActive(pTask);
});

task2.addEventListener("click", () => {
  removeActive(oTask);
});

task3.addEventListener("click", () => {
  removeActive(cTask);
});

function removeActive(Task) {
    tasks.forEach((task) => {
      task.classList.remove("active");
    });
    Task.classList.add("active");
}

let task = [];
let ongoing = [];
let completed = [];

addButton.addEventListener("click", () => {
  let myTask = document.getElementById("myText").value;
  let inputText = _("inputText");
  if (myTask != "") {
    inputText.appendChild(display(myTask));
    task.push(myTask);
    console.log(task);
    localStorage.setItem("todo-elements", JSON.stringify(task));
  }
  document.getElementById("myText").value = "";
});

moveButton.addEventListener("click", function (index) {
  const checkBox = document.querySelectorAll(".checkBox");
  checkBox.forEach((checkbox) => {
    if (checkbox.checked) {
      let parentText = checkbox.parentNode;
      let shit = task.splice(index, 1);
      localStorage.setItem("todo-elements", JSON.stringify(task));
      ongoing.push(shit);
      localStorage.setItem("todo-elements2", JSON.stringify(ongoing));
      let childText = parentText.children[1].children[0].textContent;
      let onGoingText = _("onGoingText");
      onGoingText.appendChild(display(childText));
      checkbox.parentNode.innerHTML = "";
    }
  });
});

completeButton.addEventListener("click", function (index) {
  const checkBox = document.querySelectorAll(".checkBox");
  checkBox.forEach((checkbox) => {
    if (checkbox.checked) {
      let parentText = checkbox.parentNode;
      let complete = ongoing.splice(index, 1);
      completed.push(complete);
      localStorage.setItem("todo-completed", JSON.stringify(completed));
      localStorage.setItem("todo-elements2", JSON.stringify(ongoing));
      let childText = parentText.children[1].children[0].textContent;
      let completedText = _("completedText");
      completedText.appendChild(display(childText));
      checkbox.parentNode.innerHTML = "";
    }
  });
});

deleteButton.addEventListener("click", function (index) {
  const checkBox = document.querySelectorAll(".checkBox");
  checkBox.forEach((checkbox) => {
    if (checkbox.checked) {
      localStorage.setItem("todo-completed", JSON.stringify(completed));
      checkbox.parentNode.innerHTML = "";
    }
  });
});

//On reload, fetch from local storage
window.addEventListener("load", (event) => {
  const localTask = JSON.parse(localStorage.getItem("todo-elements"));
  const localOngoing = JSON.parse(localStorage.getItem("todo-elements2"));
  const isCompleted = JSON.parse(localStorage.getItem("todo-completed"));
  if (localTask) {
    localTask.forEach((tasks) => {
      let inputText = _("inputText");
      inputText.appendChild(display(tasks));
    });
  }
  if (localOngoing) {
    localOngoing.forEach((taskOngoing) => {
      let onGoingText = _("onGoingText");
      onGoingText.appendChild(display(taskOngoing));
    });
  }
  if (isCompleted) {
    isCompleted.forEach((taskCompleted) => {
      let completedText = _("completedText");
      completedText.appendChild(display(taskCompleted));
    });
  }
});



function _(id) {
  return document.getElementById(id);
}
function _q(id) {
  return document.querySelector(id);
}

//Function for displaying task
function display(params) {
  let uid = makeid(4);
  let newInput = document.createElement("div");
  newInput.classList.add("newInput");
  newInput.innerHTML = `
        <input type="checkbox" class="checkBox" id="${uid}">
        <label for="${uid}"><span>${params}</span>
            <span>(added on:${getDate().toLocaleDateString()} time:${getDate().toLocaleTimeString()})</span>
        </label>
    `;
  return newInput;
}
