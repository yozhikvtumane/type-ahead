const endpoint =
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = []
const input = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

fetch(endpoint)
    .then(res => res.json())
    .then(data => cities.push(...data))

function searchMatches(searchStr, cities) {
    if (searchStr === '') return []
    return cities.filter(place => {
        const search = new RegExp(searchStr , 'gi')
        return place.city.match(search) || place.state.match(search)
    })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g , ',')
}

function listMatches() {
    const matches = searchMatches(this.value, cities)
    const html = matches.map(match => {
        const regex = new RegExp(this.value, 'gi')
        const cityName = match.city.replace(regex , `<span class="hl">${this.value}</span>`)
        const stateName = match.state.replace(regex , `<span class="hl">${this.value}</span>`)
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(match.population)}</span>
            </li>
        `;
    }).join('')
    suggestions.innerHTML = html
    // console.log(matches)
}

input.addEventListener('change', listMatches)
input.addEventListener('keyup', listMatches)