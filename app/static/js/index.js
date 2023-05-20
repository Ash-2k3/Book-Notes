// Import Statements
import { Book } from "./model.js"

// Global Variables
const listOfBooks = document.querySelector('.books-list')

// Functions
function fetchBooksList() {
  // console.log("Fetching from backend");
  return new Promise((resolve, reject) => {
    fetch('/get-books')
      .then(response => response.json())
      .then(data => {
        const book_lists = [];
        for (const book of data) {
          // console.log(book.book_name);
          let newBook = new Book(book.book_name);
          book_lists.push(newBook);
        }
        // console.log(book_lists)
        resolve(book_lists);
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

function getRelatedBookInfo() {
  return new Promise((resolve, reject) => {
    fetch('/search-book-info')
      .then(response => response.json())
      .then(data => {
        const responseBooks = data.items
        console.log(data);
        for (let i = 0; i < responseBooks.length; i++) {
          console.log(responseBooks[i].volumeInfo.subtitle);
          const authors = responseBooks[i].volumeInfo.authors[0];
          const description = responseBooks[i].volumeInfo.description
          const bookThumbnail = responseBooks[i].volumeInfo.imageLinks.smallThumbnail
          const pageCount = responseBooks[i].volumeInfo.pageCount
          const bookTitle = responseBooks[i].volumeInfo.title
          const bookSubTitle = responseBooks[i].volumeInfo.subtitle
        }
        resolve(data)
      })
      .catch(error => {
        console.error('Error', error);
        reject(error);
      })
  })

}

async function addBook() {
  const bookNameTextField = document.querySelector('.book-input-form');
  const bookName = bookNameTextField.value;
  await createBookInstance(bookName);
  await populateUI();
  // console.log(here);
}

async function populateUI() {
  console.log('Hi Mike testing desu')
  getRelatedBookInfo()
  listOfBooks.innerHTML = "";
  let book_lists = await fetchBooksList();
  console.log(listOfBooks);
  let i = 0;
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
    title.textContent = book.book_name;
    console.log(book.book_name);

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = book.book_name;

    const timestamp = document.createElement("p");
    timestamp.classList.add("card-text");
    const timestampText = document.createElement("small");
    timestampText.classList.add("text-muted");
    timestampText.textContent = `Last updated ${i} ago`;
    timestamp.append(timestampText);
    i++;
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

const searchBar = document.querySelector('.book-search-bar')
console.log(searchBar);
searchBar.addEventListener('input', (event) => {
  console.log(searchBar.value);
});
