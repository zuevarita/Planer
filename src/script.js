import { initCalendar } from "./utiles/calendar.js";
import {
  localStorageSetItems,
  localStorageGetItems,
} from "./utiles/localStorage.js";
import sticker from './icons/sticker.svg';
import {
  deleteElements,
  activeDate,
  displayDay,
  addEvents,
} from "./utiles/helpers.js";

const template = document.querySelector(".template-todo");
const toDoDayContainer = document.querySelector(".day-tasks-container");
const toDoWeekContainer = document.querySelector(".week-tasks-container");
const noteContainer = document.querySelector(".note-lines");
const statistkRing = document.querySelector(".progress-ring");
const statistkValue = document.querySelector(".progress-value");

export let toDoList = localStorageGetItems("toDoDayList") || [];

export const render = () => {
  deleteElements(toDoDayContainer);
  deleteElements(toDoWeekContainer);

  const active = activeDate();
  const currentDate = parseDate(active.dataset.date);
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(
    currentDate.getDate() -
      (currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1)
  );
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  toDoList.forEach((todo) => {
    const element = template.content.cloneNode(true);
    const wrapper = element.querySelector(".todo");
    const toDo = element.querySelector(".todo-task");
    const checkbox = element.querySelector(".todo-complited");

    toDo.textContent = todo.text;

    checkbox.addEventListener("change", (e) => {
      toDoList.forEach(t => {
        if (todo.id === t.id){
          todo.complited = e.target.checked;
        }
      })
      localStorageSetItems(toDoList);
      render();
    });
    checkbox.checked = todo.complited;

    toDo.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.classList.add("todo-task", "todo-input");
      input.value = toDo.textContent;

      toDo.replaceWith(input);
      input.focus();

      input.addEventListener("blur", (e) => {
        if (!e.target.value.trim()) {
          wrapper.remove();
          toDoList = toDoList.filter((t) => {
            if (t.id !== todo.id) return t;
          });
          localStorageSetItems(toDoList);
        } else {
          toDoList = toDoList.map((t) => {
            if (t.id === todo.id) {
              t.text = input.value;
            }
            return t;
          });
          localStorageSetItems(toDoList);
          input.replaceWith(toDo);
          toDo.textContent = input.value;
        }
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          input.blur();
        }
      });
    });

    if (todo.type === "day" && todo.date === active.dataset.date) {
      toDoDayContainer.append(element);
    } else if (todo.type === "week") {
      const toDoDate = parseDate(todo.date);
      if (toDoDate >= startOfWeek && toDoDate <= endOfWeek) {
        toDoWeekContainer.append(element);
      }
    } else if (todo.type === "note") {
      noteContainer.value = todo.text;
    }
  });
  displayDay();
  addEvents();
  staticUpdate();
};

const staticUpdate = ()=>{
  const tasks = Array.from(toDoDayContainer.querySelectorAll(".todo:not(.add-todo)"))

  const compitedTask = tasks.filter(t =>{
    const checkbox = t.querySelector(".todo-complited");
    return checkbox && checkbox.checked;
  }).length;

  const totalTask = tasks.length;
  const percentage = totalTask? (compitedTask / totalTask) * 100 : 0;

  statistkRing.style.background = `conic-gradient(#2a7886 0% ${percentage}%, #ffffff ${percentage}% 100%)`;

  statistkValue.textContent = `${compitedTask}/${totalTask}`;

}

const parseDate = (str) => {
  const [day, month, year] = str.split(".").map(Number);
  return new Date(year, month, day);
};

initCalendar();

const weekCat = document.querySelector('.week-cat');
weekCat.src = sticker;
