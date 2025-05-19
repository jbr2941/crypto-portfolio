document.addEventListener('DOMContentLoaded', () => {
  // Show the form when the plus button is clicked
  const addButtons = document.querySelectorAll('.plusBtn');
  const projectFormContainer = document.getElementById('projectFormContainer');
  const cancelFormBtn = document.getElementById('cancelFormBtn');

  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Show the form and automatically focus on the project name input
      projectFormContainer.classList.remove('hidden');
    });
  });

  // Hide the form when Cancel button is clicked
  cancelFormBtn.addEventListener('click', () => {
    projectFormContainer.classList.add('hidden');
  });

  // Handle form submission
  document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('projectName').value;
    const equityValuation = Number(document.getElementById('equityValuation').value);
    const tokenValuation = Number(document.getElementById('tokenValuation').value);
    const capital = Number(document.getElementById('capital').value);
    const tgeDate = document.getElementById('tgeDate').value;
    const vestingStart = document.getElementById('vestingStart').value;
    const vestingEnd = document.getElementById('vestingEnd').value;
    const description = document.getElementById('description').value;
    const signDate = document.getElementById('signDate').value;
    const transactionDate = document.getElementById('transactionDate').value;
    const transaction = document.getElementById('transaction').value;
    const totalTokens = Number(document.getElementById('totalTokens').value);
    const legalDoc = document.getElementById('legalDoc').value;
    const fund = Number(document.getElementById('fund').value);
    const category = document.getElementById('category').value;

    // Create the project object
    const project = {
      name,
      equityValuation,
      tokenValuation,
      capital,
      tgeDate,
      vestingStart,
      vestingEnd,
      description,
      signDate,
      transactionDate,
      transaction,
      totalTokens,
      legalDoc,
      fund,
      category
    };

    // Create the project card (you can expand this to save the project in localStorage or backend)
    createCard(project);

    // Reset and hide the form
    document.getElementById('projectForm').reset();
    projectFormContainer.classList.add('hidden');
  });

  // Function to create project card
  function createCard(project) {
    const column = document.getElementById(project.category);
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="card-header">${project.name}</div>
      <div class="card-body">Token Valuation: $${project.tokenValuation}</div>
      <div class="card-footer">Capital Invested: $${project.capital}</div>
    `;
    
    column.appendChild(card);
  }
});
