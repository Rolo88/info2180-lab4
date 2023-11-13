// Function to make an XMLHttpRequest
function makeRequest(url, method, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        callback(null, response);
      } else {
        callback(`Error: ${xhr.status}`, null);
      }
    }
  };

  xhr.send();
}

// Function to create an element with specified tag, content, and optional class
function createElement(tag, content, className) {
  const element = document.createElement(tag);
  if (content) {
    element.innerHTML = content;
  }
  if (className) {
    element.className = className;
  }
  return element;
}

// Function to append a message to the result container
function appendMessage(resultContainer, message, className = "error") {
  const messageDiv = createElement(
    "div",
    `<p class="${className}">${message}</p>`
  );
  resultContainer.appendChild(messageDiv);
}

// Function to append a single superhero to the result container
function appendSingleSuperhero(resultContainer, superhero) {
  const singleSuperheroDiv = createElement(
    "div",
    `
    <div>
      <h3>${superhero.alias}</h3>
      <h4>${superhero.name}</h4>
      <p>${superhero.biography}</p>
    </div>
  `
  );
  resultContainer.appendChild(singleSuperheroDiv);
}

// Function to append a list of superheroes to the result container
function appendSuperheroList(resultContainer, superheroes) {
  const list = createElement("ul");
  superheroes.forEach((superhero) => {
    const listItem = createElement("li", superhero.name);
    list.appendChild(listItem);
  });
  resultContainer.appendChild(list);
}

// Main search function
function performSearch() {
  try {
    const searchInput = document.querySelector("input").value.trim();
    const searchQuery = encodeURIComponent(searchInput);

    const url = `superheroes.php?query=${searchQuery}`;
    makeRequest(url, "GET", function (error, superheroes) {
      if (error) {
        console.error(error);
        return;
      }

      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "";

      // Create a container div for the result
      const resultContainer = createElement("div");
      resultContainer.innerHTML = `
        <div>
          <h2>RESULT</h2>
          <hr>
        </div>
      `;

      // Check if any superheroes were found
      if (superheroes.length === 0) {
        appendMessage(resultContainer, "SUPERHERO NOT FOUND");
      } else if (superheroes.length === 1) {
        appendSingleSuperhero(resultContainer, superheroes[0]);
      } else {
        appendSuperheroList(resultContainer, superheroes);
      }

      // Add result to container
      resultDiv.appendChild(resultContainer);
    });
  } catch (error) {
    console.error(error);
  }
}

// Event listener for the search button
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search");
  searchButton.addEventListener("click", performSearch);
});
