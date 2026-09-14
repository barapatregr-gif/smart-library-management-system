/* =========================
   SMART LIBRARY BOOK SYSTEM
========================= */


/* BOOK DATABASE */

let books =
    JSON.parse(
        localStorage.getItem("libraryBooks")
    );


/* DEFAULT BOOKS */

if (!books) {

    books = [

        {
            id: 1,
            title: "Python Programming",
            author: "R. Sharma",
            category: "Programming",
            year: 2024,
            copies: 5,
            available: 5
        },

        {
            id: 2,
            title: "Data Structures",
            author: "N. Patel",
            category: "Programming",
            year: 2023,
            copies: 4,
            available: 4
        },

        {
            id: 3,
            title: "Database Management System",
            author: "A. Kumar",
            category: "Database",
            year: 2022,
            copies: 3,
            available: 3
        },

        {
            id: 4,
            title: "Computer Networks",
            author: "S. Gupta",
            category: "Networking",
            year: 2024,
            copies: 5,
            available: 5
        },

        {
            id: 5,
            title: "Operating System",
            author: "M. Singh",
            category: "Programming",
            year: 2023,
            copies: 4,
            available: 4
        },

        {
            id: 6,
            title: "Engineering Physics",
            author: "P. Joshi",
            category: "Science",
            year: 2024,
            copies: 3,
            available: 3
        },

        {
            id: 7,
            title: "Artificial Intelligence",
            author: "A. Verma",
            category: "Programming",
            year: 2025,
            copies: 4,
            available: 4
        },

        {
            id: 8,
            title: "Web Development",
            author: "K. Deshmukh",
            category: "Programming",
            year: 2025,
            copies: 5,
            available: 5
        }

    ];


    saveBooks();

}


/* SAVE BOOKS */

function saveBooks() {

    localStorage.setItem(
        "libraryBooks",
        JSON.stringify(books)
    );

}


/* DISPLAY BOOKS */

function displayBooks(list = books) {

    const container =
        document.getElementById(
            "booksContainer"
        );


    if (!container) return;


    if (list.length === 0) {

        container.innerHTML =
            "<p>No books found.</p>";

        return;

    }


    container.innerHTML =
        list.map(book => `

        <div class="book-card">

            <div class="book-icon">
                📖
            </div>

            <h3>
                ${book.title}
            </h3>

            <p>
                👤 ${book.author}
            </p>

            <p>
                📂 ${book.category}
            </p>

            <p>
                📅 ${book.year}
            </p>

            <p>
                📚 Available:
                ${book.available}
            </p>

            <div class="actions">

                <button
                    onclick="viewBook(${book.id})">

                    📖 Details

                </button>

                <button
                    onclick="issueBook(${book.id})">

                    ✅ Issue

                </button>

            </div>

        </div>

    `).join("");

}


/* SEARCH */

