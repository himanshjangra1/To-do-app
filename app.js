let newBtn = document.querySelector("#new-btn");
let inputBox = document.querySelector("#input-box");
let list = document.querySelector("#list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.classList.add("delete-btn");

        li.appendChild(span);
        li.appendChild(delBtn);

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
});

list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const index = li.dataset.index;

    if (e.target.classList.contains("delete-btn")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
        return;
    }
});

list.addEventListener("dblclick", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const index = li.dataset.index;
    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    renderTasks();
});

inputBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        newBtn.click();
    }
});

renderTasks();