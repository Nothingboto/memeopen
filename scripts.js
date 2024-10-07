function showLogin() {
    document.getElementById('login-modal').style.display = 'block';
}

function showSignUp() {
    document.getElementById('signup-modal').style.display = 'block';
}

function showUpload() {
    document.getElementById('upload-modal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    // Implement login logic here

    closeModal('login-modal');
}

function signUp() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    // Implement sign-up logic here

    closeModal('signup-modal');
}

function uploadMeme() {
    const file = document.getElementById('meme-file').files[0];
    const title = document.getElementById('meme-title').value;
    const allowComments = document.getElementById('allow-comments').value;

    // Implement meme upload logic here

    closeModal('upload-modal');
}

function searchMemes() {
    const query = document.getElementById('search').value;

    // Implement search logic here
}
