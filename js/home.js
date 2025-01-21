const API_KEY = '111949eaf250a3129bb7210839f83d54'

const getData = async () => {
    try {
        const res = await fetch(`https://v3.football.api-sports.io/fixtures?live=all&timezone=Argentina/Buenos Aires`, {
            method: 'GET',
            headers: {
                'x-apisports-key': API_KEY
            }
        })

        if (!res.ok) {
            throw new Error(`Error en la solicitud: ${res.status} ${res.statusText}`)
        }

        const data = await res.json()

        return data

    } catch (error) {
        console.error(error)
    }
}

const createCards = (matchs, template, ul) => {
    matchs.forEach(match => {
        const card = template.content.cloneNode(true);

        const countryInfo = card.querySelector('.country-info');
        const competition = card.querySelector('.competition-section');
        const homeTeam = card.querySelector('.match-info .home-team');
        const awayTeam = card.querySelector('.match-info .away-team');
        const liveScore = card.querySelector('.live-info .score');
        const liveTime = card.querySelector('.live-info .time');


        if (countryInfo) {
            countryInfo.innerHTML = `
                <img src="${match.league?.flag || ''}" alt="${match.league?.country || 'Unknown'} flag">
                <span>${match.league?.country || 'Unknown Country'}</span>
            `;
        }


        if (competition) {
            competition.innerHTML = `
                <img src="${match.league?.logo || ''}" alt="${match.league?.name || 'Competition'} logo" />
                <span class="competition-name">${match.league?.name || 'Unknown League'} ${match.league?.round || ''}</span>
            `;
        }


        if (homeTeam) {
            homeTeam.innerHTML = `
                <img src="${match.teams?.home?.logo || ''}" alt="${match.teams?.home?.name || 'Home Team'} logo" />
                <span>${match.teams?.home?.name || 'Home Team'}</span>
            `;
        }


        if (awayTeam) {
            awayTeam.innerHTML = `
                <img src="${match.teams?.away?.logo || ''}" alt="${match.teams?.away?.name || 'Away Team'} logo" />
                <span>${match.teams?.away?.name || 'Away Team'}</span>
            `;
        }


        if (liveScore) {
            const homeGoalElement = liveScore.querySelector('.home-goals');
            const awayGoalElement = liveScore.querySelector('.away-goals');
            if (homeGoalElement) homeGoalElement.textContent = match.goals?.home ?? '0';
            if (awayGoalElement) awayGoalElement.textContent = match.goals?.away ?? '0';
        }


        if (liveTime) {
            const elapsed = match.fixture.status.elapsed || 0;
            const extra = match.fixture.status.extra || 0;
            const part = match.fixture.status.short || '';
            const minutesElement = liveTime.querySelector('.minutes');
            const partElement = liveTime.querySelector('.part');
            if (minutesElement) minutesElement.textContent = extra ? `${elapsed} + ${extra}'` : `${elapsed}'`;
            if (partElement) partElement.textContent = part;
        }


        ul.appendChild(card);
    });
};

const main = async () => {
    const template = document.getElementById('card-template')
    const ul = document.getElementById('matchs-list')

    try {
        const data = await getData()

        if (data.errors) {
            console.error(data.errors)
            throw new Error("Error en la peticion")
        }

        if (data.response.length == 0) {
            ul.innerHTML = `<li><h3 class="not-match">No hay partidos para mostrar</h3></li>`
            return
        }

        const matchs = data.response

        ul.innerHTML = ''
        createCards(matchs, template, ul)


    } catch (e) {
        ul.innerHTML = `<li><h3 class="not-match">Error en la peticion :(</h3></li>`
        console.error(e)
    }
}

main()
setInterval(main, 1000 * 150) //actualizar cada 2.5 minutos 
