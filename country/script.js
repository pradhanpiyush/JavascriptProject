const countryContainer = document.querySelector(".country-container");
const filter = document.querySelector(".filter");
const searchInput = document.querySelector(".search-filter-container input");
const themeChanger = document.querySelector(".theme");

function resultCountry(data) {
  countryContainer.innerText = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;

    const cardHtml = `<img src="${country.flags.svg}" alt="${
      country.name.common
    }">
<div class="country-text">
  <h3 class="country-name">${country.name.common}</h3>
  <span><b>Population:</b>&nbsp;${country.population.toLocaleString(
    "en-IN"
  )}</span>
  <span><b>Region:</b>&nbsp;${country.region}</span>
  <span><b>Capital</b>&nbsp;${country.capital}</span>
</div>`;

    countryCard.innerHTML = cardHtml;

    countryContainer.append(countryCard);
  });
}

let allCountryData;

fetch("https://restcountries.com/v3.1/all")
  .then((countryRes) => countryRes.json())
  .then((countryData) => {
    resultCountry(countryData);
    allCountryData = countryData;
  });

filter.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then((data) => {
      resultCountry(data);
    });
});

searchInput.addEventListener("input", (e) => {
  const filterData = allCountryData.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(e.target.value.toLowerCase());
  });
  resultCountry(filterData);
});

import mode from "./mode.js";

// let flag = false;
themeChanger.addEventListener("click", () => {
  mode(themeChanger);
  // if (!flag) {
  //   document.querySelector(".theme .dark-light").name = "sunny-outline";
  //   themeChanger.lastChild.innerText = "Light Mode";
  //   document.body.classList.add("dark");
  //   flag = true;
  // } else {
  //   document.querySelector(".theme .dark-light").name = "moon-outline";
  //   themeChanger.lastChild.innerText = "Dark Mode";
  //   document.body.classList.remove("dark");
  //   flag = false;
  // }
  // if (document.body.getAttribute("class") == "") {
  //   document.body.classList.add("dark");
  //   document.querySelector(".theme .dark-light").name = "sunny-outline";
  //   themeChanger.lastChild.innerText = "Light Mode";
  // } else {
  //   document.body.classList.remove("dark");
  //   document.querySelector(".theme .dark-light").name = "moon-outline";
  //   themeChanger.lastChild.innerText = "Dark Mode";
  // }
});
