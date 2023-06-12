window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const listEl = document.querySelector("#task");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const task = input.value;

    if (!task) {
      alert("Please fill out the task");
      return;
    }

    const response = await fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });

    if (response.ok) {
      const tasks = await response.json();
      renderTasks(tasks);
      input.value = "";
    } else {
      alert("Failed to add the task");
    }
  });

  async function getTasks() {
    const response = await fetch("/tasks");

    if (response.ok) {
      const tasks = await response.json();
      renderTasks(tasks);
    } else {
      alert("Failed to fetch tasks");
    }
  }

  async function deleteTask(taskId) {
    const response = await fetch(`/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const tasks = await response.json();
      renderTasks(tasks);
    } else {
      alert("Failed to delete the task");
    }
  }

  function renderTasks(tasks) {
    listEl.innerHTML = "";

    tasks.forEach((task, index) => {
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

      const taskDelete = document.createElement("button");
      taskDelete.classList.add("delete");
      taskDelete.innerHTML = "Delete";

      taskAction.appendChild(taskDelete);

      taskEl.appendChild(taskAction);

      listEl.appendChild(taskEl);

      taskDelete.addEventListener("click", () => {
        deleteTask(index);
      });
    });
  }

  // Initial fetch to get tasks
  getTasks();
});
