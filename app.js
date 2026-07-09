let discoveries =
JSON.parse(localStorage.getItem("discoveries")) || [];

let originalNotes = "";

/* -------------------- */
/* AI CLEAN NOTES */
/* -------------------- */

function cleanNotes() {

    const notesBox =
        document.getElementById("notes");

    if (!notesBox) return;

    const notes =
        notesBox.value.trim();

    if (!notes) {
        alert("Enter notes first");
        return;
    }

    originalNotes = notes;

    const lines =
        notes
            .split(/\n+/)
            .filter(line => line.trim());

    let output = `
Issue Investigation

Issue Summary:
${lines[0]}

Troubleshooting Steps:
`;

    lines.forEach((line, index) => {
        output += `${index + 1}. ${line}\n`;
    });

    output += `

Resolution:
Issue resolved after troubleshooting.

Verification:
✅ Tested successfully
✅ User confirmed functionality

Suggested Checks:
• Verify permissions
• Verify MFA
• Check account lockouts
• Review logs
`;

    notesBox.value = output;
}

/* -------------------- */
/* UNDO */
/* -------------------- */

function undoCleanNotes() {

    const notesBox =
        document.getElementById("notes");

    if (notesBox) {
        notesBox.value = originalNotes;
    }
}

/* -------------------- */
/* SAVE */
/* -------------------- */

function saveDiscovery() {

    const title =
        document.getElementById("title").value;

    const category =
        document.getElementById("category").value;

    const tags =
        document.getElementById("tags").value;

    const notes =
        document.getElementById("notes").value;

    if (!title || !notes) {

        alert("Title and Notes required");

        return;
    }

    discoveries.push({

        id: Date.now(),

        title,
        category,
        tags,
        notes,

        rating: 0,

        date:
        new Date().toLocaleDateString()

    });

    localStorage.setItem(
        "discoveries",
        JSON.stringify(discoveries)
    );

    alert("Discovery Saved!");

    location.reload();
}

/* -------------------- */
/* SEARCH */
/* -------------------- */

function searchKnowledge() {

    const search =
        document.getElementById("search")
        ?.value.toLowerCase() || "";

    const category =
        document.getElementById("filter")
        ?.value || "";

    const filtered =
        discoveries.filter(item => {

            const searchable = `
            ${item.title}
            ${item.notes}
            ${item.tags}
            ${item.category}
            `.toLowerCase();

            return searchable.includes(search) &&
                (
                    category === "" ||
                    item.category === category
                );

        });

    displayKnowledge(filtered);
}

/* -------------------- */
/* DISPLAY */
/* -------------------- */

function displayKnowledge(data) {

    const area =
        document.getElementById("results");

    if (!area) return;

    area.innerHTML = "";

    data.forEach(item => {

        area.innerHTML += `

        <div class="discovery">

            <h2>${item.title}</h2>

            <p><b>Category:</b> ${item.category}</p>

            <p><b>Tags:</b> ${item.tags}</p>

            <p><b>Date:</b> ${item.date}</p>

            <p><b>Helpful Votes:</b> ${item.rating || 0}</p>

            <button onclick="openTicket(${item.id})">
                🔍 View Ticket
            </button>

            <button onclick="voteTicket(${item.id})">
                👍 Helpful
            </button>

        </div>

        `;
    });
}

/* -------------------- */
/* OPEN TICKET */
/* -------------------- */

function openTicket(id) {

    const ticket =
        discoveries.find(
            x => x.id === id
        );

    localStorage.setItem(
        "selectedTicket",
        JSON.stringify(ticket)
    );

    window.location.href =
        "ticket.html";
}

/* -------------------- */
/* HELPFUL */
/* -------------------- */

function voteTicket(id) {

    const ticket =
        discoveries.find(
            x => x.id === id
        );

    if (!ticket) return;

    ticket.rating++;

    localStorage.setItem(
        "discoveries",
        JSON.stringify(discoveries)
    );

    location.reload();
}

/* -------------------- */
/* LOAD TICKET */
/* -------------------- */

function loadTicket() {

    const ticket =
        JSON.parse(
            localStorage.getItem(
                "selectedTicket"
            )
        );

    if (!ticket) return;

    document.getElementById(
        "ticketTitle"
    ).innerText =
        ticket.title;

    document.getElementById(
        "ticketDetails"
    ).innerHTML = `

    <p><b>Category:</b> ${ticket.category}</p>

    <p><b>Tags:</b> ${ticket.tags}</p>

    <p><b>Date:</b> ${ticket.date}</p>

    <p><b>Helpful Votes:</b> ${ticket.rating}</p>

    <h3>Resolution Notes</h3>

    <pre>${ticket.notes}</pre>

    `;

    const related =
        discoveries.filter(
            x =>
            x.id !== ticket.id &&
            x.category === ticket.category
