const url = './data/booknotes_data.json';

let fetchedBooks = url;

const booksDOM = document.querySelector('.books-center');

async function loadAndDisplayBooks() {
    try {
        // Step 1: Fetch the local JSON file
        const resp = await fetch(url);
        // Step 2: Parse the response stream into a usable JavaScript array
        const booksArray = await resp.json();
        // Step 3: Map over the array to generate HTML template literals

        const bookList = booksArray.map(item => {
            return `<div class="book-card"><a class="single-book" href="book-details.html?id=${item.book_id}">
              <img src="${item.book_cover_image}" class="single-book-img img" alt="${item.book_title}" />
              <footer>
                <h5 class="name">${item.book_title}</h5>
              </footer>
            </a></div>`;
        })
            .join(''); // Step 4: Remove commas separating array items
        // Step 5: Render the markup into the DOM
        booksDOM.innerHTML = bookList;

    } catch (error) {
        booksDOM.innerHTML = '<p class="error">there was an error</p>';
    }

}

// Execute the function
loadAndDisplayBooks();