// Get references to form elements
const form = document.getElementById("groupForm");
const namesInput = document.getElementById("names");
const groupSizeInput = document.getElementById("groupSize");
const resultDiv = document.getElementById("result");

// Function to shuffle an array (Fisher-Yates shuffle algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Event listener for form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get and process input values
  const names = namesInput.value
    .split(`\n`)
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
  const groupSize = parseInt(groupSizeInput.value);

  // Check for valid input
  if (names.length === 0) {
    resultDiv.innerHTML = "<p>Please enter valid names.</p>";
    return;
  }

  if (isNaN(groupSize) || groupSize <= 0) {
    resultDiv.innerHTML = "<p>Please enter group size.</p>";
    return;
  }

  // Shuffle the names
  shuffleArray(names);

  // Generate groups
  const groups = [];
  for (let i = 0; i < names.length; i += groupSize) {
    groups.push(names.slice(i, i + groupSize));
  }

  // Display results
  resultDiv.innerHTML = "";
  groups.forEach((group, index) => {
    resultDiv.innerHTML += `<p><strong>Group ${
      index + 1
    }:</strong> ${group.join(", ")}</p>`;
  });
});
