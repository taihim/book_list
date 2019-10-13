const list = document.getElementById('book-list');
const form = document.getElementById('book-form');


class Book{
    constructor(title, author, isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


class UI
{
    
    addBook(book)
    {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href="#" class = 'delete'>X</a></td>`;
                                       
        list.appendChild(tr);
    }

    displayMessage(msg, className)
    {   const container = document.querySelector('.container');
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(msg));
        div.className = `alert ${className}`;
        container.insertBefore(div, form);        

        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 2000);


    }

    clearFields()
    {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    
    }

    deleteBook(target)
    {
        target.parentElement.parentElement.remove();
    }
}


class Store
{
    static getBooks()
    {
        let books;

        if(localStorage.getItem('books') === null)
            books = [];

        else
        {
            books = JSON.parse(localStorage.getItem('books')); 
        }
        return books;
    }

    static displayBooks()
    {
        const books = this.getBooks();

        books.forEach(function(book){
            const ui = new UI();
            ui.addBook(book);
        });
                
    }

    static addBook(book)
    {
        const books = this.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }

    static deleteBook(isbn)
    {
        const books = this.getBooks();
        
        books.forEach(function(book, index){
            if(book.isbn === isbn)
                books.splice(index, 1);
        });

        localStorage.setItem('books', JSON.stringify(books));

    }

}


document.addEventListener('DOMContentLoaded', Store.displayBooks());

form.addEventListener('submit', function(e)
{
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const ui = new UI();

    if(title === '' || author === '' || isbn === '')
    {
        ui.displayMessage('Please ensure all inputs are valid', 'error');
        ui.clearFields();
    }
    else
    {
        const newBook = new Book(title, author, isbn);
        ui.addBook(newBook);
        ui.displayMessage('Book added successfully', 'success');
        ui.clearFields();
        Store.addBook(newBook);
    }


    e.preventDefault();
}
)



list.addEventListener('click', function(e){
    const ui = new UI();

    if(e.target.className === 'delete')
    {
        console.log(e.target.parentElement.parentElement);
        ui.deleteBook(e.target);
        ui.displayMessage('Book deleted successfully', 'success');
        Store.deleteBook(e.target.parentElement.previousElementSibling.textContent);
    }

    e.preventDefault();

})