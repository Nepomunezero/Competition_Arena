// ---- API SETTINGS ----
// Example API endpoint (replace with your real one)
const API_URL = "https://api.sampleapis.com/futurama/episodes"; 
// You WILL replace this with your competitions API

// ---- MAIN FUNCTION ----
async function loadCompetitions() {
    const results = document.getElementById("results");
    results.innerHTML = "<p>Loading competitions...</p>";

    try {
        // 1) Fetch competitions data from API
        let response = await fetch(API_URL);
        let data = await response.json();

        // ---- SHAPE / NORMALIZE data here ----
        // We convert API data into: { name, date, type }
        const competitions = data.slice(0, 15).map(item => ({
            name: item.title || "Unknown Competition",
            date: item.originalAirDate || "2025-01-01",
            type: Math.random() > 0.5 ? "academic" : "non-academic" // FAKE until your real API
        }));

        // 2) Apply filters
        const searchText = document.getElementById("search").value.toLowerCase();
        const typeFilter = document.getElementById("type").value;
        const sortBy = document.getElementById("sort").value;

        let filtered = competitions.filter(c =>
            c.name.toLowerCase().includes(searchText)
        );

        if (typeFilter) {
            filtered = filtered.filter(c => c.type === typeFilter);
        }

        // 3) Sorting
        if (sortBy === "name") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        // 4) Display results
        results.innerHTML = "";

        if (filtered.length === 0) {
            results.innerHTML = "<p>No competitions found.</p>";
            return;
        }

        filtered.forEach(c => {
            results.innerHTML += `
                <div class="competition-card">
                    <div class="comp-title">${c.name}</div>
                    <div class="comp-date">Date: ${c.date}</div>
                    <div>Type: ${c.type}</div>
                </div>
            `;
        });

    } catch (error) {
        results.innerHTML = "<p style='color:red'>Failed to load data. Check API.</p>";
        console.error("Error fetching competitions:", error);
    }
}

// Auto-load on page open
window.onload = loadCompetitions;
