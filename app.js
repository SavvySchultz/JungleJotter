/* ==========================================
   JUNGLE JOTTER PRO
========================================== */

let discoveries =
    JSON.parse(
        localStorage.getItem("discoveries")
    ) || [];

let originalNotes = "";

/* ==========================================
   SMART AI CLEAN
========================================== */

function smartClean() {

    const notesBox =
        document.getElementById("notes");

    if (!notesBox) return;

    const raw =
        notesBox.value.trim();

    if (!raw) {

        alert("Enter notes first.");

        return;
    }

    originalNotes = raw;

    const lines =
        raw
        .split(/\n+/)
        .map(line => line.trim())
        .filter(Boolean);

    let issueSummary =
        lines[0] || "Issue Reported";

    let troubleshooting = [];
    let resolution = [];
    let verification = [];

    lines.forEach(line => {

        const lower =
            line.toLowerCase();

        if (
            lower.includes("fixed") ||
            lower.includes("resolved") ||
            lower.includes("working") ||
            lower.includes("repair") ||
            lower.includes("reinstalled") ||
            lower.includes("reset") ||
            lower.includes("enabled")
        ) {

            resolution.push(line);
        }

        else if (

            lower.includes("confirmed") ||
            lower.includes("verified") ||
            lower.includes("tested")

        ) {

            verification.push(line);
        }

        else {

            troubleshooting.push(line);
        }

    });

    notesBox.value =

`Issue Investigation

Issue Summary:
${issueSummary}

Symptoms:
${issueSummary}

Troubleshooting Steps:

${troubleshooting.map(
(step,index)=>
`${index + 1}. ${step}`
).join("\n")}

Resolution:

${resolution.length
? resolution.join("\n")
: "Issue resolved after troubleshooting."
}

Verification:

${verification.length
? verification.join("\n")
: "User confirmed functionality."
}

Suggested Checks:

• Verify permissions
• Verify MFA
• Review logs
• Verify licensing
• Check account status
`;

}

/* ==========================================
   UNDO SMART CLEAN
========================================== */

function undoSmartClean() {

    const notesBox =
        document.getElementById("notes");

    if (
        notesBox &&
        originalNotes
    ) {

        notesBox.value =
            originalNotes;
    }

}

/* ==========================================
   AUTO TAGS
========================================== */

function generateTags(text) {

    const tags = [];

    const lower =
        text.toLowerCase();

    if (lower.includes("outlook"))
        tags.push("Outlook");

    if (lower.includes("teams"))
        tags.push("Teams");

    if (lower.includes("vpn"))
        tags.push("VPN");

    if (lower.includes("mfa"))
        tags.push("MFA");

    if (lower.includes("sharepoint"))
        tags.push("SharePoint");

    if (lower.includes("onedrive"))
        tags.push("OneDrive");

    if (lower.includes("password"))
        tags.push("Password");

    if (lower.includes("license"))
        tags.push("Licensing");

    return tags.join(", ");
}

/* ==========================================
   SAVE DISCOVERY
========================================== */

function saveDiscovery() {

    const title =
        document.getElementById("title")
        .value.trim();

    const category =
        document.getElementById("category")
        .value;

    let tags =
        document.getElementById("tags")
        .value.trim();

    const notes =
        document.getElementById("notes")
        .value.trim();

    if (!title || !notes) {

        alert(
            "Title and Notes are required."
        );

        return;
    }

    const duplicate =
        discoveries.find(
            x =>
            x.title.toLowerCase() ===
            title.toLowerCase()
        );

    if (duplicate) {

        if (
            !confirm(
                "Similar discovery exists. Save anyway?"
            )
        ) {

            return;
        }
    }

    if (!tags) {

        tags =
            generateTags(notes);
    }

    const record = {

        id: Date.now(),

        title,

        category,

        tags,

        notes,

        favorite: false,

        rating: 0,

        created:
            new Date()
            .toLocaleString()

    };

    discoveries.push(record);

    localStorage.setItem(
        "discoveries",
        JSON.stringify(discoveries)
    );

    alert(
        "Discovery Saved Successfully!"
    );

    document.getElementById("title")
        .value = "";

    document.getElementById("tags")
        .value = "";

    document.getElementById("notes")
        .value = "";
}

