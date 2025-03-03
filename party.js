const apiUrl = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2412-FTB-MT-WEB-PT/parties";

// shows all parties
async function fetchParties() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const partyList = document.getElementById("party-list");
    partyList.innerHTML = "";

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
    
    const party = {
        name: document.getElementById("name").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        location: document.getElementById("location").value,
        description: document.getElementById("description").value
    };

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
