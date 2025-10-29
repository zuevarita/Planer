import { initCalendar, nextMonth, prevMonth } from "./utiles/calendar.js";

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

initCalendar();

prevBtn.addEventListener("click", ()=>{
  prevMonth();
})

nextBtn.addEventListener("click", ()=>{
  nextMonth()
})