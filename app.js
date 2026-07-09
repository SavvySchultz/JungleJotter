let discoveries =
JSON.parse(localStorage.getItem("discoveries")) || [];

let originalNotes = "";

function cleanNotes(){

const notesBox =
document.getElementById("notes");

if(!notesBox) return;

const notes = notesBox.value;

if(notes.trim() === ""){
alert("Enter notes first");
return;
}

originalNotes = notes;

let lines =
notes
.split(/\n|\.|-/)
.filter(line => line.trim() !== "");

let cleanText =
`Issue Investigation

Summary:
This issue was reviewed and organized into a structured troubleshooting process.

Resolution Steps:

`;

lines.forEach((line,index)=>{

cleanText += `${index+1}. ${line.trim()}\n`;

});

cleanText += `

Verification:
- Confirm issue is resolved
- Validate with end user
- Update ticket notes

Suggested Checks:
- Verify permissions
- Verify MFA
- Check account lockouts
`;

notesBox.value = cleanText;

}

function undoCleanNotes(){

const notesBox =
document.getElementById("notes");

if(notesBox){
notesBox.value = originalNotes;
}

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
attachments,
date:new Date().toLocaleDateString()

});

localStorage.setItem(
"discoveries",
JSON.stringify(discoveries)
);

alert("Discovery Saved");

location.reload();
}

function searchKnowledge(){

const search =
document.getElementById("search")
?.value.toLowerCase() || "";

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

function toggleTicket(id){

let ticket =
document.getElementById(`ticket-${id}`);

if(ticket.style.display === "block"){
ticket.style.display = "none";
}
else{
ticket.style.display = "block";
}

}

function displayKnowledge(data){

const area =
document.getElementById("results");

if(!area) return;

area.innerHTML = "";

data.forEach((item,index)=>{

area.innerHTML += `

<div class="discovery">

<h2>${item.title}</h2>

<p>
Category:
${item.category}
</p>

<p>
Tags:
${item.tags}
</p>

<p>
Created:
${item.date}
</p>

<button onclick="toggleTicket(${index})">
📖 Open Ticket
</button>

<div
class="ticket-details"
id="ticket-${index}">

<h3>Resolution Notes</h3>

<pre>${item.notes}</pre>

<p>
<b>Attachments:</b>
${item.attachments.join(", ")}
</p>

</div>

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
discoveries.map(x=>x.category)
);

document.getElementById(
"categoryCount"
).innerText =
categories.size;

}

displayKnowledge(discoveries);
loadDashboard();
