const addBookForm = document.querySelector('#add-book');
const openFormBtn = document.getElementById('open-form');
addBookForm.setAttribute('style', 'width: 19%; font-size: .9em; display: none; text-align: left; background-color: rgba(255, 255, 255, 0.9); color: black; \
padding: 1.5em; margin: 1em; margin-left: 38em; padding-left: 2em; border-radius: 6%; border-style: solid; border-color: #DBDBDB;\
box-shadow: 5px 5px 5px rgba(68, 68, 68, 0.6); font-weight: 700');
const submitBookBtn = document.getElementById('add-book-btn');
const formTitle = addBookForm.querySelector('#title-form');
const formAuthor = addBookForm.querySelector('#author-form');
const formPages = addBookForm.querySelector('#pages-form');
const formHasRead = addBookForm.querySelector('#form-read-yes');
const formNotRead = addBookForm.querySelector('#form-read-no');

const libraryBooks = document.querySelector('#books-container');
let bookCard;
let bookTitleCard;
let bookAuthorCard;
let bookPagesCard;
let bookReadStatus;
let deleteBtn;
let toggleReadBtn;

let bookArray = [];
let i = 0;

openFormBtn.addEventListener('click', () => {
 if (addBookForm.style.display === 'none') {
     addBookForm.style.display = 'block';
 } else {
     addBookForm.style.display = 'none';
 }
});

submitBookBtn.addEventListener('click', addBooktoLib);

function addBooktoLib(e) {
    e.preventDefault();
    let checkedRadioBtn;
    let bookTitle = formTitle.value;
    let bookAuthor = formAuthor.value;
    let bookPages = formPages.value;
    if (formHasRead.checked) {
        checkedRadioBtn = formHasRead.value;
    } else if (formNotRead.checked) {
        checkedRadioBtn = formNotRead.value;
    } 
    let submittedBook = new Book(bookTitle, bookAuthor, bookPages,checkedRadioBtn);
    addBookForm.style.display = 'none';
    addBookForm.reset();
    bookArray.push(submittedBook);
    makeBookCards(bookArray[i]);
    localStorage.setItem(i, JSON.stringify(bookArray[i]));
    i++;
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.readYet = function() {
        let readString = "";
        if (this.read === "yes") {
            readString = "already read";
        } else {
            readString = "not yet read";
        }
        return readString;
    }
}

function makeBookCards(book) {
        bookCard = document.createElement('div');
        bookCard.classList.add('books');
        bookCard.setAttribute('id', i);
        bookTitleCard = document.createElement('h3');
        bookTitleCard.textContent = book.title;
        bookCard.appendChild(bookTitleCard);
        bookAuthorCard = document.createElement('p');
        bookAuthorCard.textContent = `Author: ${book.author}`;
        bookCard.appendChild(bookAuthorCard);
        bookPagesCard = document.createElement('p');
        bookPagesCard.textContent = `Pages: ${book.pages}`;
        bookCard.appendChild(bookPagesCard);
        bookReadStatus = document.createElement('p');
        deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-book');
        deleteBtn.textContent = "Delete";   
        deleteBtn.addEventListener('click', deleteBook); 
        toggleReadBtn = document.createElement('button');
        bookReadStatus.classList.add('read-status');
        toggleReadBtn.classList.add('read-button');
        if (book.read === "no") {
            bookReadStatus.classList.add('not-read');
            bookReadStatus.textContent = "Status: Not read yet";
            toggleReadBtn.classList.add('done-yet');
            toggleReadBtn.textContent = "Finished reading?";
        } else {
            bookReadStatus.textContent = "Status: Read";
            toggleReadBtn.textContent = "Read again?";
        }
        toggleReadBtn.addEventListener('click', changeReadStatus);
        bookCard.appendChild(bookReadStatus);
        bookCard.appendChild(toggleReadBtn);
        bookCard.appendChild(deleteBtn);
        libraryBooks.appendChild(bookCard);
}

/*
var storage = (function() {
	var uid = new Date;
	var storage;
	var result;
	try {
		(storage = window.localStorage).setItem(uid, uid);
		result = storage.getItem(uid) == uid;
		storage.removeItem(uid);
		return result && storage;
	} catch (exception) {}
}());
*/

function deleteBook(e) {
    let removedBook = e.target.parentNode;
    let removedBookID = removedBook.getAttribute('id');
    removedBook.remove();
    bookArray.splice(removedBookID, 1);
    localStorage.removeItem(removedBookID);
}

function changeReadStatus(e) {
    if (e.target.textContent === "Finished reading?") {
        bookReadStatus.classList.remove('not-read');
        toggleReadBtn.classList.remove('done-yet');
        bookReadStatus.textContent = "Status: Read";
        toggleReadBtn.textContent = "Read again?";
    } else {
        toggleReadBtn.classList.add('done-yet');
        bookReadStatus.classList.add('not-read');
        bookReadStatus.textContent = "Status: Not read yet";
        toggleReadBtn.textContent = "Finished reading?";
    }
}

window.unload = loadBooks() 

function loadBooks() {
    if (!localStorage) {
        return;
    } else {
        for (let j = 0; j < localStorage.length; j++) {
            let retrievedStorage = localStorage.getItem(j);
            let storedObject = JSON.parse(retrievedStorage);
            bookArray.push(storedObject);
        }
        bookArray.forEach(book => makeBookCards(book));
    }
}