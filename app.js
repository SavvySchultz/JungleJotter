let discoveries =
JSON.parse(
localStorage.getItem("discoveries")
) || [];

function cleanNotes(){

let notes =
document.getElementById("notes").value;

if(!notes){

alert("Enter notes first");

return;
}

let sentences =
notes.split(/[.\n]/);

let cleanOutput = "";

sentences.forEach((line,index)=>{

if(line.trim() !== ""){

cleanOutput +=
`<li>Step ${index+1}: ${line.trim()}</li>`;

}

});

document.getElementById("aiOutput").innerHTML =
`
<div class="ai-card">

<h2>🤖 AI Enhanced Procedure</h2>

<h3>Symptoms</h3>
<p>Issue reported by technician.</p>

<h3>Resolution Steps</h3>

<ol>
${cleanOutput}
</ol>

<h3>Suggested Improvements</h3>

<ul>

<li>Verify permissions</li>
<li>Check MFA status</li>
<li>Document screenshots</li>
<li>Validate with end user</li>

</ul>

</div>
`;
}

function saveDiscovery(){

let title =
document.getElementById("title").value;

let category =
document.getElementById("category").value;

let tags =
document.getElementById("tags").value;

let notes =
document.getElementById("notes").value;

let files =
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

alert("Discovery Saved");
}

function loadKnowledge(){

let results =
document.getElementById("results");

if(!results) return;

displayKnowledge(discoveries);
}

function searchKnowledge(){

let search =
document
.getElementById("search")
.value
.toLowerCase();

let category =
document
.getElementById("filter")
.value;

let filtered =
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

area.innerHTML +=
`
<div class="discovery">

<h2>${item.title}</h2>

<p><b>Category:</b>
${item.category}</p>

<p><b>Tags:</b>
${item.tags}</p>

<p>${item.notes}</p>

<p>

<b>Attachments:</b>

${item.attachments.join(", ")}

</p>

</div>
`;
});
}

function loadDashboard(){

let total =
document.getElementById(
"totalDiscoveries"
);

if(!total) return;

total.innerText =
discoveries.length;

let unique =
new Set(
discoveries.map(x=>x.category)
);

document.getElementById(
"categoryCount"
).innerText =
unique.size;
}

loadKnowledge();
loadDashboard();
`
