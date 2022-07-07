export default function getDuelists(){
  return fetch('http://localhost:3333/duelists').then(data => data.json())
}
  