let articles = JSON.parse(
    localStorage.getItem("jungleJotter")
) || [

    {
        title: "Reset MFA",
        category: "Microsoft 365",
        steps: [
            "Open Entra Admin Center",
            "Select Users",
            "Choose the User",
            "Require Re-register MFA",
            "Have user sign in again"
        ]
    },

    {
        title: "Create Shared Mailbox",
        category: "Exchange Online",
        steps: [
            "Open Exchange Admin Center",
            "Navigate to Recipients",
            "Select Shared Mailboxes",
            "Click Add Shared Mailbox",
            "Assign Permissions"
        ]
    },

    {
        title: "VPN Troubleshooting",
        category: "Networking",
        steps: [
            "Verify Internet Access",
            "Confirm VPN Credentials",
            "Test VPN Client",
            "Reinstall VPN if needed"
        ]
    }
];

function saveData() {
    localStorage.setItem(
        "jungleJotter",
        JSON.stringify(articles)
    );
}

function renderArticles(data) {

    const results =
        document.getElementById("results");

    results.innerHTML = "";

    if (data.length === 0) {

        results.innerHTML = `
            <div class="empty">
                No discoveries found in this part of the jungle.
            </div>
        `;

        return;
    }

    data.forEach(article => {

        const div =
            document.createElement("div");

        div.classList.add("card");

        div.innerHTML = `
            <h3>🌴 ${article.title}</h3>

            <div class="badge">
                ${article.category}
            </div>

            <ul>
                ${article.steps
                    .map(step => `<li>${step}</li>`)
                    .join("")}
            </ul>
        `;

        results.appendChild(div);

    });

}

function addArticle() {

    const title =
        document.getElementById("title")
        .value.trim();

    const category =
        document.getElementById("category")
        .value.trim();

    const steps =
        document.getElementById("steps")
        .value.trim();

    if (!title || !category || !steps) {

        alert("Please complete all fields.");
        return;
    }

    articles.unshift({
        title: title,
        category: category,
        steps: steps
            .split("\n")
            .filter(step => step.trim() !== "")
    });

    saveData();

    renderArticles(articles);

    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("steps").value = "";

    alert("🌿 Discovery Saved!");
}

document
    .getElementById("searchInput")
    .addEventListener("input", function () {

        const search =
            this.value.toLowerCase();

        const filtered =
            articles.filter(article => {

                return (
                    article.title
                        .toLowerCase()
                        .includes(search)

                    ||

                    article.category
                        .toLowerCase()
                        .includes(search)

                    ||

                    article.steps
                        .join(" ")
                        .toLowerCase()
                        .includes(search)
                );

            });

        renderArticles(filtered);

    });

renderArticles(articles);
