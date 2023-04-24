// Import Statements
import { Book } from "./model.js"

// Global Variables
const book_lists = [];
const listOfBooks = document.querySelector('.books-list')

// Functions
function fetchBooksList() {
  console.log("Fetching from backend");
  return new Promise((resolve, reject) => {
    fetch('/get-books')
      .then(response => response.json())
      .then(data => {
        for (const book of data) {
          console.log(book.book_name);
          let newBook = new Book(book.book_name);
          book_lists.push(newBook);
        }
        console.log(book_lists)
        resolve(data);
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      });
  });
}

function createBookInstance(bookName) {
  return new Promise((resolve, reject) => {
    fetch('/create-book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'book_name': bookName
      })
    })
      .then(response => response.json())
      .then(data => {
        resolve(data);
        console.log("Saved in db", data)
      })
      .catch(error => {
        reject(error);
      });
  });
}

function addBook() {
  const bookNameTextField = document.querySelector('.book-input-form');
  const bookName = bookNameTextField.value;
  const newListElement = document.createElement("li");
  newListElement.textContent = bookName
  console.log(newListElement);
  listOfBooks.append(newListElement);
  createBookInstance(bookName);
}

function populateUI(book_lists) {
  for (const book of book_lists) {
    const newListElement = document.createElement("li");
    newListElement.textContent = book.book_name
    listOfBooks.append(newListElement)
  }
}

// Initialization Code
setTimeout(fetchBooksList, 1);
setTimeout(() => populateUI(book_lists), 5000);

// Event Listeners
const addBtn = document.querySelector('.add-book');
addBtn.addEventListener('click', addBook);
