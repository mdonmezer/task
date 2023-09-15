const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos = [];

// JSON dosyası adı
const JSON_FILE_NAME = "/todos.json";

eventListeners();

function eventListeners() {
    // Not Kaydet
    form.addEventListener("submit", addNewItem);
    // Not Sil
    taskList.addEventListener("click", deleteItem);
    // Hepsini Sil
    btnDeleteAll.addEventListener("click", deleteAllItems);

    // Sayfa yüklendiğinde JSON'dan verileri al
    document.addEventListener("DOMContentLoaded", loadItemsFromJSON);
}

function loadItemsFromJSON() {
    fetch(JSON_FILE_NAME)
        .then((response) => response.json())
        .then((data) => {
            todos = data;
            todos.forEach(function (item) {
                createItem(item);
            });
        })
        .catch((error) => console.error("Verileri alırken hata oluştu: ", error));
}

function createItem(newTodo) {
    // li oluşturma
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(newTodo));

    // a oluşturma
    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);
    taskList.appendChild(li);
}

function addNewItem(e) {
    if (input.value === "") {
        alert("Lütfen Not Girin!");
    } else {
        // Not Oluşturma
        const newTodo = input.value;
        createItem(newTodo);
        todos.push(newTodo);

        // JSON dosyasına verileri kaydet
        saveItemsToJSON();

        input.value = "";
    }

    e.preventDefault();
}

function deleteItem(e) {
    if (e.target.className === "fas fa-times") {
        if (confirm("Silmek istediğinize emin misiniz?")) {
            const deletedTodoText = e.target.parentElement.parentElement.textContent;
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(deletedTodoText);
        }
    }
    e.preventDefault();
}

function deleteTodoFromStorage(deletedTodo) {
    todos = todos.filter((todo) => todo !== deletedTodo);
    saveItemsToJSON();
}

function saveItemsToJSON() {
    fetch(JSON_FILE_NAME, {
        method: "PUT",
        body: JSON.stringify(todos),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(() => console.log("Veriler JSON dosyasına kaydedildi"))
        .catch((error) => console.error("Verileri kaydederken hata oluştu: ", error));
}

function deleteAllItems(e) {
    if (confirm("Tüm elemanları silmek istediğinize emin misiniz?")) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        todos = [];
        saveItemsToJSON();
    }
}
