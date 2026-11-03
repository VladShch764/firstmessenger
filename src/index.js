import './index.css';
const STORAGE_KEY = 'messages';

            const form = document.querySelector('form');
            const input = document.querySelector('.form-input');
            const history = document.querySelector('.history');
            const clearBtn = document.querySelector('.clear-btn');
            

function loadMessages() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveMessages(messages) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-50)));
}

function handleSubmit(event) {
    event.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    const messages = loadMessages();
    messages.push(text);
    saveMessages(messages);

    input.value = '';
    renderMessages();
}

function renderMessages() {
    history.innerText = '';
    loadMessages().forEach((text) => {
        const div = document.createElement('div');
        div.className = 'historymsg';
        div.innerText = text;
        history.appendChild(div);
    });
}

form.addEventListener('submit', handleSubmit);
renderMessages();

clearBtn.addEventListener('click', () => {
    if (confirm('Удалить всю историю?'))
    localStorage.removeItem(STORAGE_KEY);
    renderMessages(); 
});