let articles = JSON.parse(
    localStorage.getItem("jungleJotter")
) || [

    {
        title: "Reset MFA",
        category: "Microsoft 365",
        steps: [
            "Open Entra Admin Center",
            "Select Users",
            "Select User",
            "Require Re-register MFA",
            "Have user sign in again"
        ]
    },

    {
        title: "Create Shared Mailbox",
        category: "Exchange",
        steps: [
            "Open Exchange Admin Center",
            "Navigate to Recipients",
            "Select Shared Mailboxes",
            "Create Mailbox",
            "Assign Permissions"
        ]
    },

    {
        title: "Map Network Printer",
        category: "Printer",
        steps: [
            "Open Print Management",
            "Add Printer",
            "Install Drivers",
            "Print Test Page"
        ]
    }
];

function saveData() {
    localStorage.setItem(
        "jungleJotter",
        JSON.stringify(articles)
    );
}

function renderArticles(list) {

    const results =
        document.getElementById("results");

    results.innerHTML = "";

    if (list.length === 0) {

        results.innerHTML = `
            <div class="no-results">
                No discoveries found in this part of the jungle.
            </div>
        `;

        return;
    }

    list.forEach(article => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${article.title}</h3>

            <div class="badge">
                ${article.category}
            </div>

            <ul>
                ${article.steps.map(
                    step => `<li>${step}</li>`
                ).join("")}
            </ul>
        `;

        results.appendChild(card);
    });
}

function addArticle() {

    const title =
        document.getElementById("title").value.trim();

    const category =
        document.getElementById("category").value.trim();

    const stepsText =
        document.getElementById("steps").value.trim();

    if (!title || !category || !stepsText) {
        alert("Please complete all fields.");
        return;
    }

    articles.unshift({
        title,
        category,
        steps: stepsText
            .split("\n")
            .filter(step => step.trim() !== "")
    });

    saveData();

    renderArticles(articles);

    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("steps").value = "";
}

document
    .getElementById("searchInput")
    .addEventListener("input", function() {

        const search =
            this.value.toLowerCase();

        const filtered =
            articles.filter(article =>

                article.title.toLowerCase().includes(search) ||
                article.category.toLowerCase().includes(search) ||
                article.steps.join(" ").toLowerCase().includes(search)
            );

        renderArticles(filtered);
    });

renderArticles(articles);
