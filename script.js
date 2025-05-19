const projects = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    category: "invested",
    amount: 1,
    token: "BTC",
    website: "https://bitcoin.org",
    twitter: "",
    discord: "",
    valuation: 50000,
    capital: 50000,
    tgeDate: "2021-01-01",
    vestingStart: "",
    vestingEnd: "",
    description: "The first cryptocurrency.",
    totalTokens: 21000000,
    legalDoc: "",
    unlockSchedule: []
  }
];

function createCard(project) {
  const column = document.getElementById(project.category);
  if (!column) return;

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="card-header">${project.name}</div>
    <div class="card-body">Token: ${project.token}</div>
    <div class="card-footer">Valuation: $${project.valuation}</div>
    <div class="card-details">
      <p><strong>Category:</strong> ${project.category}</p>
      <p><strong>Capital:</strong> $${project.capital}</p>
      <p><strong>Website:</strong> <a href="${project.website}" target="_blank">${project.website}</a></p>
      <p><strong>TGE Date:</strong> ${project.tgeDate}</p>
      <p><strong>Description:</strong> ${project.description}</p>
      <p><strong>Total Tokens:</strong> ${project.totalTokens}</p>
    </div>
  `;

  // Toggle expand/collapse
  card.addEventListener("click", () => {
    card.classList.toggle("expanded");
  });

  column.appendChild(card);
}

// Load initial cards
projects.forEach(createCard);

// Form submission to add new projects
document.getElementById('projectForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('projectName').value;
  const token = document.getElementById('tokenSymbol').value;
  const category = document.getElementById('category').value.toLowerCase();
  const website = document.getElementById('website').value;
  const valuation = Number(document.getElementById('valuation').value);
  const capital = Number(document.getElementById('capital').value);

  const newProject = {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    category,
    amount: 0,
    token,
    website,
    twitter: "",
    discord: "",
    valuation,
    capital,
    tgeDate: "",
    vestingStart: "",
    vestingEnd: "",
    description: "",
    totalTokens: 0,
    legalDoc: "",
    unlockSchedule: []
  };

  createCard(newProject);
  document.getElementById('projectForm').reset();
});
