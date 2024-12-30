// Elements
const loginLink = document.getElementById("login-link");
const signupLink = document.getElementById("signup-link");
const profileLink = document.getElementById("profile-link");
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const createGameForm = document.getElementById("create-game-form");
const navbar = document.getElementById("navbar");
const gameList = document.getElementById("games");

let currentUser = null; // Placeholder for current user

// Show and hide modals
function toggleModal(modal) {
    modal.classList.toggle("hidden");
}

loginLink.addEventListener("click", () => toggleModal(loginForm));
signupLink.addEventListener("click", () => toggleModal(signupForm));

const showLogin = document.getElementById("show-login");
const showSignup = document.getElementById("show-signup");

showLogin.addEventListener("click", () => {
    toggleModal(signupForm);
    toggleModal(loginForm);
});

showSignup.addEventListener("click", () => {
    toggleModal(loginForm);
    toggleModal(signupForm);
});

// Handle signup
const signup = document.getElementById("signup");
signup.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    // Here you would call your backend to register the user
    currentUser = { username }; // Placeholder user
    updateNavbar();
    toggleModal(signupForm);
});

// Handle login
const login = document.getElementById("login");
login.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    // Here you would call your backend to authenticate the user
    currentUser = { username }; // Placeholder user
    updateNavbar();
    toggleModal(loginForm);
});

// Update navbar based on user state
function updateNavbar() {
    if (currentUser) {
        profileLink.classList.remove("hidden");
        loginLink.classList.add("hidden");
        signupLink.classList.add("hidden");
        profileLink.textContent = `${currentUser.username}'s Profile`;
    } else {
        profileLink.classList.add("hidden");
        loginLink.classList.remove("hidden");
        signupLink.classList.remove("hidden");
    }
}

// Handle game creation
const createGame = document.getElementById("create-game-form-content");
createGame.addEventListener("submit", (e) => {
    e.preventDefault();
    const gameName = document.getElementById("game-name").value;
    const playerCount = document.getElementById("player-count").value;
    // Here you would call your backend to create the game
    const game = { gameName, playerCount };
    addGameToList(game);
    toggleModal(createGameForm);
});

// Add new game to the list
function addGameToList(game) {
    const li = document.createElement("li");
    li.textContent = `${game.gameName} with ${game.playerCount} players`;
    gameList.appendChild(li);
}

// Game creation link
const createGameLink = document.getElementById("create-game");
createGameLink.addEventListener("click", () => toggleModal(createGameForm));
