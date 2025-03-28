// // Clear the content of main-content when any sidebar link is clicked (except for syllabus)
// function clearContent(excludeId = '') {
//     const sections = document.querySelectorAll('.main-content > div');
//     sections.forEach(section => {
//         if (section.id !== excludeId) {
//             section.style.display = 'none'; // Hide all sections except the excluded one
//         }
//     });
// }

// // Syllabus Section Toggle Handler
// const syllabusLink = document.getElementById('syllabus-link');
// syllabusLink.addEventListener('click', function (e) {
//     e.preventDefault();
    
//     const syllabusContainer = document.getElementById('syllabusContainer');
//     if (syllabusContainer.style.display === 'block') {
//         syllabusContainer.style.display = 'none'; // Hide syllabus if already shown
//     } else {
//         clearContent('syllabusContainer'); // Clear other sections
//         syllabusContainer.style.display = 'block'; // Show syllabus
//     }
// });


// // Reference the mock test button and instruction section
// const mockTestButton = document.getElementById('startMockTestBtn');
// const instructionSection = document.getElementById('instruction-section');
// const sidebar = document.getElementsByClassName('sidebar')

// // Add event listener to the "Start Full Mock 1" button to show instructions
// mockTestButton.addEventListener('click', function () {
//     clearContent();
//     instructionSection.style.display = 'block';  // Show instruction section
// });

// const TOTAL_QUESTIONS = 3;
// let selectedQuestions = [];
// let currentQuestionIndex = 0;
// let correctAnswersCount = 0;
// let timerInterval;
// let userAnswers = {}; // Global object to store user answers

// // Fetch questions from the API (replace with actual API/JSON file path)
// async function fetchQuestions() {
//     try {
//         const response = await fetch('./questionbank/engineering_math.json'); // Replace with actual path to JSON or API URL
//         const data = await response.json();
//         return data.questions;  // Assuming 'questions' is the key in your JSON
//     } catch (error) {
//         console.error('Error fetching questions:', error);
//     }
// }

// // Randomly select questions from the fetched data
// function getRandomQuestions(questionsData) {
//     let randomQuestions = [];
//     let questionIndexes = [];
//     while (randomQuestions.length < TOTAL_QUESTIONS) {
//         let randomIndex = Math.floor(Math.random() * questionsData.length);
//         if (!questionIndexes.includes(randomIndex)) {
//             questionIndexes.push(randomIndex);
//             randomQuestions.push(questionsData[randomIndex]);
//         }
//     }
//     return randomQuestions;
// }

// function displayCurrentQuestion() {
//     const questionContainer = document.getElementById('question-container');
//     const imageContainer = document.getElementById('image-container'); // Define image container

//     const question = selectedQuestions[currentQuestionIndex];
    
//     // Replace \n with <br> for HTML display
//     const formattedQuestion = question.question.replace(/\n/g, '<br>');

//     let questionHTML = `<div class="question-block"><p>${currentQuestionIndex + 1}. ${formattedQuestion}</p>`;

//     if (question.type === "numerical") {
//         // For numerical type questions, render a number input field
//         questionHTML += `
//             <input type="number" name="question${currentQuestionIndex}" placeholder="Enter your answer" required><br>`;
//     } else if (Array.isArray(question.options)) {
//         // For multiple choice or checkbox questions, render options
//         const isMultipleCorrect = Array.isArray(question.answer);
//         questionHTML += `
//             ${question.options.map(option => `
//                 <input type="${isMultipleCorrect ? 'checkbox' : 'radio'}" name="question${currentQuestionIndex}" value="${option}"> ${option}<br>
//             `).join('')}`;
//     }

//     questionHTML += `</div>`;

//     questionContainer.innerHTML = questionHTML;

//     // Display image if present
//     if (question.image) {
//         imageContainer.innerHTML = `<img src="${question.image}" alt="Question Image" style="max-width: 100%; height: auto;" />`;
//     } else {
//         imageContainer.innerHTML = ''; // Clear image container if no image
//     }

//     toggleButtons();
// }

// // Enable/disable navigation buttons
// function toggleButtons() {
//     document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
//     document.getElementById('nextBtn').disabled = currentQuestionIndex === selectedQuestions.length - 1;
// }

// // Save answer functionality
// function saveAnswer(index) {
//     const form = document.getElementById('questionForm');
//     const formData = new FormData(form);

//     const question = selectedQuestions[index];

