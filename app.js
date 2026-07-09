let notes = JSON.parse(localStorage.getItem("jungleNotes")) || [];

function displayNotes(list = notes) {

    let container =
        document.getElementById("notesContainer");

    container.innerHTML = "";

    list.forEach(note => {

        container.innerHTML += `
            <div class="note-card">
                <h3>${note.title}</h3>
                <div class="category">
                    ${note.category}
                </div>
                <p>${note.content}</p>
            </div>
        `;
    });
}

function saveNote() {

    let title =
        document.getElementById("title").value;

    let category =
        document.getElementById("category").value;

    let content =
        document.getElementById("notes").value;

    if(!title || !content){
        alert("Please complete all fields.");
        return;
    }

    notes.push({
        title,
        category,
        content
    });

    localStorage.setItem(
        "jungleNotes",
        JSON.stringify(notes)
    );

    displayNotes();

    document.getElementById("title").value = "";
    document.getElementById("notes").value = "";
}

document
.getElementById("searchBox")
.addEventListener("input", function(){

    let value =
        this.value.toLowerCase();

    let filtered =
        notes.filter(n =>
            n.title.toLowerCase().includes(value) ||
            n.content.toLowerCase().includes(value) ||
            n.category.toLowerCase().includes(value)
        );

    displayNotes(filtered);
});

displayNotes();
