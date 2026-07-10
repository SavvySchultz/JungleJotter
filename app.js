/* ================================
   JUNGLE JOTTER PRO
================================ */

let discoveries =
JSON.parse(
localStorage.getItem(
"discoveries"
)
) || [];

let originalNotes = "";

/* ================================
   FILE IMPORT
================================ */

function loadFile(){

    const file =
    document.getElementById(
    "ticketFile"
    ).files[0];

    if(!file){

        alert(
        "Choose a file first."
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

/* ================================
   SMART AI CLEAN
================================ */

function smartClean(){

    con*t notesBox =
    document.getEleme*tById(
    "notes"
    );

    if(*notesBox) return;

    const raw =*    notesBox.value.trim();

    if*!raw){

        alert(
        "En*er notes first."
        );

     *  return;
    }

    originalNotes*= raw;

    const lines =
    raw
*   .split(/\n+/)
    .map(
    x =* x.trim()
    )
    .filter(Boolea*);

    const summary =
    lines[0];

    const troubleshooting =
  * [];

    const resolution =
    [];

    const verification =
    []*

    lines.forEach(line=>{

     *  const lower =
        line.toLow*rCase();

        if(

           *lower.includes(
            "fixed*
            ) ||

            low*r.includes(
            "resolved"*            ) ||

            lowe*.includes(
            "working"
 *          ) ||

            lower.*ncludes(
            "restored"
  *         ) ||

            lower.i*cludes(
            "reinstalled"
*           ) ||

            lower*includes(
            "repair"
   *        )

        ){

           *resolution.push(
            line
*           );
        }

        e*se if(

            lower.includes*
            "confirmed"
         *  ) ||

            lower.includes*
            "tested"
            * ||

            lower.includes(
 *          "verified working"
     *      )

        ){

            v*rification.push(
            line
            );
        }

        else{

            troubleshooting.push(
            line
            );
        }

    });

    notesBox.value =

`Issue Summary
${summary}

Symptoms
${summary}

Troubleshooting Steps
${troubleshooting.map(
(step,index)=>
`${index+1}. ${step}`
).join("\n")}

Resolution
${resolution.length
? resolution.join("\n")
: "Issue resolved."
}

Verification
${verification.length
? verification.join("\n")
: "User confirmed functionality."
}`;
}

/* ================================
   UNDO
================================ */

function undoSmartClean(){

    document.getElementById(
    "notes"
    ).value =
    originalNotes;
}

/* ================================
   AUTO TAGS
================================ */

function autoTags(tex*){

    const tags =
    [];

    const lower =
    text.toLowerCase();

    if(lower.includes("outlook"))
    tags.push("Outlook");

    if(lower.includes("teams"))
    tags.push("Teams");

    if(lower.includes("vpn"))
    tags.push("VPN");

    if(lower.includes("sharepoint"))
    tags.push("SharePoint");

    if(lower.includes("onedrive"))
    tags.push("OneDrive");

    if(lower.includes("password"))
    tags.push("Password");

    if(lower.includes("mfa"))
    tags.push("MFA");

    return tags.join(",");
}

/* ================================
   SAVE
================================ */

function saveDiscovery(){
*    const title =
    document.get*lementById(
    "title"
    ).valu*.trim();

    const category =
   *document.getElementById(
    "cate*ory"
    ).value;

    let tags =
*   document.getElementById(
    "t*gs"
    ).value.trim();

    const*notes =
    document.getElementByI*(
    "notes"
    ).value.trim();
*    if(!title){

        alert(
  *     "Issue Title required."
     *  );

        return;
    }

    i*(!notes){

        alert(
        *Notes required."
        );

     *  return;
    }

    if(!tags){

 *      tags =
        autoTags(
   *    notes
        );
    }

    const discovery = {

        id:
        Date.now(),

        title:
        title,

        category:
        category,

        tags:
        tags,

        notes:
        notes,

        favorite:
        false,

        rating:
        0,

        created:
        new Date()
        .toLocaleString()

    };

    discoveries.push(
    discovery
    );

    localStorage.setItem(

    "discoveries",

    JSON.stringify(
    discoveries
    )

    );

    window.location.href =
    "knowledge.html";
}
