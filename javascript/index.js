async function fetchPlanets(page = 1) {

    const url = `https://dragonball-api.com/api/planets?page=${page}&limit=10`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        data.items.forEach(planet => {
            const planetElement = document.createElement('div');
            planetElement.classList.add('card');
            planetElement.innerHTML = `
             <div class="card-front">
                    <h2>${planet.name}</h2>
                    <h4> Is Destroyed:${planet.isDestroyed}</h4>
                    <img class="planet-image"src="${planet.image}" alt="${planet.name}" />
                </div>
                <div class="card-back">
                    <h2>${planet.name}</h2>
                    <p>${planet.description}</p>
                </div>
            `;
            planetElement.addEventListener('click', function () {
                this.classList.toggle('flipped');
            });

            planetsData.appendChild(planetElement);
        });

        if (data.meta.currentPage < data.meta.totalPages) {
            await fetchPlanets(page + 1);
        } else {
            console.log('All pages have been fetched.');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

async function fetchCharacters(page = 1) {

    const url = `https://dragonball-api.com/api/characters?page=${page}&limit=10`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        data.items.forEach(character => {
            const characterElement = document.createElement('div');
            characterElement.classList.add('card');
            characterElement.innerHTML = `
            <div class="card-front" style="margin-bottom: 10px;">
            <h2>${character.name}</h2>
            <h5>Race:${character.race}</h5>
            <h5>Gender:${character.gender}</h5>
            <h5>KI:${character.ki}-
            ${character.maxKi}</h5>      

            <img class="character-image" src="${character.image}" alt="${character.name}" style="display: block; margin-top: 10px;" />
            </div>
            <div class="card-back">
            <h2>${character.name}</h2>
            <p>${character.description}</p>
            </div>
            `;
            characterElement.addEventListener('click', function () {
                this.classList.toggle('flipped');
            });
            charactersData.appendChild(characterElement);
        });

        if (data.meta.currentPage < data.meta.totalPages) {
            await fetchCharacters(page + 1);
        } else {
            console.log('All pages have been fetched.');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


document.getElementById('btn-Planet').addEventListener('click', function () {
    showPage('planets');
});

document.getElementById('btn-Characters').addEventListener('click', function () {
    showPage('characters');
});

function showPage(pageId) {
  
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    document.getElementById(pageId).style.display = 'block';

    if (pageId === 'planets') {
        fetchPlanets();
    } else if (pageId === 'characters') {
        fetchCharacters();
    }
}