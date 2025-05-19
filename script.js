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
    description: "",
    totalTokens: 21000000,
    legalDoc: "",
    unlockSchedule: []
  }
];

function showModal(project) {
  alert(`Project: ${project.name}\nToken: ${project.token}\nValuation: $${project.valuation}`);
}

function createCard(project) {
  const column = document.getElementById(project.category);
  if (!column) return;

  const card = document.createElement("div");
  card.className = "card";
  card.onclick = () => showModal(project);

  card.innerHTML = `
    <div class="card-header">${project.name}</div>
    <div class="card-body">Token: ${project.token}</div>
    <div class="card-footer">Valuation: $${project.valuation}</div>
  `;

  column.appendChild(card);
}

projects.forEach(createCard);

// Add new project from form
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
