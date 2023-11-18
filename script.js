function searchCountry() {
    const searchInput = document.getElementById('searchInput').value.trim();
  
    if (searchInput === '') {
        alert('Please enter a country name.');
        return;
    }
  
    const apiUrl = `https://restcountries.com/v3.1/name/${searchInput}`;
  
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Data received from API:', data); // Log the data for inspection
            displayCountryInfo(data);
        })
        .catch(error => {
            console.error('Error fetching country information:', error);
            alert('Error fetching country information. Please try again.');
        });
}

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        searchCountry();
    }
}

document.getElementById('searchInput').addEventListener('keydown', handleEnterKey);
  
  function displayCountryInfo(countryData) {
    const countryInfoContainer = document.getElementById('countryInfo');
    countryInfoContainer.innerHTML = ''; // Clear previous results
  
    if (countryData.length === 0) {
      countryInfoContainer.textContent = 'No information found for the entered country.';
      return;
    }
  
    const country = countryData[0];
  
    const countryName = country.name.common;
    const capital = country.capital ? country.capital[0] : 'N/A';
    const region = country.region ? country.region : 'N/A';
    const subregion = country.subregion ? country.subregion : 'N/A';
    const population = country.population ? country.population : 'N/A';
  
    // Extract languages
    const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  
    // Extract currency codes
    const currencies = country.currencies
      ? Object.keys(country.currencies).join(', ')
      : 'N/A';
  
    // Extract flag URL
    const flagUrl = getFlagUrl(country.flags);
  
    const countryInfoHTML = `
      <h2>${countryName}</h2>
      ${flagUrl ? `<img class="flag-image" src="${flagUrl}" alt="${countryName} Flag">` : ''}
      <p><strong>Capital:</strong> ${capital}</p>
      <p><strong>Region:</strong> ${region}</p>
      <p><strong>Subregion:</strong> ${subregion}</p>
      <p><strong>Population:</strong> ${population}</p>
      <p><strong>Languages:</strong> ${languages}</p>
      <p><strong>Currencies:</strong> ${currencies}</p>
    `;
  
    countryInfoContainer.innerHTML = countryInfoHTML;
  }
  
  function getFlagUrl(flags) {
  if (!flags) {
    return '';
  }

  // Check if flags is an object
  if (typeof flags === 'object') {
    // Use the first flag if it exists
    const flagKeys = Object.keys(flags);
    if (flagKeys.length > 0) {
      return flags[flagKeys[0]];
    }
  }

  // If flags is not an object or doesn't contain any flags, return an empty string
  return '';
}
  
  