function searchBooks() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    if (!searchInput) return;


    const search =
        searchInput.value.toLowerCase();


    const category =
        categoryFilter.value;


    const filtered =
        books.filter(book => {

            const matchesSearch =
                book.title
                    .toLowerCase()
                    .includes(search) ||

                book.author
                    .toLowerCase()
                    .includes(search) ||

                book.category
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "all" ||
                book.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    displayBooks(filtered);

}


/* VIEW BOOK */

function viewBook(id) {

    window.location.href =
        "book-details.html?id=" + id;

}


/* BOOK DETAILS */

function showBookDetails() {

    const container =
        document.getElementById(
            "bookDetails"
        );


    if (!container) return;


    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        Number(params.get("id"));


    const book =
        books.find(
            b => b.id === id
        );


    if (!book) {

        container.innerHTML =
            "<h2>Book not found.</h2>";

        return;

    }


    container.innerHTML = `

        <div class="book-large-icon">
            📚
        </div>

        <h1>
            ${book.title}
        </h1>

        <p>
            <strong>Author:</strong>
            ${book.author}
        </p>

        <p>
            <strong>Category:</strong>
            ${book.category}
        </p>

        <p>
            <strong>Year:</strong>
            ${book.year}
        </p>

        <p>
            <strong>Total Copies:</strong>
            ${book.copies}
        </p>

        <p>
            <strong>Available Copies:</strong>
            ${book.available}
        </p>

        <br>

        <button
            class="btn"
            onclick="issueBook(${book.id})">

            ✅ Issue Book

        </button>

        <button
            class="btn secondary"
            onclick="startQR(${book.id})">

            📱 QR Code

        </button>

        <br><br>

        <a href="books.html">
            ← Back to Books
        </a>

    `;

}


/* ISSUE BOOK */

function issueBook(id) {

    const user =
        localStorage.getItem(
            "libraryUser"
        );


    if (!user) {

        alert(
            "🔐 Please login first."
        );

        window.location.href =
            "login.html";

        return;

    }


    const book =
        books.find(
            b => b.id === id
        );


    if (!book) return;


    if (book.available <= 0) {

        alert(
            "❌ This book is currently unavailable."
        );

        return;

    }


    let issued =
        JSON.parse(
            localStorage.getItem(
                "issuedBooks"
            )
        ) || [];


    const alreadyIssued =
        issued.find(
            b =>
                b.bookId === id &&
                b.user === user
        );


    if (alreadyIssued) {

        alert(
            "⚠️ You already issued this book."
        );

        return;

    }


    book.available--;


    issued.push({

        bookId: id,

        user: user,

        issueDate:
            new Date().toISOString(),

        returned: false

    });


    localStorage.setItem(
        "issuedBooks",
        JSON.stringify(issued)
    );


    saveBooks();


    alert(
        "✅ Book issued successfully!"
    );


    location.reload();

}


/* RETURN BOOK */

function returnBook(bookId) {

    const user =
        localStorage.getItem(
            "libraryUser"
        );


    let issued =
        JSON.parse(
            localStorage.getItem(
                "issuedBooks"
            )
        ) || [];


    const record =
        issued.find(
            b =>
                b.bookId === bookId &&
                b.user === user &&
                !b.returned
        );


    if (!record) {

        alert(
            "Book issue record not found."
        );

        return;

    }


    const book =
        books.find(
            b => b.id === bookId
        );


    if (book) {

        book.available++;

    }


    record.returned = true;

    record.returnDate =
        new Date().toISOString();


    saveBooks();


    localStorage.setItem(
        "issuedBooks",
        JSON.stringify(issued)
    );


    alert(
        "↩️ Book returned successfully!"
    );


    location.reload();

}


/* FINE */

function calculateFine(issueDate) {

    const start =
        new Date(issueDate);


    const today =
        new Date();


    const difference =
        today - start;


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const freeDays = 7;


    if (days <= freeDays) {

        return 0;

    }


    return (
        days - freeDays
    ) * 5;

}


/* RECOMMENDATIONS */

function showRecommendations() {

    const container =
        document.getElementById(
            "recommendations"
        );


    const dashboardContainer =
        document.getElementById(
            "recommendedBooks"
        );


    const target =
        container ||
        dashboardContainer;


    if (!target) return;


    const recommended =
        books.slice(0, 4);


    target.innerHTML =
        recommended.map(book => `

        <div class="book-card">

            <div class="book-icon">
                🤖
            </div>

            <h3>
                ${book.title}
            </h3>

            <p>
                ${book.author}
            </p>

            <p>
                ${book.category}
            </p>

            <button
                class="btn"
                onclick="viewBook(${book.id})">

                View Book

            </button>

        </div>

    `).join("");

}


/* QR FUNCTION */

function startQR(id) {

    const book =
        books.find(
            b => b.id === id
        );


    if (!book) return;


    const url =
        window.location.origin +
        window.location.pathname
            .replace(
                "book-details.html",
                "book-details.html"
            ) +
        "?id=" + id;


    alert(
        "📱 QR Book Link:\n\n" +
        url +
        "\n\nYou can use this link to create a QR code."
    );

}


/* PAGE LOAD */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayBooks();

        showBookDetails();

        showRecommendations();


        const searchInput =
            document.getElementById(
                "searchInput"
            );


        const categoryFilter =
            document.getElementById(
                "categoryFilter"
            );


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                searchBooks
            );

        }


        if (categoryFilter) {

            categoryFilter.addEventListener(
                "change",
                searchBooks
            );

        }

    }
);
