import './index.css';
const STORAGE_KEY = 'messages';

            const form = document.querySelector('form');
            const texteria = document.querySelector('.texteria');
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

function renderText(container, text) {
    container.innerHTML = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
}

function handleSubmit(event) {
    event.preventDefault();

    const text = texteria.value.trim();
    if (!text) return;

    const messages = loadMessages();
    messages.push(text);
    saveMessages(messages);

    texteria.value = '';
    renderMessages();
}

function renderMessages() {
    history.innerText = '';
    loadMessages().forEach((text) => {
        const div = document.createElement('div');
        div.className = 'historymsg';
        renderText(div, text);
        history.appendChild(div);
    });
}

texteria.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        const start = texteria.selectionStart;
        const end = texteria.selectionEnd;
        texteria.value = texteria.value.slice(0, start) + '\n' + texteria.value.slice(end);
        texteria.selectionStart = texteria.selectionEnd = start + 1;
        return;
    }
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        form.requestSubmit();
    }
});


form.addEventListener('submit', handleSubmit);
renderMessages();

clearBtn.addEventListener('click', () => {
    if (confirm('Удалить всю историю?'))
    localStorage.removeItem(STORAGE_KEY);
    renderMessages(); 
});