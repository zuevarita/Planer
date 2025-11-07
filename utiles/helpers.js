import { render } from "../script.js";
import { toDoList } from "../script.js";

const dayDisplay = document.querySelector("[data-display-day]");

const monthNamesGenitive = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

export const deleteElements = (container) => {
  while (container.children.length > 1) {
    container.removeChild(container.lastElementChild);
  }
};

export const addListener = () => {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      days.forEach((d) => {
        if (d.classList.contains("active")) d.classList.remove("active");
      });
      e.target.classList.add("active");
      displayDay();
      render();
    });
  });
};

export const displayDay = () => {
  const day = activeDate();
  if (day.classList.contains("today")) {
    dayDisplay.textContent = "Сегодня";
  } else {
    dayDisplay.textContent = formatedDisplayDay(day.dataset.date);
  }
};

export const activeDate = () => {
  let day =
    document.querySelector(".active") || document.querySelector(".today");

  if (!day) {
    day = document.querySelector(".day:not(.prevDay)");
    day.classList.add("active");
  }
  return day;
};

const formatedDisplayDay = (date) => {
  const arrayDate = date.split(".");
  return `${arrayDate[0]} ${monthNamesGenitive[arrayDate[1]]}`;
};

export const addEvents = () => {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    const hasTask = toDoList.some((todo) => {
      if(todo.type === "day"){
        todo.date === day.dataset.date;
      }
    });
    if (hasTask) {
      day.classList.add("event");
    } else if (!hasTask && day.classList.contains("event")) {
      day.classList.remove("event");
    }
  });
};
