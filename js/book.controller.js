'use strict';

onInit();
function onInit() {
  renderBooks();
}

function renderBooks() {
  const books = gBooks;
  const strHTML = books.map(function (book) {
    return `<tr>
    <td>${book.id}</td>
    <td>${book.title}</td>
    <td>${book.price}</td>
    <td><button onclick="onRead('${book.id}')">Read</button></td>
    <td><button onclick="onUpdate('${book.id}')" class="editbtn">Update</button></td>
    <td><button onclick="onRemoveBook('${book.id}')" class="editbtn">Delete</button></td>
    </tr>`;
  });
  document.querySelector('tbody').innerHTML = strHTML.join('');
}

function onRemoveBook(carId) {
  deleteBook(carId);
  renderBooks();
}

function openModal(content, title) {
  var elModal = document.querySelector('.modal');
  elModal.style.display = 'block';

  var elContent = elModal.querySelector('.modal-content');
  elContent.innerHTML = content;
  var elH2 = elModal.querySelector('h2');
  elH2.innerHTML = title;
}

closeModal();
//closing the modal when click anywhere on the screen
function closeModal() {
  var elModal = document.querySelector('.modal');
  elModal.style.display = 'none';
}

function onAddBook() {
  const elAddBtn = document.querySelector('.add-form');
  elAddBtn.style.display = 'block';
}

function closeForm() {
  const elAddBtn = document.querySelector('.add-form');
  elAddBtn.style.display = 'none';
}

function onSubmitAdd() {
  const name = document.querySelector('input[name=name]').value;
  const price = document.querySelector('input[name=price]').value;
  const elInput = document.querySelectorAll('input');
  elInput[0].value = '';
  elInput[1].value = '';

  gBooks.push(_createBook(`${name}`, `${price}$`));
  const elAddBtn = document.querySelector('.add-form');
  elAddBtn.style.display = 'none';
  renderBooks();
  _saveBooksToStorage();
}
