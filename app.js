let discoveries =
JSON.parse(localStorage.getItem("discoveries")) || [];

function cleanNotes(){

    const notes =
    document.getElementById("notes")?.value;

    if(!notes){
        alert("Enter notes first.");
        return;
    }

    let steps = "";

    notes
    .split(/\n|\.|-/)
    .filter(line => line.trim() !== "")
    .forEach((line,index)=>{

        steps += `
        <li>${line.trim()}</li>
        `;

    });

    document.getElementById("aiOutput").innerHTML = `
    <div class="ai-card">

        <h2>🤖 AI Enhanced Procedure</h2>

        <h3>Summary</h3>

        <p>
        Notes were organized into a cleaner
        troubleshooting procedure.
        </p>

        <h3>Resolution Steps</h3>

        <ol>
        ${steps}
        </ol>

        <h3>Suggested Missing Checks</h3>

        <ul>
            <li>Verify MFA</li>
            <li>Verify permissions</li>
            <li>Capture screenshots</li>
            <li>Test with user</li>
            <li>Document resolution</li>
        </ul>

    </div>
    `;
}

function saveDiscovery(){

    const title =
    document.getElementById("title").value;

    const category =
    document.getElementById("category").value;

    const tags =
    document.getElementById("tags").value;

    const notes =
    document.getElementById("notes").value;

    const files =
    document.getElementById("files").files;

    let attachments = [];

    for(let i=0;i<files.length;i++){
        attachments.push(files[i].name);
    }

    discoveries.push({
        title,
        category,
        tags,
        notes,
        attachments
    });

    localStorage.setItem(
        "discoveries",
        JSON.stringify(discoveries)
    );

    alert("Discovery Saved!");
}

function searchKnowledge(){

    const search =
    document.getElementById("search")
    ?.value
    .toLowerCase() || "";

    const category =
    document.getElementById("filter")
    ?.value || "";

    const filtered =
    discoveries.filter(item =>

        (
            item.title.toLowerCase().includes(search)
            ||
            item.notes.toLowerCase().includes(search)
            ||
            item.tags.toLowerCase().includes(search)
        )

        &&

        (
            category === ""
            ||
            item.category === category
        )
    );

    displayKnowledge(filtered);
}

function displayKnowledge(data){

    const area =
    document.getElementById("results");

    if(!area) return;

    area.innerHTML = "";

    data.forEach(item=>{

        area.innerHTML += `
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

            <p>${item.notes}</p>

            <p>
                <strong>Attachments:</strong>
                ${item.attachments.join(", ")}
            </p>

        </div>
        `;
    });
}

function loadDashboard(){

    const total =
    document.getElementById("totalDiscoveries");

    if(!total) return;

    total.innerText =
    discoveries.length;

    const categories =
    new Set(
        discoveries.map(d=>d.category)
    );

    document.getElementById(
        "categoryCount"
    ).innerText =
    categories.size;
}

displayKnowledge(discoveries);
loadDashboard();
