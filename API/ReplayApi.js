


export function getReplay() {
  const url = '../data.json'
  return fetch(url)
  .then((response) => response.json())
    .catch((error) => {})
}