//     if (question.type === "numerical") {
//         // For numerical questions
//         const userAnswer = formData.get(`question${index}`);
//         userAnswers[index] = parseFloat(userAnswer); // Store the numerical answer
//     } else if (Array.isArray(question.answer)) {
//         // For checkbox (multiple correct answers) questions
//         const userAnswersArray = formData.getAll(`question${index}`);
//         userAnswers[index] = userAnswersArray; // Store the selected checkboxes
//     } else {
//         // For radio button (single correct answer) questions
//         const userAnswer = formData.get(`question${index}`);
//         userAnswers[index] = userAnswer; // Store the selected radio button
//     }

//     alert('Answer saved for question ' + (index + 1));
// }

// // Move to next question
// document.getElementById('nextBtn').addEventListener('click', function () {
//     saveAnswer(currentQuestionIndex); // Save answer before moving to the next question
//     currentQuestionIndex++;
//     displayCurrentQuestion();
// });

// // Move to previous question
// document.getElementById('prevBtn').addEventListener('click', function () {
//     saveAnswer(currentQuestionIndex); // Save answer before moving to the previous question
//     currentQuestionIndex--;
//     displayCurrentQuestion();
// });

// // Add event listener to "Save" button for saving current answer
// document.getElementById('saveBtn').addEventListener('click', function() {
//     saveAnswer(currentQuestionIndex);
// });


// // Submit the form
// document.getElementById('questionForm').addEventListener('submit', function (e) {
//     e.preventDefault(); // Prevent default form submission
//     clearInterval(timerInterval); // Stop timer
//     calculateResult(); // Calculate the result when submitting
// });

// // Calculate result
// function calculateResult() {
//     correctAnswersCount = 0;

//     selectedQuestions.forEach((question, index) => {
//         const savedAnswer = userAnswers[index]; // Get the saved answer for this question

//         // Handle numerical-type questions
//         if (question.type === "numerical") {
//             const correctAnswer = parseFloat(question.answer);
//             if (savedAnswer === correctAnswer) {
//                 correctAnswersCount++;
//             }
//         }
//         // Handle questions with multiple correct answers (checkboxes)
//         else if (Array.isArray(question.answer)) {
//             const sortedCorrectAnswers = question.answer.slice().sort();
//             const sortedUserAnswers = savedAnswer.slice().sort();

//             if (JSON.stringify(sortedUserAnswers) === JSON.stringify(sortedCorrectAnswers)) {
//                 correctAnswersCount++;
//             }
//         }
//         // Handle single correct answers (radio buttons)
//         else {
//             if (savedAnswer === question.answer) {
//                 correctAnswersCount++;
//             }
//         }
//     });

//     const score = correctAnswersCount;
//     const accuracy = ((score / TOTAL_QUESTIONS) * 100).toFixed(2);
//     displayResult(score, accuracy); // Ensure result is displayed here
// }

// // Display result
// function displayResult(score, accuracy) {
//     document.getElementById('test-section').style.display = 'none'; // Hide the test section
//     document.getElementById('result-section').style.display = 'block'; // Show the result section
//     document.getElementById('score').innerHTML = `Score: ${score} / ${TOTAL_QUESTIONS}`;
//     document.getElementById('accuracy').innerHTML = `Accuracy: ${accuracy}%`;
// }

// // Retry button functionality
// document.getElementById('retryBtn').addEventListener('click', function () {
//     resetTest();
// });

// // Reset the test for retry
// function resetTest() {
//     document.getElementById('result-section').style.display = 'none';
//     document.getElementById('test-section').style.display = 'block';
//     initTest(); // Restart the test
// }


// function startTimer(duration, display) {
//     let timer = duration, hours, minutes, seconds;
//     timerInterval = setInterval(() => {
//         hours = parseInt(timer / 3600, 10);
//         minutes = parseInt((timer % 3600) / 60, 10);
//         seconds = parseInt(timer % 60, 10);

//         hours = hours < 10 ? "0" + hours : hours;
//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;

//         display.textContent = `Time Remaining: ${hours}:${minutes}:${seconds}`;

//         if (--timer < 0) {
//             clearInterval(timerInterval); // Stop timer when it reaches zero
//             document.getElementById('questionForm').submit(); // Auto-submit the form when time runs out
//         }
//     }, 1000);
// }

