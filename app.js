let discoveries =
JSON.parse(
localStorage.getItem("discoveries")
) || [];

function cleanNotes() {

    let notes =
    document.getElementById("notes").value;

    let cleaned =
    notes
    .split(".")
    .filter(x => x.trim() !== "")
    .map((step,index)=>
        `Step ${index + 1}: ${step.trim()}`
    )
    .join("<br>");

    document.getElementById(
        "cleanedArea"
    ).innerHTML =

    `
    <div class='clean-box'>
        <h3>Clean Procedure</h3>
        ${cleaned}
    </div>
    `;
}

function saveDiscovery() {

    let title =
    document.getElementById("title").value;

    let category =
    document.getElementById("category").value;

    let tags =
    document.getElementById("tags").value;

    let notes =
    document.getElementById("notes").value;

    let file =
    document.getElementById(
        "attachment"
    ).files[0];

    let fileName = "";

    if(file){
        fileName = file.name;
    }

    discoveries.push({

        title,
        category,
        tags,
        notes,
        fileName

    });

    localStorage.setItem(
        "discoveries",
        JSON.stringify(discoveries)
    );

    alert("Discovery Saved");

    location.reload();
}

function loadKnowledge() {

    let results =
    document.getElementById("results");

    if(!results) return;

    displayDiscoveries(discoveries);

    document
        .getElementById("searchBox")
        .addEventListener("input",
        filterSearch);

    document
        .getElementById(
            "filterCategory"
        )
        .addEventListener(
            "change",
            filterSearch
        );
}

function filterSearch() {

    let search =
    document.getElementById(
        "searchBox"
    ).value.toLowerCase();

    let category =
    document.getElementById(
        "filterCategory"
    ).value;

    let filtered =
    discoveries.filter(item =>

        (
            item.title
            .toLowerCase()
            .includes(search)

            ||

            item.notes
            .toLowerCase()
            .includes(search)

            ||

            item.tags
            .toLowerCase()
            .includes(search)

        )

        &&

        (
            category === ""
            ||

            item.category === category
        )

    );

    displayDiscoveries(filtered);
}

function displayDiscoveries(list) {

    let results =
    document.getElementById(
        "results"
    );

    results.innerHTML = "";

    list.forEach(item => {

        results.innerHTML +=

        `
        <div class="discovery-card">

            <h3>${item.title}</h3>

            <div class="category">
                ${item.category}
            </div>

            <p>
                <b>Tags:</b>
                ${item.tags}
            </p>

            <hr><br>

            <p>${item.notes}</p>

            <br>

            <b>
            Attachment:
            </b>

            ${item.fileName
                ? item.fileName
                : "None"}

        </div>
        `;
    });
}

loadKnowledge();
