import { render } from "../script.js";
import { addListener} from "./helpers.js";

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const calDays = document.querySelector(".cal-days");

const today = new Date();
export let month = today.getMonth();
export let year = today.getFullYear();

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентярь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];


const initDay = (i, ...classes)=>{
  const day = document.createElement("div");
  day.textContent = i;
  day.classList.add("day", ...classes);


  if (classes.includes("prevDay")){
    day.dataset.date = `${i}.${month-1}.${year}`;
  }else if(classes.includes("nextDay")){
    day.dataset.date = `${i}.${month+1}.${year}`;
  }else{
    day.dataset.date = `${i}.${month}.${year}`;
  }


  return day;
}

const displayActiveMonth = ()=>{
  const activeMonth = document.querySelector(".cal-month");
  activeMonth.textContent = months[month];

}
export const initCalendar = ()=>{
  const firstMonthWeekDay = new Date(year, month, 1).getDay()=== 0? 7: new Date(year, month, 1).getDay();
  const lastMonthDate = new Date(year, month+1, 0).getDate();
  const lastMonthWeekDay = new Date(year, month+1, 0).getDay() === 0? 7: new Date(year, month+1, 0).getDay();
  const nextMonthDays = 7 - (lastMonthWeekDay);
  calDays.textContent = "";

  for (let i = 1; i < firstMonthWeekDay; i++){
    calDays.append(initDay(i,"prevDay"));
  }

  for (let i = 1; i < lastMonthDate+1; i++){
    if(i === today.getDate() && month === today.getMonth()&& year === today.getFullYear()) {
      calDays.append(initDay(i, "today"));
    }else{
      calDays.append(initDay(i));
    }
  }

  for (let i = 0; i < nextMonthDays; i++){
    calDays.append(initDay(i, "nextDay"));
  }

  displayActiveMonth();
  addListener();
  render();
}


export const nextMonth = ()=>{
  if (month + 1 === 12){
    month = 0;
    year++;
  }else{
    month+=1
  }

  initCalendar();
}

export const prevMonth = ()=>{
  if (month - 1 === -1){
    month = 11;
    year--;
  }else{
    month-=1
  }

  initCalendar();
}

prevBtn.addEventListener("click", () => {
  prevMonth();
});

nextBtn.addEventListener("click", () => {
  nextMonth();
});




