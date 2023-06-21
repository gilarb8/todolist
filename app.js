// Mendapatkan referensi elemen-elemen HTML
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Mendefinisikan array kosong untuk menyimpan daftar tugas
let todos = [];

// Fungsi untuk menambah tugas baru
function addTodo() {
  event.preventDefault();

  const todoText = todoInput.value.trim();

  if (todoText !== '') {
    const todoItem = {
      id: Date.now(),
      text: todoText
    };

    todos.push(todoItem);
    saveTodosToLocalStorage();
    renderTodos();

    todoInput.value = '';
  }
}

// Fungsi untuk menghapus tugas
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodosToLocalStorage();
  renderTodos();
}

// Fungsi untuk menyimpan tugas ke local storage
function saveTodosToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Fungsi untuk mengambil tugas dari local storage (jika ada)
function getTodosFromLocalStorage() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
  }
}

// Fungsi untuk merender daftar tugas ke dalam elemen ul
function renderTodos() {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${todo.text}</span>
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;
    todoList.appendChild(li);
  });
}

// Memuat daftar tugas dari local storage saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  getTodosFromLocalStorage();
  renderTodos();
});

// Menambahkan event listener untuk form submit
todoForm.addEventListener('submit', addTodo);