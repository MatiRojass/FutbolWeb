const API_KEY = '111949eaf250a3129bb7210839f83d54'
const API_URL = 'https://v3.football.api-sports.io'
const year = 2021 //ONLY 2021-2023

//GET Liga Profesional Argentina

const getData = async () => {

    let data = localStorage.getItem('data')

    if (data) {
        return JSON.parse(data)
    }

    try {
        const res = await fetch(API_URL + `/standings?league=128&season=${year}`, {
            method: 'GET',
            headers: {
                'x-apisports-key': API_KEY
            }
        })

        if (!res.ok) {
            throw new Error(`Error en la solicitud: ${res.status} ${res.statusText}`);
        }

        data = await res.json()

        localStorage.setItem('data', JSON.stringify(data))

        return data
    } catch (e) {
        console.error(e)
        throw new Error("Erro en al obtener los datos")
    }
}

const createRows = (stands, template, tbody) => {
    stands.forEach(stand => {
        const row = template.content.cloneNode(true)
        const cols = row.querySelectorAll('td')
        const span = document.createElement('span')
        const i = document.createElement('i')
        i.classList.add('fi')

        cols[0].textContent = stand.rank
        cols[1].innerHTML = `<div><img src=${stand.team.logo} alt="" /> ${stand.team.name}</div>`

        //ADD STATUS ICON
        if (stand.status == 'down' || stand.status == 'up') {
            i.classList.add(`fi-br-caret-${stand.status}`)
        } else {
            i.classList.add('fi-br-horizontal-rule')
        }

        span.appendChild(i)
        cols[1].appendChild(span)

        cols[2].textContent = stand.points
        cols[3].textContent = stand.all.played
        cols[4].textContent = stand.all.win
        cols[5].textContent = stand.all.draw
        cols[6].textContent = stand.all.lose
        cols[7].textContent = stand.all.goals.for
        cols[8].textContent = stand.all.goals.against
        cols[9].textContent = stand.goalsDiff

        tbody.appendChild(row)
    });
}

const main = async () => {
    try {
        const data = await getData()

        if (data.errors) {
            console.error(data.errors)
            throw new Error("Error en la peticion")
        }

        const standings = data.response[0].league.standings
        const template = document.getElementById('row-data')
        const tbody = document.getElementById('data-table')
        createRows(standings[0], template, tbody)
    } catch (e) {
        console.error(e)
    }
}

main()








