/*
https://www.theodinproject.com/lessons/node-path-javascript-library
 */

const myLibrary = [];
const addBooksButton = document.querySelector("#add-books-button");
const addBooksModal = document.querySelector(".add-books-dialog");
const closeBooksModalButton = document.querySelector(".close-add-book-dialog");
const addBooksForm = document.querySelector(".add-books-form");
const bookCardList = document.querySelector(".book-card-list");

addBooksButton.addEventListener("click", () => {
  addBooksModal.showModal();
});

closeBooksModalButton.addEventListener("click", () => {
  addBooksModal.close();
});

addBooksForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = document.querySelector('input[label="title"]').value;
  let author = document.querySelector('input[label="author"]').value;
  let pages = document.querySelector('input[label="pages"]').value;

  addBookToLibrary(title, author, pages);

  addBooksForm.reset();
  addBooksModal.close();
});

// Event Delegation- adding an event on parent class and
// then doing operations based on child elements
bookCardList.addEventListener("click", (e) => {
  // Get closest parent i.e. book card
  const card = e.target.closest(".book-card");
  if (!card) return;

  // Extract data-id attribute
  const bookId = card.dataset.id;
  const bookIdx = myLibrary.findIndex((book) => book.id == bookId);

  // Handle delete event
  if (e.target.classList.contains("delete-book")) {
    // splice the array
    if (bookIdx != -1) {
      myLibrary.splice(bookIdx, 1);
    }
  }

  // Handle toggle read status
  if (e.target.classList.contains("mark-as-read")) {
    myLibrary[bookIdx].toggleReadStatus();
  }

  renderBookCards();
});

class Book {
  constructor(title, author, pages, haveRead = false) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }

  info() {
    return `${this.title} is written by ${this.author} and has ${this.pages}`;
  }

  toggleReadStatus() {
    this.haveRead = !this.haveRead;
  }
}

function addBookToLibrary(title, author, pages, haveRead = false) {
  myLibrary.push(new Book(title, author, pages, haveRead));
  renderBookCards();
}

addBookToLibrary("LOTR", "JRR Tolkein", "100");
addBookToLibrary("Harry Potter", "JK Rowling", "100");

function renderBookCards() {
  const container = document.querySelector(".book-card-list");
  container.innerHTML = "";

  for (let idx = 0; idx < myLibrary.length; idx++) {
    const book = myLibrary[idx];
    const card = `
    <div class="book-card" data-id="${book.id}">
        <div class="book-info">
            <p><strong>Title</strong> : ${book.title}</p>
            <p><strong>Author</strong> : ${book.author}</p>
            <p><strong>Pages</strong> : ${book.pages}</p>
            <p><strong>Have Read</strong> : ${
              book.haveRead == true ? "Yes" : "No"
            }</p>
        </div>
        <div class="book-footer">
            <button class="mark-as-read">${
              book.haveRead == true ? "Mark Unread" : "Mark Read"
            }</button>
            <button class="delete-book">Delete</button>
        </div>
    </div>
    `;

    container.innerHTML += card;
  }
}
