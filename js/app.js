/* =========================
   SMART LIBRARY APP.JS
========================= */


/* LOGIN */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;

        const role =
            document.getElementById("role").value;

        let valid = false;

        if (
            role === "student" &&
            username === "student" &&
            password === "1234"
        ) {
            valid = true;
        }

        if (
            role === "admin" &&
            username === "admin" &&
            password === "admin123"
        ) {
            valid = true;
        }


        const message =
            document.getElementById("loginMessage");


        if (valid) {

            localStorage.setItem(
                "libraryUser",
                username
            );

            localStorage.setItem(
                "libraryRole",
                role
            );

            message.innerHTML =
                "✅ Login successful!";

            message.style.color = "green";


            setTimeout(function() {

                if (role === "admin") {

                    window.location.href =
                        "admin.html";

                } else {

                    window.location.href =
                        "dashboard.html";

                }

            }, 700);

        } else {

            message.innerHTML =
                "❌ Invalid username or password.";

            message.style.color = "red";

        }

    });

}


/* LOGOUT */

function logout() {

    localStorage.removeItem("libraryUser");
    localStorage.removeItem("libraryRole");

    window.location.href = "login.html";

}


/* CURRENT USER */

function getCurrentUser() {

    return localStorage.getItem(
        "libraryUser"
    );

}


/* CURRENT ROLE */

function getCurrentRole() {

    return localStorage.getItem(
        "libraryRole"
    );

}


/* =========================
   CHATBOT
========================= */

function openChatbot() {

    const question =
        prompt(
            "🤖 Smart Library Bot\n\n" +
            "Ask about:\n" +
            "1. Books\n" +
            "2. Issue\n" +
            "3. Return\n" +
            "4. Fine\n" +
            "5. QR Scanner"
        );


    if (!question) return;


    const q =
        question.toLowerCase();


    let answer =
        "Sorry, I don't understand that question.";


    if (q.includes("book")) {

        answer =
            "📚 You can search books from the Books page.";

    } else if (q.includes("issue")) {

        answer =
            "✅ Open Books and click Issue Book.";

    } else if (q.includes("return")) {

        answer =
            "↩️ You can return an issued book from your dashboard.";

    } else if (q.includes("fine")) {

        answer =
            "💰 Fine is calculated at ₹5 per overdue day.";

    } else if (q.includes("qr")) {

        answer =
            "📱 QR Scanner can be used to quickly open book details.";

    }


    alert(answer);

}


/* Add chatbot button */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const button =
            document.createElement("button");

        button.innerHTML = "💬";

        button.title =
            "Library Chatbot";

        button.style.position =
            "fixed";

        button.style.right =
            "20px";

        button.style.bottom =
            "20px";

        button.style.width =
            "55px";

        button.style.height =
            "55px";

        button.style.borderRadius =
            "50%";

        button.style.border =
            "none";

        button.style.cursor =
            "pointer";

        button.style.fontSize =
            "25px";

        button.onclick =
            openChatbot;

        document.body.appendChild(button);

    }
);
