let newBtn = document.querySelector("#new-btn");
let inputBox = document.querySelector("#input-box");
let list = document.querySelector("#list");

newBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    const value = inputBox.value.trim();

    if (value === "") {
        alert("Enter some task first!");
        return;
    }
    
    const li = document.createElement('li');
    li.textContent = value;

    list.appendChild(li);
    inputBox.value = "";
})

list.addEventListener("dblclick", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("completed");
    }
})

inputBox.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        newBtn.click(newBtn);
    }
})