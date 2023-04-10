function fetchData(){
         return new Promise((resolve, reject) => {
                  fetch('/products')
                  .then(response => response.text())
                  .then(data => {
                           console.log('Here is the data you requested', data);
                  })
         })
}

addBtn = document.querySelector('.add-book');

addBtn.addEventListener('click' , fetchData);