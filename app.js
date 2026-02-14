let newBtn = document.querySelector("#new-btn");
let inputBox = document.querySelector("#input-box");
let list = document.querySelector("#list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // creating a STATE array. This loads saved tasks if they exists.

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
} // this function saves the tasks to localstorage.

function renderTasks() {
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.dataset.index = index;
        list.appendChild(li);
    });
}


newBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    const value = inputBox.value.trim();

    if (value === "") {
        alert("Enter some task first!");
        return;
    }
    
    tasks.push({
        text: value,
        completed: false
    });

    inputBox.value = "";
    saveTasks();
    renderTasks();
})

list.addEventListener("dblclick", (e) => {
     if (e.target.tagName === "LI") {
        const index = e.target.dataset.index;
        tasks[index].completed = !tasks[index].completed;

        saveTasks();
        renderTasks();
    }
});

inputBox.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        newBtn.click();
    }
})

renderTasks();