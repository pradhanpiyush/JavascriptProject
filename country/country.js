import mode from "./mode.js";

const params = new Proxy(new URLSearchParams(location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const countryName = params.name;

const img = document.querySelector(".img-container img");
const cName = document.querySelector(".country-name");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const tld = document.querySelector(".top-level-domain");
const currency = document.querySelector(".currency");
const language = document.querySelector(".language");
const borderName = document.querySelector(".border-name");

const themeChanger = document.querySelector(".theme");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    img.src = country.flags.svg;
    img.alt = country.name.common;
    cName.innerText = country.name.common;

    nativeName.innerText = country.name.nativeName
      ? Object.values(country.name.nativeName)[0].common
      : country.name.common;

    population.innerText = country.population.toLocaleString("en-IN");

    region.innerText = country.region;
    subRegion.innerText = country.subregion || "";
    capital.innerText = country.capital || "";
    tld.innerText = country.tld.join(",  ") || "";

    if (country.currencies) {
      currency.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    } else {
      currency.innerText = "";
    }

    if (country.languages) {
      language.innerText = Object.values(country.languages).join(", ");
    } else {
      language.innerText = "";
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCard = document.createElement("a");
            borderCard.href = `/country.html?name=${borderCountry.name.common}`;
            borderCard.innerText = borderCountry.name.common;
            borderName.append(borderCard);
          });
      });
    }
  });

themeChanger.addEventListener("click", () => {
  mode(themeChanger);
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