// // Start the test and timer for 2 hours
// async function initTest() {
//     const questionsData = await fetchQuestions();
//     selectedQuestions = getRandomQuestions(questionsData);
//     currentQuestionIndex = 0;
//     displayCurrentQuestion();
//     const display = document.getElementById('timer');
//     startTimer(2 * 60 * 60, display); // 2-hour timer (7200 seconds)
// }


// // Check consent to enable start button
// const consentCheckbox = document.getElementById('consentCheckbox');
// const startTestBtn = document.getElementById('startTestBtn');
// consentCheckbox.addEventListener('change', function () {
//     startTestBtn.disabled = !consentCheckbox.checked;
// });

// // Start test event
// startTestBtn.addEventListener('click', function () {
//    // document.getElementsByClassName('sidebar').style.display='none';
//     document.getElementsByClassName('main-content').innerHTML='';
//     document.getElementById('instruction-section').style.display = 'none';
//     document.getElementById('test-section').style.display = 'block';
//     initTest();
// });

// Clear the content of main-content when any sidebar link is clicked (except for syllabus)
function clearContent(excludeId = '') {
    const sections = document.querySelectorAll('.main-content > div');
    sections.forEach(section => {
        if (section.id !== excludeId) {
            section.style.display = 'none';
        }
    });
}

// Syllabus Section Toggle Handler
const syllabusLink = document.getElementById('syllabus-link');
syllabusLink.addEventListener('click', function(e) {
    e.preventDefault();
    const syllabusContainer = document.getElementById('syllabusContainer');
    syllabusContainer.style.display = syllabusContainer.style.display === 'block' ? 'none' : 'block';
});

// Reference elements
const mockTestButton = document.getElementById('startMockTestBtn');
const instructionSection = document.getElementById('instruction-section');
const TOTAL_QUESTIONS = 30;
let selectedQuestions = [];
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let timerInterval;
let userAnswers = {};
let testStarted = false;

// Fetch questions from JSON
async function fetchQuestions() {
    try {
        const response = await fetch('../questionbank/fullmock1.json');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching questions:', error);
        return { questions: [] };
    }
}

// Randomly select questions
function getRandomQuestions(questionsData) {
    const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, TOTAL_QUESTIONS);
}


function displayCurrentQuestion() {
    const questionContainer = document.getElementById('question-container');
    const imageContainer = document.getElementById('image-container');
    const question = selectedQuestions[currentQuestionIndex];

    // Clear previous content
    questionContainer.innerHTML = '';
    imageContainer.innerHTML = '';

    // 1. Display Question Text
    const questionElement = document.createElement('div');
    questionElement.className = 'question-text';
    questionElement.innerHTML = `<p>${currentQuestionIndex + 1}. ${question.question}</p>`;
    questionContainer.appendChild(questionElement);

    // 2. Display Image (if exists)
    if (question.image) {
        const imgElement = document.createElement('img');
        imgElement.src = question.image;
        imgElement.alt = "Question Diagram";
        imgElement.className = 'question-image';
        questionContainer.appendChild(imgElement);
    }

    // 3. Display Answer Field
    const answerContainer = document.createElement('div');
    answerContainer.className = 'answer-container';

    if (question.type === "numerical") {
        const inputElement = document.createElement('input');
        inputElement.type = 'number';
        inputElement.name = `question${currentQuestionIndex}`;
        inputElement.placeholder = "Enter your answer";
        inputElement.value = userAnswers[currentQuestionIndex] || '';
        inputElement.className = 'answer-input';
        answerContainer.appendChild(inputElement);
    } else if (Array.isArray(question.options)) {
        question.options.forEach((option, index) => {
            const optionWrapper = document.createElement('div');
            optionWrapper.className = 'option-wrapper';

            const inputElement = document.createElement('input');
            inputElement.type = Array.isArray(question.answer) ? 'checkbox' : 'radio';
            inputElement.name = `question${currentQuestionIndex}`;
            inputElement.id = `option-${currentQuestionIndex}-${index}`;
            inputElement.value = option;
            
            if ((Array.isArray(question.answer) && userAnswers[currentQuestionIndex]?.includes(option)) || 
                (!Array.isArray(question.answer) && userAnswers[currentQuestionIndex] === option)) {
                inputElement.checked = true;
            }

            const labelElement = document.createElement('label');
            labelElement.htmlFor = inputElement.id;
            labelElement.textContent = option;

            optionWrapper.appendChild(inputElement);
            optionWrapper.appendChild(labelElement);
            answerContainer.appendChild(optionWrapper);
        });
    }

    questionContainer.appendChild(answerContainer);
    toggleButtons();
    updateProgress();

 
}

