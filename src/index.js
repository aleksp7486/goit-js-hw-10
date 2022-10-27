'Use strict';

import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix';
var debounce = require('debounce');

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('ul.country-list'),
  countryInfo: document.querySelector('div.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  if (!this.value) {
    renderReset();
    return;
  }
  renderReset();
  fetchCountries(this.value.trim())
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (countries.length > 1 && countries.length < 11) {
        renderCountryList(countries);
        return;
      }
      renderCountryInfo(countries);
    })
    .catch(error => {
      Notify.failure('Country with this name not found');
    });
}

function renderReset() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function renderCountryList(countries) {
  const markup = countries
    .map(({ name: { official }, flags: { svg } }) => {
      return `<li><img src="${svg}" alt="flag"><p>${official}</p></li>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
}

function renderCountryInfo(countries) {
  const markup = countries
    .map(
      ({
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
      }) => {
        return `<div class="country-info__wrap">
      <img src="${svg}" alt="flag">
      <h1>${official}</h1>
      <p>Capital:<span>${capital}</span></p>
      <p>Population:<span>${population}</span></p>
      <p>Languages:<span>${Object.values(languages).join(', ')}</span></p>
      </div>`;
      }
    )
    .join('');
  refs.countryInfo.innerHTML = markup;
}
