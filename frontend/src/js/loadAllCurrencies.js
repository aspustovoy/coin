export default async function loadAllCurrencies() {
  const allCurrencies = fetch('http://localhost:3000/all-currencies', {
    cache: 'force-cache',
  }).then((data) => data.json());
  return allCurrencies;
}
