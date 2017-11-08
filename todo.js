const todoList = $l(".todo-list");



todoList.append(newli);

const todoButton = $l(".todo-submit-button");
todoButton.on("click", () => {
  const newTodo = $("input");
  todoList.append(newTodo);
});
