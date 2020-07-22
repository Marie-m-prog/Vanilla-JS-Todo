let state = JSON.parse(window.localStorage.getItem('state')) || [];

const form = document.querySelector('.input-form');
const todoList = document.querySelector('.todo-list');
const titleInput = document.querySelector('#title');
const dscrInput = document.querySelector('#description');

const createTemplate = (newState) => {
  if (newState[0]) {
    const template = newState.map((todo) => {
      const status = todo.status ? todo.status : null;
      return `
      <li class="todo ${status}"><h1>${todo.title}</h1>
      <p>${todo.description}</p>
      <button type="button" class="remove">Remove</button>
      </li>
      `;
    });
    return template;
  }
  return null;
};

const render = () => {
  todoList.innerHTML = createTemplate(state);
};

const update = (newState) => {
  state = state[0] ? [...state, { ...newState }] : [{ ...newState }];
  render();
};

const addToDo = (event) => {
  event.preventDefault();

  const newToDo = {
    title: titleInput.value,
    description: dscrInput.value,
  };

  titleInput.value = '';
  dscrInput.value = '';

  update(newToDo);
};

const removeToDo = (title) => {
  state = state.filter((todo) => todo.title !== title);
  render();
};

const toggleStatus = (title) => {
  state = state.map((todo) => {
    if (todo.title === title) {
      todo.status ? delete todo.status : todo.status = 'done';
    }
    return todo;
  });
  render();
};

const clickHandler = (event) => {
  const item = event.target;
  if (item.classList[0] === 'remove') {
    const title = item.parentElement.children[0].innerHTML;
    removeToDo(title);
  } else if (item.classList[0] === 'todo') {
    const title = item.children[0].innerHTML;
    toggleStatus(title);
  }
};

window.addEventListener('load', render);
form.addEventListener('submit', addToDo);
todoList.addEventListener('click', clickHandler);
