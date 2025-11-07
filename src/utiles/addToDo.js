import {localStorageSetItems } from "./localStorage.js";
import { activeDate } from "./helpers.js";
import { toDoList, render } from "../script.js";
const addDayTask = document.querySelector("[data-day-add-todo]");
const addWeekTask = document.querySelector("[ data-week-add-todo]");

const addTask = (addPlace, container, type) => {
  const toDoElement = document.createElement("div");
  toDoElement.classList.add("todo");
  toDoElement.innerHTML = `
    <div class="todo-circle add-circle"></div>
    <input type="text" class="todo-task todo-input" placeholder="Новое задание...">
    `;
  addPlace.classList.add("hide");
  container.prepend(toDoElement);

  const input = document.querySelector(".todo-input");
  input.focus();

  input.addEventListener("blur", (e) => {
    if (!e.target.value.trim()) {
      addPlace.classList.remove("hide");
      toDoElement.remove();
    } else {
      const toDo = {
        id: Date.now(),
        text: e.target.value.trim(),
        date: activeDate().dataset.date,
        type: type,
        complited: false,
      };
      toDoList.unshift(toDo);
      localStorageSetItems(toDoList);
      addPlace.classList.remove("hide");
      toDoElement.remove();
      render();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      input.blur();
    }
  });
};

addDayTask.addEventListener("click", () => {
  const toDoDayContainer = document.querySelector(".day-tasks-container");
  addTask(addDayTask, toDoDayContainer, "day");
});

addWeekTask.addEventListener("click", () => {
  const toDoWeekContainer = document.querySelector(".week-tasks-container");
  addTask(addWeekTask, toDoWeekContainer, "week");
});