// Update navigation buttons and progress
function toggleButtons() {
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').disabled = currentQuestionIndex === selectedQuestions.length - 1;
}

function updateProgress() {
    const progress = document.getElementById('progress');
    progress.textContent = `Question ${currentQuestionIndex + 1} of ${selectedQuestions.length}`;
}

// Save current answer
function saveAnswer() {
    const question = selectedQuestions[currentQuestionIndex];
    if (!question) return;

    if (question.type === "numerical") {
        const input = document.querySelector(`input[name="question${currentQuestionIndex}"]`);
        userAnswers[currentQuestionIndex] = input.value.trim() === '' ? null : parseFloat(input.value);
    } else if (Array.isArray(question.options)) {
        const inputs = document.querySelectorAll(`input[name="question${currentQuestionIndex}"]:checked`);
        userAnswers[currentQuestionIndex] = Array.from(inputs).map(input => input.value);
    }
}

// Navigation handlers
document.getElementById('nextBtn').addEventListener('click', function() {
    saveAnswer();
    if (currentQuestionIndex < selectedQuestions.length - 1) {
        currentQuestionIndex++;
        displayCurrentQuestion();
    }
});

document.getElementById('prevBtn').addEventListener('click', function() {
    saveAnswer();
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayCurrentQuestion();
    }
});

// Submit button handler
document.getElementById('submitBtn').addEventListener('click', function(e) {
    e.preventDefault();
    saveAnswer();
    
    // Show confirmation dialog with unanswered questions count
    const unansweredCount = selectedQuestions.reduce((count, _, index) => {
        return count + (userAnswers[index] === undefined || userAnswers[index] === null ? 1 : 0);
    }, 0);
    
    let confirmMessage = 'Are you sure you want to submit the test?';
    if (unansweredCount > 0) {
        confirmMessage += `\n\nYou have ${unansweredCount} unanswered question${unansweredCount !== 1 ? 's' : ''}.`;
    }
    
    if (confirm(confirmMessage)) {
        clearInterval(timerInterval);
        calculateResult();
    }
});

// Calculate test results
function calculateResult() {
    correctAnswersCount = 0;
    const attemptedQuestions = [];
    const questionResults = []; // Store detailed results for each question
    
    selectedQuestions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const questionNumber = index + 1;
        let isCorrect = false;
        
        if (userAnswer === null || userAnswer === undefined) {
            attemptedQuestions.push({
                number: questionNumber,
                attempted: false,
                correct: false
            });
            return;
        }
        
        const correctAnswer = question.answer;
        let answerStatus = 'wrong';
        
        if (question.type === "numerical") {
            isCorrect = Math.abs(parseFloat(userAnswer) - parseFloat(correctAnswer)) < 0.001;
        } else if (Array.isArray(correctAnswer)) {
            if (Array.isArray(userAnswer)) {
                const sortedUser = [...userAnswer].sort();
                const sortedCorrect = [...correctAnswer].sort();
                isCorrect = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
            }
        } else {
            isCorrect = userAnswer === correctAnswer;
        }
        
        if (isCorrect) {
            correctAnswersCount++;
            answerStatus = 'correct';
        }
        
        attemptedQuestions.push({
            number: questionNumber,
            attempted: true,
            correct: isCorrect,
            status: answerStatus,
            userAnswer: userAnswer,
            correctAnswer: correctAnswer
        });
    });

    displayResult(attemptedQuestions);
}

