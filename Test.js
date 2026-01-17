const titleArea = document.getElementById('titleArea');
const textArea = document.getElementById('textArea');
const saveButton = document.getElementById('saveButton');
const clearButton = document.getElementById('clearButton');
const notesList = document.getElementById('notesList');

// Load notes when page opens
let notes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
renderNotes();

function saveNote() {
    const title = titleArea.value.trim();
    const content = textArea.value.trim();

    if (!title && !content) {
        alert('Please write something first!');
        return;
    }

    notes.push({
        id: Date.now(),
        title: title || '(No title)',
        content: content,
        date: new Date().toLocaleString()
    });

    localStorage.setItem('savedNotes', JSON.stringify(notes));
    renderNotes();
    clearForm();
}

function deleteNote(id) {
    if (confirm('Delete this note?')) {
        notes = notes.filter(note => note.id !== id);
        localStorage.setItem('savedNotes', JSON.stringify(notes));
        renderNotes();
    }
}

function clearForm() {
    titleArea.value = '';
    textArea.value = '';
}

function renderNotes() {
    notesList.innerHTML = '';

    if (notes.length === 0) {
        notesList.innerHTML = `
            <div class="empty-message">
                No notes saved yet...<br>
                Create your first note!
            </div>`;
        return;
    }

    notes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note-item';

        noteDiv.innerHTML = `
            <button class="delete-btn" onclick="deleteNote(${note.id})">×</button>
            <h3>${note.title}</h3>
            <div class="note-content">${note.content.replace(/\n/g, '<br>')}</div>
            <small style="color:#777; margin-top:8px; display:block;">
                ${note.date}
            </small>
        `;

        notesList.appendChild(noteDiv);
    });
}

// Event listeners
saveButton.addEventListener('click', saveNote);

clearButton.addEventListener('click', () => {
    if (titleArea.value.trim() || textArea.value.trim()) {
        if (confirm('Clear current note?')) {
            clearForm();
        }
    } else {
        alert('Nothing to clear in the form!');
    }
});

// Optional: Ctrl/Cmd + Enter to save
textArea.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        saveNote();
    }
});