'use strict';

//Global variables
const STORAGE_KEY = 'bookDB';
var gBooks;

_createBooks();

//CREATE BOOKS
function _createBooks() {
  var books = loadFromStorage(STORAGE_KEY);
  if (!books || !books.length) {
    books = [];

    books.push(_createBook('Harry Potter', '10$', makeLorem(100)));
    books.push(_createBook('Lord of the Rings', '20$', makeLorem(100)));
    books.push(_createBook('Harlem Shuffle', '30$', makeLorem(100)));
  }

  gBooks = books;
  _saveBooksToStorage();
}

//Create a book object
function _createBook(title, price) {
  return {
    id: makeId(),
    title: title,
    price: price,
    description: makeLorem(20),
    rate: 0,
  };
}

//SAVE TO LOCAL STORAGE
function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks);
}

//READ BOOK + Modal
function onRead(bookId) {
  const bookIdx = gBooks.findIndex(function (book) {
    return bookId === book.id;
  });
  const book = gBooks[bookIdx];
  openModal(book.description, book.title);
}

//DELETE AND SAVE
function deleteBook(bookId) {
  const bookIdx = gBooks.findIndex(function (book) {
    return bookId === book.id;
  });
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();
  renderBooks();
}

//UPDATE AND SAVE
function onUpdate(bookId) {
  const newPrice = +prompt('Please enter the new Price');
  const bookIdx = gBooks.findIndex(function (book) {
    return bookId === book.id;
  });

  if (newPrice > 0) {
    gBooks[bookIdx].price = `${newPrice}$`;
    _saveBooksToStorage();
    renderBooks();
  } else {
    alert('Please enter a valid price!');
  }
}
