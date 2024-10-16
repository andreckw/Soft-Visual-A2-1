async function loadBoards() {
    const response = await fetch('/api/boards');
    if (response.ok) {
        const boards = await response.json();
        const boardsDiv = document.getElementById('boards');
        boardsDiv.innerHTML = '';

        boards.forEach(board => {
            const boardElement = document.createElement('div');
            boardElement.className = 'board';
            boardElement.innerHTML = `<strong>${board.name}</strong>`;
            boardElement.onclick = () => loadLists(board.id);
            boardsDiv.appendChild(boardElement);
        });
    }
}

async function createBoard() {
    const name = prompt('Digite o nome do Board:');
    if (!name) return;

    const response = await fetch('/api/boards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });

    if (response.ok) {
        loadBoards();
    }
}

async function loadLists(boardId) {
    document.getElementById('lists-container').style.display = 'block';
    const response = await fetch(`/api/lists?boardId=${boardId}`);
    if (response.ok) {
        const lists = await response.json();
        const listsDiv = document.getElementById('lists');
        listsDiv.innerHTML = '';

        lists.forEach(list => {
            const listElement = document.createElement('div');
            listElement.className = 'list';
            listElement.innerHTML = `<strong>${list.title}</strong>`;
            listElement.onclick = () => loadCards(list.id);
            listsDiv.appendChild(listElement);
        });
    }
}

async function createList() {
    title = document.getElementById('list-title').value;
    boardId = prompt('Digite o ID do Board:');
    if (!title || !boardId) return;

    const response = await fetch('/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, boardId })
    });

    if (response.ok) {
        loadLists(boardId);
    }
}

async function loadCards(listId) {
    document.getElementById('cards-container').style.display = 'block';
    response = await fetch(`/api/cards?listId=${listId}`);
    if (response.ok) {
        const cards = await response.json();
        const cardsDiv = document.getElementById('cards');
        cardsDiv.innerHTML = '';

        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.innerHTML = `<strong>${card.title}</strong>: ${card.description}`;
            cardsDiv.appendChild(cardElement);
        });
    }
}

async function createCard() {
    const title = document.getElementById('card-title').value;
    const description = document.getElementById('card-description').value;
    const listId = prompt('Digite o ID da Lista:');
    if (!title || !description || !listId) return;

    const response = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, listId })
    });

    if (response.ok) {
        loadCards(listId);
    }
}

loadBoards();