'Use strict';

const URL_API = 'https://restcountries.com/v3.1/';

export function fetchCountries(name) {
  const url = `${URL_API}name/`;
  const params = new URLSearchParams({
    fields: 'name,capital,population,flags,languages',
  });
  return fetch(`${url}${name}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
