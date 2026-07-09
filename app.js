let articles = JSON.parse(localStorage.getItem("jungleJotter")) || [

    {
        title: "Reset MFA",
        category: "Microsoft 365",
        steps: [
            "Open Microsoft Entra Admin Center",
            "Select Users",
            "Choose User",
            "Require Re-register MFA",
            "Have user sign in again"
        ]
    },

    {
        title: "Create Shared Mailbox",
        category: "Exchange Online",
        steps: [
            "Open Exchange Admin Center",
            "Recipients",
            "Shared Mailboxes",
            "Add Shared Mailbox",
            "Assign permissions"
        ]
    },

    {
        title: "Map Network Printer",
        category: "Printers",
        steps: [
            "Open Print Management",
            "Add Printer",
            "Enter printer path",
            "Install drivers",
            "Print test page"
        ]
    }

];

function saveArticles() {

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

        results.innerHTML =
        `
        <div class="card">
            <h3>No discoveries found.</h3>
        </div>
        `;

        return;
    }

    list.forEach(article => {

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>🌴 ${article.title}</h3>

            <div class="category">
                ${article.category}
            </div>

            <ul>
                ${article.steps
                    .map(step => `<li>${step}</li>`)
                    .join("")}
            </ul>
        `;

        results.appendChild(card);

    });

}

function addArticle() {

    const title =
        document.getElementById("title")
        .value
        .trim();

    const category =
        document.getElementById("category")
        .value
        .trim();

    const stepsText =
        document.getElementById("steps")
        .value
        .trim();

    if (!title || !category || !stepsText) {

        alert(
            "Please complete all fields."
        );

        return;
    }

    const steps =
        stepsText
            .split("\n")
            .filter(step => step.trim() !== "");

    articles.unshift({
        title,
        category,
        steps
    });

    saveArticles();

    renderArticles(articles);

    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("steps").value = "";

    alert("🌿 Discovery Saved!");
}

document
    .getElementById("searchInput")
    .addEventListener("input", function() {

        const term =
            this.value.toLowerCase();

        const filtered =
            articles.filter(article =>

                article.title
                    .toLowerCase()
                    .includes(term)

                ||

                article.category
                    .toLowerCase()
                    .includes(term)

                ||

                article.steps
                    .join(" ")
                    .toLowerCase()
                    .includes(term)
            );

        renderArticles(filtered);

    });

renderArticles(articles);
