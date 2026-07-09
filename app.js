let discoveries =
JSON.parse(localStorage.getItem("discoveries")) || [];

let originalNotes = "";

/* ------------------------------
   Better AI Cleanup
--------------------------------*/
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

    let lines =
        notes
            .split(/\n+/)
            .filter(x => x.trim());

    let cleaned = `
Issue Investigation

Issue Summary:
${lines[0]}

Troubleshooting:
`;

    lines.forEach((line, index) => {

        cleaned +=
            `${index + 1}. ${line.trim()}\n`;

    });

    cleaned += `

Resolution:
Issue resolved after troubleshooting steps.

Verification:
✅ User confirmed functionality.
✅ Service tested successfully.

Recommended Checks:
• Verify permissions
• Verify MFA
• Check account status
• Review recent changes
`;

    notesBox.value = cleaned;
}

/* ------------------------------
   Undo Cleanup
--------------------------------*/
function undoCleanNotes() {

    const notesBox =
        document.getElementById("notes");

    if (notesBox) {
        notesBox.value = originalNotes;
    }
}

/* ------------------------------
   Save Discovery
--------------------------------*/
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

    alert("Discovery Saved");

    location.reload();
}

/* ------------------------------
   Search
--------------------------------*/
function searchKnowledge() {

    const search =
        document.getElementById("search")
            ?.value.toLowerCase() || "";

    const category =
        document.getElementById("filter")
            ?.value || "";

    const filtered =
        discoveries.filter(item => {

            const searchable =
                `
                ${item.title}
                ${item.notes}
                ${item.tags}
                ${item.category}
                `.toLowerCase();

            return searchable.includes(search) &&
                (category === "" ||
                    category === item.category);

        });

    displayKnowledge(filtered);
}

/* ------------------------------
   Open Ticket Page
--------------------------------*/
function openTicket(id) {

    const ticket =
        discoveries.find(x => x.id === id);

    localStorage.setItem(
        "selectedTicket",
        JSON.stringify(ticket)
    );

    window.location.href =
        "ticket.html";
}

/* ------------------------------
   Voting
--------------------------------*/
function voteTicket(id) {

    const ticket =
        discoveries.find(x => x.id === id);

    if (!ticket) return;

    ticket.rating++;

    localStorage.setItem(
        "discoveries",
        JSON.stringify(discoveries)
    );

    displayKnowledge(discoveries);
}

/* ------------------------------
   Display Knowledge
--------------------------------*/
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

            <p>👍 ${item.rating || 0}</p>

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

/* ------------------------------
   Ticket Page
--------------------------------*/
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
        "ticketContent"
    ).innerHTML = `

        <p><b>Category:</b> ${ticket.category}</p>

        <p><b>Tags:</b> ${ticket.tags}</p>

        <p><b>Date:</b> ${ticket.date}</p>

        <h3>Resolution Notes</h3>

        <pre>${ticket.notes}</pre>
    `;

    const related =
        discoveries.filter(x =>
            x.id !== ticket.id &&
            x.category === ticket.category
        );

    const relatedArea =
        document.getElementById("related");

    if (relatedArea) {

        relatedArea.innerHTML =
            "<h3>Related Tickets</h3>";

        related.forEach(item => {

            relatedArea.innerHTML += `
                <p>${item.title}</p>
            `;
        });
    }
}

/* ------------------------------
   Dashboard
--------------------------------*/
function loadDashboard() {

    const total =
        document.getElementById(
            "totalDiscoveries"
        );

    if (!total) return;

    total.innerText =
        discoveries.length;

    const categories =
        new Set(
            discoveries.map(
                x => x.category
            )
        );

    document.getElementById(
        "categoryCount"
    ).innerText =
        categories.size;

    const topTicket =
        discoveries.sort(
            (a, b) =>
                (b.rating || 0) -
                (a.rating || 0)
        )[0];

    document.getElementById(
        "topArticle"
    ).innerText =
        topTicket
            ? topTicket.title
            : "None";
}

displayKnowledge(discoveries);
loadDashboard();
