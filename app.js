/* =====================================
   JUNGLE JOTTER
===================================== */

let discoveries =
    JSON.parse(
        localStorage.getItem("discoveries")
    ) || [];

let originalNotes = "";

/* =====================================
   SMART CLEAN
===================================== */

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

    let issueSummary =
        lines[0] || "";

    let troubleshooting = [];
    let resolution = [];

    lines.forEach(line => {

        let lower =
            line.toLowerCase();

        if (
            lower.includes("fixed") ||
            lower.includes("resolved") ||
            lower.includes("working") ||
            lower.includes("reset") ||
            lower.includes("enabled") ||
            lower.includes("removed") ||
            lower.includes("installed")
        ) {
            resolution.push(line);
        }
        else {
            troubleshooting.push(line);
        }

    });

    notesBox.value =

`Issue Investigation

Issue Summary:
${issueSummary}

Troubleshooting Steps:

${troubleshooting.map(
    (step,index)=>
    `${index+1}. ${step}`
).join("\n")}

Resolution:

${resolution.length
? resolution.join("\n")
: "Issue resolved after troubleshooting."
}

Verification:
✅ Tested successfully
✅ User confirmed functionality

Suggested Checks:
• Verify permissions
• Verify MFA
• Check account lockouts
• Review logs
`;
}

/* =====================================
   UNDO
===================================== */

function undoCleanNotes() {

    const notesBox =
        document.getElementById("notes");

    if(notesBox){

        notesBox.value =
            originalNotes;
    }
}

/* =====================================
   SAVE DISCOVERY
===================================== */

function saveDiscovery() {

    const title =
        document.getElementById("title").value.trim();

    const category =
        document.getElementById("category").value;

    const tags =
        document.getElementById("tags").value.trim();

    const notes =
        document.getElementById("notes").value.trim();

    if(!title || !notes){

        alert(
            "Title and Notes are required."
        );

        return;
    }

    const newDiscovery = {

        id: Date.now(),

        title: title,

        category: category,

        tags: tags,

        notes: notes,

        rating: 0,

        date:
            new Date()
            .toLocaleDateString()

    };

    discoveries.push(
        newDiscovery
    );

    localStorage.setItem(
        "discoveries",
        JSON.stringify(discoveries)
    );

    alert(
        "Discovery Saved Successfully!"
    );

    document.getElementById(
        "title"
    ).value = "";

    document.getElementById(
        "tags"
    ).value = "";

    document.getElementById(
        "notes"
    ).value = "";
}

/* =====================================
   KNOWLEDGE SEARCH
===================================== */

function searchKnowledge() {

    const searchBox =
        document.getElementById(
            "search"
        );

    const filterBox =
        document.getElementById(
            "filter"
        );

    const search =
        searchBox
        ? searchBox.value.toLowerCase()
        : "";

    const category =
        filterBox
        ? filterBox.value
        : "";

    const filtered =
        discoveries.filter(item => {

            const text =
                (
                    item.title +
                    " " +
                    item.notes +
                    " " +
                    item.tags +
                    " " +
                    item.category
                )
                .toLowerCase();

            const matchSearch =
                text.includes(search);

            const matchCategory =
                category === "" ||
                item.category === category;

            return (
                matchSearch &&
                matchCategory
            );
        });

    displayKnowledge(
        filtered
    );
}

/* =====================================
   DISPLAY KNOWLEDGE
===================================== */

function displayKnowledge(data) {

    const area =
        document.getElementById(


