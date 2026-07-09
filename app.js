let articles = JSON.parse(
    localStorage.getItem("jungleJotter")
) || [

    {
        title: "Reset MFA",
        category: "Microsoft 365",
        steps: [
            "Open Entra Admin Center",
            "Select the user",
            "Require re-register MFA",
            "Ask user to log back in"
        ]
    },

    {
        title: "Create Shared Mailbox",
        category: "Exchange Online",
        steps: [
            "Open Exchange Admin Center",
            "Go to Recipients",
            "Select Shared Mailboxes",
            "Create mailbox",
            "Assign permissions"
        ]
    }

];

function saveData(){
    localStorage.setItem(
        "jungleJotter",
        JSON.stringify(articles)
    );
}

function renderArticles(list){

    const results =
        document.getElementById("results");

    results.innerHTML = "";

    list.forEach(article => {

        let card =
        `
        <div class="card">
            <h3>${article.title}</h3>

            <div class="category">
                ${article.category}
            </div>

            <ul>
                ${article.steps
                    .map(step => `<li>${step}</li>`)
                    .join("")}
            </ul>
        </div>
        `;

        results.innerHTML += card;
    });
}

function addArticle(){

    const title =
        document.getElementById("title")
        .value
        .trim();

    const category =
        document.getElementById("category")
        .value
        .trim();

    const steps =
        document.getElementById("steps")
        .value
        .trim();

    if(!title || !category || !steps){

        alert("Please complete all fields.");
        return;
    }

    articles.unshift({

        title,

        category,

        steps: steps
            .split("\n")
            .filter(x => x.trim() !== "")
    });

    saveData();

    renderArticles(articles);

    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("steps").value = "";
}

document
    .getElementById("searchInput")
    .addEventListener("keyup", function(){

        const search =
            this.value.toLowerCase();

        const filtered =
            articles.filter(article =>

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

        renderArticles(filtered);
    });

renderArticles(articles);
