const myLibrary = []; //Array to store book objects

// Book class
function Book(id, author, title, numPages, read) {
  this.id = id;
  this.author = author;
  this.title = title;
  this.numPages = numPages;
  this.read = read;
}

// Adds new books
function addBookToLibrary(author, title, numPages, read) {
  const book_id = crypto.randomUUID();
  const book = new Book(book_id, author, title, numPages, read);
  myLibrary.push(book);
  displayBooksInLibrary();
}

// Displays books in the myLibrary array
function displayBooksInLibrary() {
  libraryContainer.innerHTML = ''; // Clear previous cards

  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('book-card');

    // Displays each book
    const content = document.createElement('div');
    content.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.numPages}</p>
    `;

    // Button to remove books
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✕';
    removeBtn.classList.add('remove-btn');
    removeBtn.title = 'Remove Book';

    removeBtn.addEventListener('click', () => {
      removeBookById(book.id);
    });

    // Button to toggle between read and unread
    const toggleBtn = document.createElement('button');
    toggleBtn.classList.add('toggle-read-btn');
    toggleBtn.style.backgroundColor = book.read ? '#4caf50' : '#d9534f'; // Soft green / soft red
    toggleBtn.textContent = book.read ? 'Read' : 'Unread';


    toggleBtn.addEventListener('click', () => {
      toggleReadStatus(book.id);
    });

    // Assembles the card structure
    card.appendChild(removeBtn);
    card.appendChild(content);
    card.appendChild(toggleBtn);

    libraryContainer.appendChild(card);
  });
}

// Function toggle between read and unread
function toggleReadStatus(bookId) {
  const book = myLibrary.find(b => b.id === bookId);
  if (book) {
    book.read = !book.read;
    displayBooksInLibrary(); // Re-render cards
  }
}

// Function to remove books
function removeBookById(bookId) {
  const index = myLibrary.findIndex(book => book.id === bookId);
  if (index !== -1) {
    myLibrary.splice(index, 1); // Remove from array
    displayBooksInLibrary(); // Refresh UI
  }
}

// Creates page
const body = document.body;

// Title
const heading = document.createElement('h1');
heading.textContent = 'Welcome to the Library!';
body.appendChild(heading);

// Add Book Button
const addBookBtn = document.createElement('button');
addBookBtn.id = 'add-book-btn';
addBookBtn.textContent = 'Add New Book';
body.appendChild(addBookBtn);

// Form to receive new book data
const form = document.createElement('form');
form.id = 'book-form';
form.style.marginTop = '1rem';
form.innerHTML = `
  <input type="text" id="title" placeholder="Title" required>
  <input type="text" id="author" placeholder="Author" required>
  <input type="number" id="numPages" placeholder="Number of Pages" required>
  <label><input type="checkbox" id="read"> Read</label>
  <button type="submit">Add Book</button>
`;
form.style.flexWrap = 'wrap';
form.style.gap = '1rem';
form.style.justifyContent = 'center';
form.style.alignItems = 'center';
form.style.marginBottom = '2rem';

const formContainer = document.createElement('div');
formContainer.id = 'form-container';
formContainer.classList.add('hidden'); // hidden by default
formContainer.appendChild(form);
body.appendChild(formContainer);

// Library Container
const libraryContainer = document.createElement('div');
libraryContainer.id = 'library-container';
body.appendChild(libraryContainer);

// Error message
const errorMessage = document.createElement('div');
errorMessage.id = 'error-message';
errorMessage.style.color = 'red';
errorMessage.style.fontWeight = 'bold';
errorMessage.style.marginTop = '1rem';
errorMessage.style.display = 'none';
body.appendChild(errorMessage);


// Event listener to add new books
addBookBtn.addEventListener('click', () => {
  formContainer.classList.toggle('hidden');
  errorMessage.style.display = 'none';
});

// Event listener to submit new book information
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const numPagesInput = document.getElementById('numPages');
  const readCheckbox = document.getElementById('read');

  const title = titleInput.value;
  const author = authorInput.value;
  const numPages = parseInt(numPagesInput.value, 10);
  const read = readCheckbox.checked;

  // Validate if page numbers are positive
  if (isNaN(numPages) || numPages < 1) {
    errorMessage.textContent = 'A book cannot have negative pages';
    errorMessage.style.display = 'block';
    numPagesInput.focus(); // Set focus for user convenience
    return;
  }

  addBookToLibrary(author, title, numPages, read);

  // Reset form and hide error
  form.reset();
  errorMessage.style.display = 'none';
  form.style.display = 'none';
});

// Also hide error when user types again in numPages
document.getElementById('numPages').addEventListener('input', () => {
  errorMessage.style.display = 'none';
});


// Some books to add something to the initial display
addBookToLibrary("George Orwell", "1984", 328, true);
addBookToLibrary("J.K. Rowling", "Harry Potter and the Sorcerer's Stone", 309, false);
addBookToLibrary("Harper Lee", "To Kill a Mockingbird", 281, true);
addBookToLibrary("F. Scott Fitzgerald", "The Great Gatsby", 180, false);
addBookToLibrary("Mary Shelley", "Frankenstein", 280, true);
addBookToLibrary("J.R.R. Tolkien", "The Hobbit", 310, false);
addBookToLibrary("Khaled Hosseini", "The Kite Runner", 371, true);
addBookToLibrary("Delia Owens", "Where the Crawdads Sing", 384, false);
addBookToLibrary("Emily St. John Mandel", "Station Eleven", 336, false);
addBookToLibrary("Colson Whitehead", "The Underground Railroad", 320, false);


displayBooksInLibrary()