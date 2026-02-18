const API_URL = '/api';

async function fetchTexts() {
    const response = await fetch(`${API_URL}/all`);
    const texts = await response.json();
    const list = document.getElementById('textList');
    list.innerHTML = '';
    texts.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.content}
            <button class="delete-btn" onclick="deleteText(${item.id})">Delete</button>
        `;
        list.appendChild(li);
    });
}

async function addText() {
    const input = document.getElementById('textInput');
    const content = input.value;
    if (!content) return;

    await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
    });
    input.value = '';
    fetchTexts();
}

async function deleteText(id) {
    await fetch(`${API_URL}/delete/${id}`, {
        method: 'DELETE'
    });
    fetchTexts();
}

fetchTexts();
