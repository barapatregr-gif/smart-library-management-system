/* =========================
   ADMIN SYSTEM
========================= */


/* CHECK ADMIN */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const role =
            localStorage.getItem(
                "libraryRole"
            );


        if (
            window.location.pathname
                .includes("admin.html") &&
            role !== "admin"
        ) {

            alert(
                "🔐 Admin login required."
            );

            window.location.href =
                "login.html";

            return;

        }


        displayAdminBooks();

        updateAdminStats();


        const form =
            document.getElementById(
                "addBookForm"
            );


        if (form) {

            form.addEventListener(
                "submit",
                addBook
            );

        }

    }
);


/* ADD BOOK */

function addBook(e) {

    e.preventDefault();


    const title =
        document.getElementById(
            "bookTitle"
        ).value.trim();


    const author =
        document.getElementById(
            "bookAuthor"
        ).value.trim();


    const category =
        document.getElementById(
            "bookCategory"
        ).value.trim();


    const year =
        Number(
            document.getElementById(
                "bookYear"
            ).value
        );


    const copies =
        Number(
            document.getElementById(
                "bookCopies"
            ).value
        );


    const newBook = {

        id:
            Date.now(),

        title: title,

        author: author,

        category: category,

        year: year,

        copies: copies,

        available: copies

    };


    books.push(newBook);


    saveBooks();


    document.getElementById(
        "addBookForm"
    ).reset();


    document.getElementById(
        "adminMessage"
    ).innerHTML =
        "✅ Book added successfully!";


    displayAdminBooks();

    updateAdminStats();

}


/* DELETE BOOK */

function deleteBook(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this book?"
        );


    if (!confirmDelete) return;


    books =
        books.filter(
            book => book.id !== id
        );


    saveBooks();


    displayAdminBooks();

    updateAdminStats();

}


/* DISPLAY ADMIN BOOKS */

function displayAdminBooks() {

    const container =
        document.getElementById(
            "adminBooks"
        );


    if (!container) return;


    container.innerHTML =
        books.map(book => `

        <div class="admin-book">

            <div>

                <strong>
                    📚 ${book.title}
                </strong>

                <p>
                    Author:
                    ${book.author}
                </p>

                <p>
                    Available:
                    ${book.available}/${book.copies}
                </p>

            </div>

            <button
                class="logout-btn"
                onclick="deleteBook(${book.id})">

                ❌ Delete

            </button>

        </div>

    `).join("");

}


/* ADMIN STATISTICS */

function updateAdminStats() {

    const total =
        document.getElementById(
            "adminTotalBooks"
        );


    const available =
        document.getElementById(
            "adminAvailableBooks"
        );


    const issued =
        document.getElementById(
            "adminIssuedBooks"
        );


    if (total) {

        total.innerText =
            books.reduce(
                (sum, book) =>
                    sum + book.copies,
                0
            );

    }


    if (available) {

        available.innerText =
            books.reduce(
                (sum, book) =>
                    sum + book.available,
                0
            );

    }


    if (issued) {

        issued.innerText =
            books.reduce(
                (sum, book) =>
                    sum +
                    (book.copies -
                    book.available),
                0
            );

    }

}
