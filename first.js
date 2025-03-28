

document.addEventListener("DOMContentLoaded", function () {
    /* ==========================
       "Learn More" Button Logic
    ========================== */
    const learnMoreBtn = document.getElementById("learn-more-btn");
    const extraDescription = document.getElementById("extra-description");

    learnMoreBtn.addEventListener("click", function () {
        if (extraDescription.style.display === "none" || extraDescription.style.display === "") {
            extraDescription.style.display = "block";
            extraDescription.classList.add("show"); // Smooth transition
            learnMoreBtn.textContent = "Show Less";
        } else {
            extraDescription.style.display = "none";
            extraDescription.classList.remove("show");
            learnMoreBtn.textContent = "Learn More";
        }
    });

    /* ==========================
       Authentication Logic
    ========================== */
    const loginBtn = document.getElementById("login-btn");
    

    loginBtn.addEventListener("click", () => {
        // Dummy authentication
        authSection.style.display = "block";
        quizSection.style.display = "none";
    });

    // Dummy user database (Replace with a real backend API)
// Array to store user signups
let users = [];

// Open Signup Popup
document.getElementById("signup-link").addEventListener("click", function() {
    document.getElementById("signup-popup").style.display = "flex";
});

// Close Signup Popup
document.querySelector(".close-btn").addEventListener("click", function() {
    document.getElementById("signup-popup").style.display = "none";
});

// Handle Signup Process
document.getElementById("signup-btn").addEventListener("click", function() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;
 //check if user enter nothing 
    if (email === "" || password === "" || confirmPassword === "") {
        alert("Please enter all the details.");
        return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Check if user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert("User already exists with this email!");
        return;
    }

    // Add user to the array
    users.push({ email, password });
    alert("Signup successful! You can now log in.");

    // Close the signup popup
    document.getElementById("signup-popup").style.display = "none";

    // Clear the form
    document.getElementById("signup-email").value = '';
    document.getElementById("signup-password").value = '';
    document.getElementById("signup-confirm-password").value = '';
});

// Handle Login Process
document.getElementById("login-btn").addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if the user exists and the password is correct
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert("Login successful!");
    } else {
        alert("Invalid email or password!");
    }
});


// Function to handle login

   loginBtn.addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if user exists
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert("Login Successful!");
   localStorage.setItem("Email", email); // Store login state
    document.getElementById("email").value="";
    document.getElementById("password").value="";
        window.location.href = "../dashBoard/dashboard.html"; // Redirect to new page
    } else {
        alert("Invalid email or password. Please try again.");
        document.getElementById("email").value="";
    document.getElementById("password").value="";
        
    }
});


   

});

const profile = document.getElementById("profile");

profile.addEventListener('click', () => {
    const display = document.getElementById("emailDisplay");
    const Email = localStorage.getItem("Email");

    // Check if the email is currently visible
    if (display.style.display === "none" || display.style.display === "") {
        // If hidden or no display style set, show the email
        display.style.display = "block";
        display.innerText = `Email : ${Email}`; // Set the email
    } else {
        // If visible, hide the email
        display.style.display = "none";
    }
});



// const profile = document.getElementById("profile");



//  profile.addEventListener('click',()=>{
  
//     const display = document.getElementById("emailDisplay");
//     const Email = localStorage.getItem("Email");
//     display.innerText=`Email : ${Email}`;
    
     

//  })

 
    // // Ensure that the page scrolls to the top (home section) upon refresh
    // window.onload = function() {
    //     // Redirect to the Home section by scrolling to the top of the page
    //     window.location.href = "#hero-section";
    // };

    document.getElementById('section1').addEventListener('click', function() {
        window.location.href = '../fullmock/fullmock.html';
    });

    document.getElementById('section2').addEventListener('click', function() {
        window.location.href = '../chapterbook/chaptermock.html';
    });

    document.getElementById('section3').addEventListener('click', function() {
        window.location.href = '../subjectmock/subjectmock.html';
    });

    document.getElementById('section4').addEventListener('click', function() {
        window.location.href = '../pyqmock/pyqmock.html';
    });

    document.getElementById('section5').addEventListener('click', function() {
        window.location.href = '../practicemock/practicemock.html';
    });

