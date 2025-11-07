import { localStorageSetItems } from "./localStorage.js";
import { toDoList } from "../script.js";

const note = document.querySelector(".note-lines");

note.addEventListener("blur", (e) => {
  const existingNote = toDoList.find((item) => item.type === "note");
  if (existingNote) {
    existingNote.text = e.target.value;
  } else {
    const noteArea = {
      type: "note",
      text: e.target.value,
    };
    toDoList.push(noteArea);
  }
  localStorageSetItems(toDoList);
});
