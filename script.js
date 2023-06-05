"use strict";

const searchInput = document.getElementById('search-input');
const resultsList = document.getElementById('results-list');
const message = document.getElementById('message');
const loader = document.getElementById('loader');

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value;
  search(searchTerm);
});

async function search(term) {
  showLoader();

  if (term === '') {
    hideLoader();
    showMessage('Unesite termin za pretragu.');
    return;
  }

  try {
    const data = await fetchData(term);
    hideLoader();
    if (data.resultCount === 0) {
      showMessage('Nema rezultata za traženi termin.');
    } else {
      displayResults(data.results);
    }
  } catch (err) {
    hideLoader();
    showMessage('Došlo je do pogreške prilikom pretrage.');
  }
}

async function fetchData(term) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function displayResults(results) {
  results.forEach(result => {
    const row = document.createElement('tr');
    const trackCell = document.createElement('td');
    const artistCell = document.createElement('td');
    trackCell.textContent = result.trackName;
    artistCell.textContent = result.artistName;
    row.appendChild(trackCell);
    row.appendChild(artistCell);
    resultsList.appendChild(row);
  });
}

function showLoader() {
  resultsList.innerHTML = '';
  message.textContent = '';
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showMessage(msg) {
  message.textContent = msg;
}
