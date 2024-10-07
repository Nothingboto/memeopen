document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const memePlusBtn = document.getElementById('memePlusBtn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const uploadForm = document.getElementById('uploadForm');
    const feed = document.getElementById('feed');
    const searchBox = document.getElementById('searchBox');
    const searchBtn = document.getElementById('searchBtn');
    const rulesBtn = document.getElementById('rulesBtn');
    const rules = document.getElementById('rules');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const mobileViewBtn = document.getElementById('mobileViewBtn');

    loginBtn.addEventListener('click', () => {
        loginForm.style.display = 'block';
    });

    signupBtn.addEventListener('click', () => {
        signupForm.style.display = 'block';
    });

    memePlusBtn.addEventListener('click', () => {
        uploadForm.style.display = 'block';
    });

    searchBtn.addEventListener('click', () => {
        const query = searchBox.value.toLowerCase();
        displayMemes(query);
    });

    rulesBtn.addEventListener('click', () => {
        rules.style.display = 'block';
    });

    mobileViewBtn.addEventListener('click', () => {
        document.body.classList.toggle('mobile-view');
    });

    document.getElementById('loginSubmit').addEventListener('click', () => {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Simple authentication (for demonstration purposes)
        const user = JSON.parse(localStorage.getItem(username));
        if (user && user.password === password) {
            alert('Login successful');
            if (rememberMe) {
                localStorage.setItem('rememberedUser', username);
            }
            loginForm.style.display = 'none';
            usernameDisplay.textContent = `Logged in as: ${username}`;
            usernameDisplay.style.display = 'block';
        } else {
            alert('Invalid username or password');
        }
    });

    document.getElementById('signupSubmit').addEventListener('click', () => {
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;

        // Simple user registration (for demonstration purposes)
        localStorage.setItem(username, JSON.stringify({ password }));
        alert('Sign up successful');
        signupForm.style.display = 'none';
    });

    document.getElementById('uploadSubmit').addEventListener('click', () => {
        const file = document.getElementById('memeFile').files[0];
        const title = document.getElementById('memeTitle').value;
        const allowComments = document.getElementById('allowComments').value;

        if (file && title) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const meme = {
                    title,
                    allowComments,
                    src: e.target.result,
                    type: file.type.startsWith('video') ? 'video' : 'image'
                };
                const memes = JSON.parse(localStorage.getItem('memes')) || [];
                memes.push(meme);
                localStorage.setItem('memes', JSON.stringify(memes));
                displayMemes();
                uploadForm.style.display = 'none';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a file and enter a title');
        }
    });

    function displayMemes(query = '') {
        feed.innerHTML = '';
        const memes = JSON.parse(localStorage.getItem('memes')) || [];
        memes.forEach(meme => {
            if (meme.title.toLowerCase().includes(query)) {
                const memeElement = document.createElement('div');
                memeElement.className = 'meme';
                memeElement.innerHTML = `
                    <h3>${meme.title}</h3>
                    ${meme.type === 'video' ? `<video src="${meme.src}" controls></video>` : `<img src="${meme.src}" alt="${meme.title}">`}
                    ${meme.allowComments === 'yes' ? '<textarea placeholder="Add a comment..."></textarea><button class="commentBtn">Add Comment</button>' : ''}
                `;
                feed.appendChild(memeElement);
            }
        });
    }

    displayMemes();
});
