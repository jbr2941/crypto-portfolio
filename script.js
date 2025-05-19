document.getElementById('projectForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const project = {
    id: Date.now(),
    name: document.getElementById('projectName').value,
    category: document.getElementById('category').value,
    vestingStart: document.getElementById('vestingStart').value,
    vestingEnd: document.getElementById('vestingEnd').value,
    // Add other fields as necessary
  };

  // Create project card
  const card = document.createElement('div');
  card.classList.add('project-card');
  card.id = project.id;
  card.innerHTML = `
    <h3>${project.name}</h3>
    <p>Category: ${project.category}</p>
    <button class="viewVestingBtn">View Vesting Schedule</button>
    <div class="vesting-schedule" style="display: none;"></div>
  `;
  document.getElementById('projectCards').appendChild(card);

  // Add event listener to toggle vesting schedule
  card.querySelector('.viewVestingBtn').addEventListener('click', function() {
    const vestingDiv = card.querySelector('.vesting-schedule');
    if (vestingDiv.style.display === 'none') {
      vestingDiv.style.display = 'block';
      generateVestingSchedule(project, vestingDiv);
    } else {
      vestingDiv.style.display = 'none';
    }
  });

  // Fetch token price
  fetchTokenPrice('ethereum', card);
});

function generateVestingSchedule(project, container) {
  const schedule = calculateVestingSchedule(project.vestingStart, project.vestingEnd);
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr><th>Month</th><th>Year</th></tr>
    </thead>
    <tbody>
      ${schedule.map(entry => `
        <tr>
          <td>${entry.month}</td>
          <td>${entry.year}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
  container.appendChild(table);
}

function calculateVestingSchedule(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const schedule = [];

  while (start <= end) {
    schedule.push({
      month: start.toLocaleString('default', { month: 'long' }),
      year: start.getFullYear(),
    });
    start.setMonth(start.getMonth() + 1);
  }

  return schedule;
}

function fetchTokenPrice(tokenId, card) {
  fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`)
    .then(response => response.json())
    .then(data => {
      const price = data[tokenId]?.usd;
      const priceDiv = document.createElement('div');
      priceDiv.textContent = `Current Price: $${price}`;
      card.appendChild(priceDiv);
    })
    .catch(error => console.error('Error fetching price:', error));
}
