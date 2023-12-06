export default async function loadCurrencyAccounts(token) {
  const currencyAccounts = fetch('http://localhost:3000/currencies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  }).then((data) => data.json());
  return currencyAccounts;
}
