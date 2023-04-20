function fetchBooksList(){
         return new Promise((resolve, reject) => {
                  fetch('/products')
                  .then(response => response.text())
                  .then(data => {
                           console.log('Here s the data you requested', data);
                  })
         })
}

function createBookInstance(bookName){
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

function addBook(){
         const bookNameTextField = document.querySelector('.book-input-form');
         const bookName = bookNameTextField.value;
         const newListElement = document.createElement("li");
         const newTextNode = document.createTextNode(bookName);
         createBookInDb(bookName);
}

listOfBooks = document.querySelector('.books-list')

addBtn = document.querySelector('.add-book');

addBtn.addEventListener('click' , addBook);