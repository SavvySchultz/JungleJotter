/* =====================================
   JUNGLE JOTTER PRO
===================================== */

let discoveries =
    JSON.parse(
        localStorage.getItem(
            "discoveries"
        )
    ) || [];

let originalNotes = "";

/* =====================================
   SMART AI CLEAN
===================================== */

function smartClean() {

    const notesBox =
        document.getElementById("notes");

    if (!notesBox) return;

    const raw =
        notesBox.value.trim();

    if (!raw) {

        alert(
            "Enter notes first."
        );

        return;
    }

    originalNotes = raw;

    let lines =
        raw.split(/\n+/)
            .map(x => x.trim())
            .filter(Boolean);

    let summary =
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
            lower.includes("reset") ||
            lower.includes("enabled") ||
            lower.includes("reinstalled") ||
            lower.includes("repair")
        ) {

            resolution.push(line);

        }

        else if (
            lower.includes("confirmed") ||
            lower.includes("verified")
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
${summary}

Symptoms:
User reported issue related to:
${summary}

Troubleshooting Steps:

${troubleshooting.map(
(index, counter) =>
`${counter + 1}. ${index}`
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

• Review logs
• Validate permissions
• Validate MFA
• Verify licensing
• Check account status
`;
}

/* =====================================
   UNDO
===================================== */

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

/* =====================================
   AUTO TAGS
===================================== */

function generateTags(text) {

    let tags = [];

    let lower =
        text.toLowerCase();

    if (lower.includes("outlook"))
        tags.push("Outlook");

    if (lower.includes("teams"))
        tags.push("Teams");

    if (lower.includes("vpn"))
        tags.push("VPN");

    if (lower.includes("mfa"))
        tags.push("MFA");

    if (lower.includes("password"))
        tags.push("Password");

    if (lower.includes("sharepoint"))
        tags.push("SharePoint");

    if (lower.includes("onedrive"))
        tags.push("OneDrive");

    return tags.join(",");
}

/* =====================================
   SAVE DISCOVERY
===================================== */

function saveDiscovery() {

    const title =
        document.getElementById("title")
        .value.trim();

    const category =
        document.getElementById(
            "category"
        ).value;

    let tags =
        document.getElementById(
            "tags"
        ).value.trim();

    const notes =
        document.getElementById(
            "notes"
        ).value.trim();

    if (
        !title ||
        !notes
    ) {

        alert(
            "Title and notes are required."
        );

        return;
    }

    const duplicate =
        discoveries.find(
            x =>
            x.title.toLowerCase()
            === title.toLowerCase()
        );

    if (duplicate) {

        alert(
            "A similar discovery already exists."
        );

        return;
    }

    if (!tags) {

        tags =
            generateTags(notes);
    }

    const record = {

        id: Date.now(),

        favorite: false,

        rating: 0,

        title,

        category,

        tags,

        notes,

        created:
            new Date()
            .toLocaleString()

    };

    discoveries.push(
        record
    );

    localStorage.setItem(
        "discoveries",
        JSON.stringify(
            discoveries
        )
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
   LOAD PAGE
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        discoveries =
            JSON.parse(
                localStorage.getItem(
                    "discoveries"
                )
            ) || [];

        console.log(
            "Discoveries Loaded:",
            discoveries.length
        );
    }
);

