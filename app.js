let discoveries =
    JSON.parse(localStorage.getItem("discoveries")) || [];

let originalNotes = "";

/* -------------------- */
/* SMART CLEAN */
/* -------------------- */

function cleanNotes() {

    const notesBox =
        document.getElementById("notes");

    if (!notesBox) return;

    let notes = notesBox.value.trim();

    if (!notes) {
        alert("Enter notes first");
        return;
    }

    originalNotes = notes;

    let lines =
        notes.split(/\n+/)
        .filter(line => line.trim());

    let summary = lines[0];

    let troubleshooting = [];
    let resolution = [];

    lines.forEach(line => {

        const lower =
            line.toLowerCase();

        if (
            lower.includes("fixed") ||
            lower.includes("resolved") ||
            lower.includes("working") ||
            lower.includes("repair") ||
            lower.includes("enabled") ||
            lower.includes("reset")
        ) {
            resolution.push(line);
        } else {
            troubleshooting.push(line);
        }

    });

    notesBox.value =
`Issue Investigation

Issue Summary:
${summary}

Troubleshooting Steps:
${troubleshooting.map((x,i)=>`${i + 1}. ${x}`).join("\n")}

Resolution:
${resolution.length
? resolution.join("\n")
: "Issue resolved after troubleshooting."
}

Verification:
✅ Functionality Tested
✅ User Confirmed Resolution

Suggested Checks:
• Verify permissions
• Validate MFA
• Check account status
• Review logs
`;
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
        document.getElementById("title").value.trim();

    const category =
        document.getElementById("category").value;

    const tags =
        document.getElementById("tags").value.trim();

    const notes =
        document.getElementById("notes").value.trim();

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
        date: new Date().toLocaleDateString()
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

            const searchable =
                `
                ${item.title}
                ${item.notes}
                ${item.tags}
                ${item.category}
                `.toLowerCase();

            return searchable.includes(search)
                &&
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

            <p><b>Helpful Votes:</b> ${item.rating}</p>

            <button onclick="openTicket(${item.id})">
                🔍 View Ticket
            </button>

            <button onclick="voteTicket(${item.id})">
                👍 Helpful
            </button>

            <button onclick="deleteTicket(${item.id})">
                🗑 Delete
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
        discoveries.find(x => x.id === id);

    localStorage.setItem(
        "selectedTicket",
        JSON.stringify(ticket)
    );

    window.location.href = "ticket.html";
}

/* -------------------- */
/* VOTE */
/* -------------------- */

function voteTicket(id) {

    const ticket =
        discoveries.find(x => x.id === id);

    if (!ticket) return;

    ticket.rating++;

    localStorage.setItem(
        "discoveries",
        JSON.stringify(discoveries)
    );

    searchKnowledge();
}

/* -------------------- */
/* DELETE */
/* -------------------- */

function deleteTicket(id) {

    discoveries =
        discoveries.filter(
            x => x.id !== id
        );

    localStorage.setItem(
        "discoveries",
        JSON.stringify(discoveries)
    );

    searchKnowledge();
}

/* -------------------- */
/* EXPORT */

