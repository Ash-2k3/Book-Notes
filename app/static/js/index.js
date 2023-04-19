function fetchData(){
         return new Promise((resolve, reject) => {
                  fetch('/products')
                  .then(response => response.text())
                  .then(data => {
                           console.log('Here s the data you requested', data);
                  })
         })
}

function addBook(){
         const bookNameTextField = document.querySelector('.book-input-form');
         const bookName = bookNameTextField.value;
         const newListElement = document.createElement("li");
         const newTextNode = document.createTextNode(bookName);
         newListElement.append(newTextNode);
         listOfBooks.append(newListElement)
         console.log("hii",bookName);
}

listOfBooks = document.querySelector('.books-list')

addBtn = document.querySelector('.add-book');

addBtn.addEventListener('click' , addBook);