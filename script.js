const projects = [
    {
        id: "bitcoin",
        name: "Bitcoin",
        category: "invested",
        amount: 1,
        token: "BTC",
        website: "https://bitcoin.org",
        twitter: "https://twitter.com/bitcoin",
        discord: "https://discord.com/invite/bitcoin",
        valuation: 50000,
        capital: 50000,
        tgeDate: "2021-01-01",
        vestingStart: "2021-01-01",
        vestingEnd: "2023-01-01",
        description: "Bitcoin is the first cryptocurrency.",
        totalTokens: 21000000,
        legalDoc: "https://bitcoin.org/legal",
        unlockSchedule: [
            { month: "2021-01", unlocked: 1000000 },
            { month: "2021-02", unlocked: 1000000 },
            // Add more months...
        ]
    }
];

// Fetch price data from CoinGecko API
function fetchPriceData() {
    const apiURL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            updatePortfolio(data);
        })
        .catch(error => {
            console.error('Error fetching data from CoinGecko:', error);
        });
}

// Update the portfolio with the price data
function updatePortfolio(data) {
    projects.forEach(project => {
        const categoryDiv = document.getElementById(project.category);
        const card = document.createElement('div');
        card.classList.add('card');
        card.onclick = () => showModal(project);

        card.innerHTML = `
            <div class="card-header">${project.name}</div>
            <div class="card-body">Token: ${project.token}</div>
            <div class="card-footer">Price: $${data.bitcoin.usd}</div>
        `;
        categoryDiv.appendChild(card);
    });
}

// Show the modal with detailed project info
function showModal(project) {
    const modal = document.getElementById("projectModal");
    const projectDetails = document.getElementById("projectDetails");

    projectDetails.innerHTML = `
        <p><strong>Token Price:</strong> $${project.valuation}</p>
        <p><strong>Market Cap:</strong> N/A</p>
        <p><strong>FDV:</strong> N/A</p>
        <p><strong>Total Supply:</strong> ${project.totalTokens}</p>
        <p><strong>Website:</strong> <a href="${project.website}" target="_blank">${project.website}</a></p>
        <p><strong>Twitter:</strong> <a href="${project.twitter}" target="_blank">${project.twitter}</a></p>
        <p><strong>Discord:</strong> <a href="${project.discord}" target="_blank">${project.discord}</a></p>
        <p><strong>Description:</strong> ${project.description}</p>
    `;

    renderUnlockScheduleChart(project.unlockSchedule);

    modal.style.display = "block";
}

// Close the modal
document.querySelector(".close-btn").onclick = () => {
    document.getElementById("projectModal").style.display = "none";
};

// Render the unlock schedule chart
function renderUnlockScheduleChart(unlockSchedule) {
    const ctx = document.getElementById('unlockScheduleChart').getContext('2d');
    const months = unlockSchedule.map(item => item.month);
    const unlockedTokens = unlockSchedule.map(item => item.unlocked);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Tokens Unlocked',
                data: unlockedTokens,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        }
    });
}

// Initial load
fetchPriceData();
document.getElementById('projectForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('projectName').value;
  const token = document.getElementById('tokenSymbol').value;
  const category = document.getElementById('category').value.toLowerCase();
  const website = document.getElementById('website').value;
  const valuation = Number(document.getElementById('valuation').value);
  const capital = Number(document.getElementById('capital').value);

  const newProject = {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name: name,
    category: category,
    amount: 0,
    token: token,
    website: website,
    twitter: "",
    discord: "",
    valuation: valuation,
    capital: capital,
    tgeDate: "",
    vestingStart: "",
    vestingEnd: "",
    description: "",
    totalTokens: 0,
    legalDoc: "",
    unlockSchedule: []
  };

  addCardToPage(newProject); // function to create and insert card
  document.getElementById('projectForm').reset();
});

function addCardToPage(project) {
  const categoryDiv = document.getElementById(project.category);
  if (!categoryDiv) {
    alert("Invalid category. Use invested, postTGE, dead, or exited.");
    return;
  }

  const card = document.createElement('div');
  card.classList.add('card');
  card.onclick = () => showModal(project);

  card.innerHTML = `
      <div class="card-header">${project.name}</div>
      <div class="card-body">Token: ${project.token}</div>
      <div class="card-footer">Valuation: $${project.valuation}</div>
  `;
  categoryDiv.appendChild(card);
}
