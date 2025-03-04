// can't figure this one out? tried upcase/lowercase and other variations of the code
const apiUrl = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2412-FTB-MT-WEB-PT/parties";

// shows all parties
async function fetchParties() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const partyList = document.getElementById("party-list");
    partyList.innerHTML = "";

    // loop through all parties and put in list
    data.forEach(party => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${party.name}</strong> - ${party.date} at ${party.time}
            <br>Location: ${party.location}
            <br>${party.description}
            <br><button onclick="deleteEntry(${party.id})">Delete</button>
        `;
        partyList.appendChild(li);
    });
}

// add newEntry 
async function newEntry(event) {
    event.preventDefault();
    
    // get values from form
    const party = {
        name: document.getElementById("name").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        location: document.getElementById("location").value,
        description: document.getElementById("description").value
    };

    // post to api
    await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(party)
    });

    document.getElementById("party-form").reset();
    fetchParties();
}

// delte entry
async function deleteEntry(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchParties();
}

document.getElementById("party-form").addEventListener("submit", newEntry);

fetchParties();
