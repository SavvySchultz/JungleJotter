let discoveries =
JSON.parse(
localStorage.getItem(
"discoveries"
)
) || [];

let originalNotes = "";

/* ===========================
   FILE UPLOAD
=========================== */

function loadFile(){

const file =
document.getElementById(
"ticketFile"
).files[0];

if(!file){

alert(
"Select a text file first."
);

return;
}

const reader =
new FileReader();

reader.onload =
function(e){

document.getElementById(
"notes"
).value =
e.target.result;
};

reader.readAsText(file);
}

/* ===========================
   SMART AI
=========================== */

function smartClean(){

const notesBox =
document.getElementById(
"notes"
);

const raw =
notesBox.value.trim();

if(!raw){

alert(
"Enter notes first."
);

return;
}

originalNotes = raw;

const lines =
raw
.split(/\n+/)
.map(
x=>x.trim()
)
.filter(Boolean);

const summary =
lines[0];

const troubleshooting =
[];

const resolution =
[];

const verification =
[];

const suggestions =
[];

lines.forEach(line=>{

const lower =
line.toLowerCase();

/* Resolution */

if(

lower.includes("fixed") ||
lower.includes("resolved") ||
lower.includes("working") ||
lower.includes("restored") ||
lower.includes("reinstalled") ||
lower.includes("repaired")

){

resolution.push(line);

}

/* Verification */

else if(

lower.includes("confirmed") ||
lower.includes("tested") ||
lower.includes("verified")

){

verification.push(line);

}

/* Troubleshooting */

else{

troubleshooting.push(line);

}

});

/* Suggestions */

if(
raw.toLowerCase()
.includes("outlook")
){

suggestions.push(
"Create a new Outlook profile."
);

suggestions.push(
"Run Microsoft Support and Recovery Assistant."
);

}

if(
raw.toLowerCase()
.includes("teams")
){

suggestions.push(
"Clear Teams cache."
);

suggestions.push(
"Reinstall Microsoft Teams."
);

}

if(
raw.toLowerCase()
.includes("vpn")
){

suggestions.push(
"Verify VPN authentication."
);

suggestions.push(
"Confirm network connectivity."
);

}

if(
raw.toLowerCase()
.includes("password")
){

suggestions.push(
"Verify account lockout status."
);

suggestions.push(
"Confirm MFA requirements."
);

}

notesBox.value =

`Issue Summary
${summary}

Symptoms
${summary}

Troubleshooting

${troubleshooting
.map(
(step,index)=>
`${index+1}. ${step}`
)
.join("\n")}

Resolution

${resolution.length
? resolution.join("\n")
: "Issue resolved after troubleshooting."
}

Verification

${verification.length
? verification.join("\n")
: "User confirmed functionality."
}`;

const card =
document.getElementById(
"aiSuggestionsCard"
);

const area =
document.getElementById(
"aiSuggestions"
);

if(card && area){

card.style.display =
"block";

area.innerHTML =
suggestions.length

?

`
<ul>
${suggestions.map(
x=>`<li>${x}</li>`
).join("")}
</ul>
`

:

"<p>No additional suggestions available.</p>";

}
}

/* ===========================
   UNDO
=========================== */

function undoSmartClean(){

document.getElementById(
"notes"
).value =
originalNotes;
}

/* ===========================
   SAVE DISCOVERY
=========================== */

function saveDiscovery(){

const title =
document.getElementById(
"title"
).value.trim();

const category =
document.getElementById(
"category"
).value;

const tags =
document.getElementById(
"tags"
).value.trim();

const notes =
document.getElementById(
"notes"
).value.trim();

if(!title){

alert(
"Enter a title."
);

return;
}

if(!notes){

alert(
"Enter notes."
);

return;
}

discoveries.push({

id:
Date.now(),

title,

category,

tags,

notes,

favorite:false,

rating:0,

created:
new Date()
.toLocaleString()

});

localStorage.setItem(

"discoveries",

JSON.stringify(
discoveries
)

);

window.location.href =
"knowledge.html";
}