// Display results with beautiful styling
function displayResult(questionResults) {
    document.getElementById('test-section').style.display = 'none';
    const resultSection = document.getElementById('result-section');
    
    const attemptedCount = questionResults.filter(q => q.attempted).length;
    const correctCount = correctAnswersCount;
    const accuracy = attemptedCount > 0 
        ? ((correctCount / attemptedCount) * 100).toFixed(2)
        : 0;
    
    // Generate question-by-question breakdown
    const questionsBreakdown = questionResults.map(question => `
        <div class="question-result ${question.attempted ? question.status : 'unattempted'}">
            <div class="question-number">Q${question.number}</div>
            <div class="question-status">
                ${question.attempted ? 
                    (question.correct ? '✓ Correct' : '✗ Incorrect') : 
                    '— Unattempted'}
            </div>
            ${question.attempted && !question.correct ? `
                <div class="answer-comparison">
                    <span class="user-answer">Your answer: ${formatAnswer(question.userAnswer)}</span>
                    <span class="correct-answer">Correct answer: ${formatAnswer(question.correctAnswer)}</span>
                </div>
            ` : ''}
        </div>
    `).join('');
    
    resultSection.innerHTML = `
        <div class="result-container">
            <h2>Test Results</h2>
            
            <div class="result-summary">
                <div class="summary-card correct">
                    <div class="value">${correctCount}</div>
                    <div class="label">Correct Answers</div>
                </div>
                
                <div class="summary-card attempted">
                    <div class="value">${attemptedCount}</div>
                    <div class="label">Attempted Questions</div>
                </div>
                
                <div class="summary-card total">
                    <div class="value">${selectedQuestions.length}</div>
                    <div class="label">Total Questions</div>
                </div>
                
                <div class="summary-card accuracy">
                    <div class="value">${accuracy}%</div>
                    <div class="label">Accuracy</div>
                </div>
            </div>
            
            <div class="detailed-results">
                <h3>Question Breakdown</h3>
                <div class="questions-grid">
                    ${questionsBreakdown}
                </div>
            </div>
            
            <div class="action-buttons">
                <button id="retryBtn" class="btn retry-btn">Retry Test</button>
                <button id="reviewBtn" class="btn review-btn">Review Answers</button>
            </div>
        </div>
    `;
    
    resultSection.style.display = 'block';
    
    document.getElementById('retryBtn').addEventListener('click', function() {
        resultSection.style.display = 'none';
        testStarted = false;
        initTest();
    });
    
    document.getElementById('reviewBtn').addEventListener('click', function() {
        // Implement review functionality here
        alert('Review feature will be implemented here');
    });
}

// Helper function to format answers for display
function formatAnswer(answer) {
    if (Array.isArray(answer)) {
        return answer.join(', ');
    }
    return answer;
}
// Timer function
function startTimer(duration, displayElement) {
    let timer = duration;
    
    // Create timer display elements
    const timerContainer = document.createElement('div');
    timerContainer.className = 'timer-container';
    
    const timerLabel = document.createElement('span');
    timerLabel.className = 'timer-label';
    timerLabel.textContent = 'Time Remaining:';
    
    const timeDisplay = document.createElement('span');
    timeDisplay.className = 'time-display';
    
    timerContainer.appendChild(timerLabel);
    timerContainer.appendChild(timeDisplay);
    displayElement.appendChild(timerContainer);

    // Update timer every second
    const updateTimer = () => {
        const hours = Math.floor(timer / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((timer % 3600) / 60).toString().padStart(2, '0');
        const seconds = Math.floor(timer % 60).toString().padStart(2, '0');
        
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
        
        // Visual warnings when time is running low
        if (timer <= 1200) { // 20 minutes
            timeDisplay.style.color = '#e74c3c';
            if (timer <= 300) { // 1 minute
                timeDisplay.classList.add('blinking');
            }
        }
        
        if (--timer < 0) {
            clearInterval(timerInterval);
            autoSubmitTest();
        }
    };
    
    // Initial call and set interval
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    
    return timerInterval;
}

// Auto-submit function
function autoSubmitTest() {
    saveCurrentAnswer();
    calculateResults();
}

// Initialize test with timer
async function initTest() {
    if (testStarted) return;
    testStarted = true;
    
    const { questions = [] } = await fetchQuestions();
    selectedQuestions = getRandomQuestions(questions);
    currentQuestionIndex = 0;
    userAnswers = {};
    
    // Clear previous timer if exists
    const timerElement = document.getElementById('timer');
    timerElement.innerHTML = '';
    
    // Show test section
    document.getElementById('instruction-section').style.display = 'none';
    document.getElementById('result-section').style.display = 'none';
    document.getElementById('test-section').style.display = 'block';
    
    // Start timer (2 hours = 7200 seconds)
    timerInterval = startTimer(1204, timerElement);
    displayCurrentQuestion();
}

// Event listeners for test flow
mockTestButton.addEventListener('click', function() {
    clearContent();
    instructionSection.style.display = 'block';
});

const consentCheckbox = document.getElementById('consentCheckbox');
const startTestBtn = document.getElementById('startTestBtn');
consentCheckbox.addEventListener('change', function() {
    startTestBtn.disabled = !consentCheckbox.checked;
});

startTestBtn.addEventListener('click', initTest);