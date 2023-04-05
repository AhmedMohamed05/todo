let form = document.querySelector("form");
let addTask = document.querySelector(`[name="task"]`);
let submit = document.querySelector(`[type="submit"]`);
let tasks = document.querySelector(`.tasks`);
let topButton = document.querySelector(".top");
let tasksArr = [];

// Check Local Stroage
let data = window.localStorage.getItem("tasks");
if (data !== null) {
  tasksArr = JSON.parse(data);
  tasksArr.forEach((taskObj) => createTaskelement(taskObj));
}

form.onsubmit = (event) => {
  event.preventDefault();
  addTask.focus();
  if (addTask.value !== "") {
    getTaskData(addTask.value);

    // Make Input Field Empty
    addTask.value = "";
  } else {
    errorMsg("Can't Add Empty Task");
  }
};

// Get Task Data And Create Task Object
function getTaskData(value) {
  let taskObj = new taskObject(value, false, Date.now());
  createTaskelement(taskObj);
  pushTaskToArr(taskObj);
}

// Error Message Function
function errorMsg(errorMsg) {
  addTask.blur();
  // Create Div, P, P Text, Close Button And His Text
  let div = document.createElement("div");
  let p = document.createElement("p");
  let button = document.createElement("button");
  button.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

  // Add class To The Div
  div.setAttribute("class", "cant-add-task");

  // p Content
  p.innerHTML = errorMsg;

  // Append P  To Div
  div.appendChild(p);

  // Append Button To Div
  div.appendChild(button);

  // Append div To Body
  document.body.appendChild(div);

  button.onclick = () => {
    div.remove();
    addTask.focus();
  };

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      div.remove();
      addTask.focus();
    }
  });
}

// Task Class
class taskObject {
  constructor(taskVale, taskStat, id) {
    this.name = taskVale;
    this.state = taskStat;
    this.id = id;
  }
}

// Remove Task From TasksArr And Update Local Storage
function removeTaskFromArr(taskId) {
  tasksArr = tasksArr.filter((task) => task.id != taskId);
  setTasksInLocaleStorage();
}

// Create Task Elemen And buttons Functions
function createTaskelement(taskObject) {
  let task = document.createElement("div");
  // Add Task Classes
  task.classList.add("task");
  if (taskObject.state === true) {
    task.classList.add("done");
  }
  // Create custm Id To Select Task By It
  task.setAttribute("data-id", taskObject.id);

  // Creae Task Paragraph And Text
  let p = document.createElement("p");
  p.innerHTML = taskObject.name;
  // TODO user can change content

  // Creae Buttons Div And Add The Class
  let buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");

  // Create Buttons And Add The Classes And i
  var doneButton = document.createElement("button");
  var delbutton = document.createElement("button");

  // Add i Tag
  doneButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
  delbutton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

  // Add Classes
  doneButton.classList.add("done");
  delbutton.classList.add("delete");

  // Add Custim Att
  doneButton.setAttribute("button-content", "Done");
  delbutton.setAttribute("button-content", "Delete");

  // Buttons Functions

  doneButton.addEventListener("click", () => {
    task.classList.toggle("done");
    if (task.classList.contains("done")) {
      doneButton.innerHTML = `<i class="fa-solid fa-check-double"></i>`;
      taskObject.state = true;
    } else {
      doneButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
      taskObject.state = false;
    }
    setTasksInLocaleStorage();
  });

  delbutton.onclick = () => {
    removeTaskFromArr(taskObject.id);
    task.remove();
    setTasksInLocaleStorage();
  };

  // Append Buttons To Buttons Div
  buttonsDiv.appendChild(delbutton);
  buttonsDiv.appendChild(doneButton);

  // Append Elements To Task Div
  task.appendChild(p);
  task.appendChild(buttonsDiv);

  // Append Task Div To Tasks Container
  tasks.appendChild(task);

  if (task.classList.contains("done")) {
    doneButton.innerHTML = `<i class="fa-solid fa-check-double"></i>`;
  }
}

// push Task To TasksArr And To Local Storage
function pushTaskToArr(taskObj) {
  tasksArr.push(taskObj);
  setTasksInLocaleStorage();
}

function setTasksInLocaleStorage() {
  // Change Task Objct To JSON And Add It To Local Storage
  if (tasksArr.length !== 0) {
    // Check if tasks Arr Not Empty
    window.localStorage.setItem("tasks", JSON.stringify(tasksArr));
  } else {
    // Remove Tasks From Local Storage
    window.localStorage.removeItem("tasks");
  }
}
// Back to top Button
window.onscroll = () => {
  if (window.scrollY > 250) {
    topButton.classList.add("active");
  } else {
    topButton.classList.remove("active");
  }
};

// Them
// Select icons Box And Icons
let iconBox = document.querySelector(".them");
let icons = document.querySelectorAll(".them i");
// Check Local Storage
let them = window.localStorage.getItem("them");
if (them) {
  changethem(them);
  icons.forEach((i) => i.classList.remove("active"));
  document.querySelector(`[data-them=${them}]`).classList.add("active");
}

iconBox.onclick = () => {
  icons.forEach((icon) => {
    icon.classList.toggle("active");
  });
  setThemInLocal(
    document.querySelector(".them .active").getAttribute("data-them")
  );
};
// Set Them In Local Storage
function setThemInLocal(them) {
  window.localStorage.setItem("them", them);
  changethem(window.localStorage.getItem("them"));
}
// Change App Them
function changethem(them) {
  if (them === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

// TODO popup menu
// let task = document.querySelectorAll(".task");

// task.forEach((task) => {
//   task.oncontextmenu = (event) => {
//     event.preventDefault();
//     let px = event.clientX;
//     let py = event.clientY;

//     let menu = document.createElement("div");

//     menu.classList.add("pop-up");
//     menu.style.setProperty("left", px + "px");
//     menu.style.setProperty("top", py + "px");
//     document.body.appendChild(menu);
//   };
// });
