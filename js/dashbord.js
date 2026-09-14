/* =========================
   STUDENT DASHBOARD
========================= */


document.addEventListener(
    "DOMContentLoaded",
    function() {

        const user =
            localStorage.getItem(
                "libraryUser"
            );


        const welcome =
            document.getElementById(
                "welcomeUser"
            );


        if (welcome) {

            welcome.innerHTML =
                user
                    ? "Welcome, " + user + " 👋"
                    : "Please login to view your dashboard.";

        }


        updateDashboard();

    }
);


/* UPDATE DASHBOARD */

function updateDashboard() {

    const totalBooks =
        document.getElementById(
            "totalBooks"
        );


    const issuedBooksElement =
        document.getElementById(
            "issuedBooks"
        );


    const fineElement =
        document.getElementById(
            "currentFine"
        );


    if (totalBooks) {

        totalBooks.innerText =
            books.length;

    }


    const user =
        localStorage.getItem(
            "libraryUser"
        );


    const issued =
        JSON.parse(
            localStorage.getItem(
                "issuedBooks"
            )
        ) || [];


    const myIssued =
        issued.filter(
            item =>
                item.user === user &&
                !item.returned
        );


    if (issuedBooksElement) {

        issuedBooksElement.innerText =
            myIssued.length;

    }


    let totalFine = 0;


    myIssued.forEach(item => {

        totalFine +=
            calculateFine(
                item.issueDate
            );

    });


    if (fineElement) {

        fineElement.innerText =
            "₹" + totalFine;

    }


    displayMyBooks(
        myIssued
    );

}


/* DISPLAY MY BOOKS */

function displayMyBooks(
    issuedList
) {

    const container =
        document.getElementById(
            "myBooks"
        );


    if (!container) return;


    if (issuedList.length === 0) {

        container.innerHTML =
            "<p>You have no issued books.</p>";

        return;

    }


    container.innerHTML =
        issuedList.map(item => {

            const book =
                books.find(
                    b => b.id === item.bookId
                );


            if (!book) return "";


            const fine =
                calculateFine(
                    item.issueDate
                );


            return `

                <div class="admin-book">

                    <div>

                        <strong>
                            ${book.title}
                        </strong>

                        <p>
                            Issued:
                            ${new Date(
                                item.issueDate
                            ).toLocaleDateString()}
                        </p>

                        <p>
                            Fine:
                            ₹${fine}
                        </p>

                    </div>

                    <button
                        class="btn"
                        onclick="returnBook(${book.id})">

                        ↩️ Return

                    </button>

                </div>

            `;

        }).join("");

}
