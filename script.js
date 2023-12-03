const myLibrary = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
const title_input = document.getElementById('title');
const author_input = document.getElementById('author');
const pages_input = document.getElementById('pages');
const status_input = document.getElementsByName('status');
const pageNum_input = document.getElementById('page-number');
const reading_input = document.getElementById('reading');
const form = document.querySelector('form');
const tbody = document.querySelector('tbody');
let read_status = '';

window.onload = (e) => displayLibrary(myLibrary);

reading_input.addEventListener('click', () => {
  if (reading_input.checked) pageNum_input.setAttribute('required', '');
});

form.addEventListener('submit', addBookToLibrary);

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(e) {
  e.preventDefault();
  const newBook = new Book(title_input.value, author_input.value, pages_input.value, getStatus());  
  if (!isInLibrary(newBook)) {
    myLibrary.push(newBook);
    localStorage.setItem('books', JSON.stringify(myLibrary));
    displayBook(newBook);
    form.reset();
    pageNum_input.removeAttribute('required');
  } else {
    alert('This book is already in your library.');
  }
}

function displayBook(book) {
  const row = tbody.insertRow();
  const title_cell = row.insertCell(0);
  const author_cell = row.insertCell(1);
  const pages_cell = row.insertCell(2);
  const status_cell = row.insertCell(3);
  const action_cell = row.insertCell(4);
  title_cell.innerHTML = book.title;
  author_cell.innerHTML = book.author;
  pages_cell.innerHTML = book.pages;
  status_cell.innerHTML = book.status;

  const index = myLibrary.indexOf(book);
  action_cell.innerHTML = `<button id='edit' data-index='${index}'>Edit</button><button id='remove' data-index='${index}'>Remove</button>`;
  activateActionButtons(book, index);
}

function activateActionButtons(book, index) {
  const edit_btn = document.querySelector(`#edit[data-index='${index}']`);
  const remove_btn = document.querySelector(`#remove[data-index='${index}']`);
  edit_btn.addEventListener('click', editBook);
  remove_btn.addEventListener('click', removeBook);
}

function displayLibrary(library) {
  library.forEach(book => displayBook(book));
}

function isInLibrary(newBook) {
  for (const book of myLibrary) {
    if (book.title.toLowerCase() === newBook.title.toLowerCase()) return true;
  }
  return false;
}

function getStatus() {
  for (let i = 0; i < status_input.length; i++) {
    if (status_input[i].checked) {
      read_status = status_input[i].labels[0].innerText;
      if (i === 1) read_status += pageNum_input.value;
    }
  }
  return read_status;
}

function editBook(e) {
  // update library
  localStorage.setItem('books', JSON.stringify(myLibrary));
  tbody.innerHTML = '';
  displayLibrary(myLibrary);
}

function removeBook(e) {
  myLibrary.splice(e.target.dataset.index, 1);
  localStorage.setItem('books', JSON.stringify(myLibrary));
  tbody.innerHTML = '';
  displayLibrary(myLibrary);
}

