const bookDOM = document.querySelector('.book');

const url = './data/booknotes_data.json';

// Get the ID from the query string
const params = new URLSearchParams(window.location.search);
const bookId = params.get('id');
//console.log(bookId)

async function fetchBookDetails() {
    try {
        // Replace this URL with your actual API or JSON file
        const response = await fetch(url);
        //console.log(response)
        const books = await response.json();

        // Use .find() to locate the exact book object
        const selectedBook = books.find(book => book.book_id == parseInt(bookId));

        if (selectedBook) {
            renderBookToDOM(selectedBook);
            //console.log(selectedBook)
        } else {
            console.error('Book not found');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderBookToDOM(book) {
    document.title = book.book_title.toUpperCase();

    // 4. Optional: Log to console to verify
    console.log(`Title successfully updated to: ${document.title}`);

    // 5. if a book is found, display it
    if (book) {
        bookDOM.innerHTML = `<div class="single-card">
                    <img src=${book.book_cover_image} alt=${book.book_title} class="single-card-image">
                    <div class="single-card-content">
                        <header class="header-title">
                            <h3>${book.book_title}</h3>
                        </header>
                        <h5>${book.author_name}</h5>  
                    <div class="card-text">                                      
                    <p>${book.book_notes}</p>
                    <h5>DATE READ: ${book.date_read}</h5>
                    <p><a class="btn" href=${book.book_url} target="_blank">Link To Open Library</a></p></div></div></div>`;
    } else {
        bookDOM.innerHTML = `<p>Book with ID ${bookId} not found.</p>`;
    }
}

// Initialize the function
fetchBookDetails();
