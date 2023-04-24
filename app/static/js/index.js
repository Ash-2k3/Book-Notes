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

async function populateUI() {
  await fetchBooksList()
  for (const book of book_lists) {
         const card = document.createElement("div");
         card.classList.add("card", "mb-3");
 
         const row = document.createElement("div");
         row.classList.add("row", "g-0");
 
         const colImg = document.createElement("div");
         colImg.classList.add("col-md-4");
 
         const img = document.createElement("img");
         img.classList.add("img-fluid", "rounded-start");
         // img.setAttribute("src", book.image_url);
         // img.setAttribute("alt", book.title);
 
         const colBody = document.createElement("div");
         colBody.classList.add("col-md-8");
 
         const cardBody = document.createElement("div");
         cardBody.classList.add("card-body");
 
         const title = document.createElement("h5");
         title.classList.add("card-title");
         title.textContent = book.bookName;
 
         const description = document.createElement("p");
         description.classList.add("card-text");
         description.textContent = book.bookName;
 
         const timestamp = document.createElement("p");
         timestamp.classList.add("card-text");
         const timestampText = document.createElement("small");
         timestampText.classList.add("text-muted");
         timestampText.textContent = `Last updated ago`;
         timestamp.append(timestampText);
 
         colImg.append(img);
         colBody.append(cardBody);
         cardBody.append(title, description, timestamp);
         row.append(colImg, colBody);
         card.append(row);
 
         listOfBooks.append(card);
  }
}

// Initialization Code
window.onload = populateUI()

// Event Listeners
const addBtn = document.querySelector('.add-book');
addBtn.addEventListener('click', addBook);
