export default async function loadBanks(token) {
  const banks = fetch('http://localhost:3000/banks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
    cache: 'force-cache',
  }).then((res) => res.json());
  return banks;
}
