export default function getproblems(){
    return fetch('http://localhost:3333/problems').then(data => data.json())
}