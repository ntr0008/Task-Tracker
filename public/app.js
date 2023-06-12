window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#task");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = input.value;

    if (!task) {
      alert("Please fill out the task");
      return;
    }

    const taskEl = document.createElement("div");
    taskEl.classList.add("task");

    const taskContentEl = document.createElement("div");
    taskContentEl.classList.add("content");

    taskEl.appendChild(taskContentEl);

    const taskInput = document.createElement("input");
    taskInput.classList.add("text");
    taskInput.type = "text";
    taskInput.value = task;
    taskInput.setAttribute("readonly", "readonly");

    taskContentEl.appendChild(taskInput);

    const taskAction = document.createElement("div");
    taskAction.classList.add("actions");

    const taskEdit = document.createElement("button");
    taskEdit.classList.add("edit");
    taskEdit.innerHTML = "Edit";

    const taskDelete = document.createElement("button");
    taskDelete.classList.add("delete");
    taskDelete.innerHTML = "Delete";

    taskAction.appendChild(taskEdit);
    taskAction.appendChild(taskDelete);

    taskEl.appendChild(taskAction);

    list_el.appendChild(taskEl);

    input.value = "";

    taskEdit.addEventListener("click", () => {
      if (taskEdit.innerText.toLowerCase() == "edit") {
        taskEdit.innerHTML = "save";
        taskInput.removeAttribute("readonly");
        taskInput.focuse();
      } else {
        taskInput.setAttribute("readonly", "readonly");
        taskEdit.innerText = "Edit";
      }
    });
    taskDelete.addEventListener("click", () => {
      list_el.removeChild(taskEl);
    });
  });
});
