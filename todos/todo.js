




const todoButton = $l(".todo-submit-button");
todoButton.on("click", () => {
  const newTodo = $l("input");
  const userVal = newTodo.htmlElements[0].value;
  const newLi = $l("<li>");
  const todoList = $l(".todo-list");
  newLi.append(userVal);
  todoList.append(newLi);
});
