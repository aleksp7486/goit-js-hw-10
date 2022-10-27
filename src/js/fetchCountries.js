'Use strict';

export function fetchCountries(name) {
  const urlApi = 'https://restcountries.com/v3.1/name/';
  const params = new URLSearchParams({
    fields: 'name,capital,population,flags,languages',
  });
  return fetch(`${urlApi}${name}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
