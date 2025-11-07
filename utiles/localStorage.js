
const TODOLIST = "toDo";

export const localStorageGetItems = ()=>{
    return JSON.parse(localStorage.getItem(TODOLIST));
}
export const localStorageSetItems = (item)=>{
    item.sort((a,b)=>a.complited-b.complited);
    localStorage.setItem(TODOLIST, JSON.stringify(item));
}