/* ==========================================
   SEARCH KNOWLEDGE
========================================== */

function searchKnowledge() {

    discoveries =
        JSON.parse(
            localStorage.getItem(
                "discoveries"
            )
        ) || [];

    const search =
        document
        .getElementById("search")
        ?.value
        .toLowerCase() || "";

    const category =
        document
        .getElementById("filter")
        ?.value || "";

    const filtered =
        discoveries.filter(item => {

            const searchable =

                (
                    item.title +
                    " " +
                    item.notes +
                    " " +
                    item.tags +
                    " " +
                    item.category
                ).toLowerCase();

            const matchSearch =
                searchable.includes(search);

            const matchCategory =
                category === "" ||
                item.category === category;

            return (
                matchSearch &&
                matchCategory
            );

        });

    displayKnowledge(filtered);

}

/* ==========================================
   DISPLAY KNOWLEDGE
========================================== */

function displayKnowledge(data) {

    const results =
        document.getElementById("results");

    if (!results) return;

    results.innerHTML = "";

    if (data.length === 0) {

        results.innerHTML =

        `
        <div class="card">
            <h2>No Discoveries Found</h2>
        </div>
        `;

        return;
    }

    data.forEach(item => {

        results.innerHTML +=

        `
        <div class="discovery">

            <h2>${item.title}</h2>

            <p>
                <strong>Category:</strong>
                ${item.category}
            </p>

            <p>
                <strong>Tags:</strong>
                ${item.tags}
            </p>

            <p>
                <strong>Helpful Votes:</strong>
                ${item.rating}
            </p>

            <p>
                <strong>Created:</strong>
                ${item.created}
            </p>

            <div class="button-row">

                <button
                    onclick="openTicket(${item.id})">
                    🔍 View
                </button>

                <button
                    onclick="voteTicket(${item.id})">
                    👍 Helpful
                </button>

                <button
                    onclick="toggleFavorite(${item.id})">

                    ${item.favorite
                        ? "⭐ Saved"
                        : "☆ Favorite"}

                </button>

                <button
                    onclick="deleteTicket(${item.id})">

                    🗑 Delete

                </button>

            </div>

        </div>
        `;
    });

}

/* ==========================================
   FAVORITES
========================================== */

function toggleFavorite(id) {

    discoveries.forEach(item => {

        if (item.id === id) {

            item.favorite =
                !item.favorite;
        }

    });

    localStorage.setItem(
        "discoveries",
        JSON.stringify(discoveries)
    );

    searchKnowledge();

}

/* ==========================================
   HELPFUL VOTE
========================================== */

function voteTicket(id) {

    discoveries.forEach(item => {

        if (item.id === id) {

            item.rating++;
        }

    });

    localStorage.setItem(
        "discoveries",
        JSON.stringify(discoveries)
    );

    searchKnowledge();

}

/* ==========================================
   DELETE
========================================== */

function deleteTicket(id) {

    const answer =
        confirm(
            "Delete this discovery?"
        );

    if (!answer) return;

    discoveries =
        discoveries.filter(
            item =>
            item.id !== id
        );

    localStorage.setItem(
        "discoveries",
        JSON.stringify(discoveries)
    );

    searchKnowledge();

}

/* ==========================================
   OPEN TICKET
========================================== */

function openTicket(id) {

    const ticket =
        discoveries.find(
            x => x.id === id
        );

    if (!ticket) return;

    localStorage.setItem(
        "selectedTicket",
        JSON.stringify(ticket)
    );

    window.location.href =
        "ticket.html";
}

/* ==========================================
   EXPORT
========================================== */

function exportKnowledge() {

    const blob
