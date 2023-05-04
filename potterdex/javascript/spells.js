let index = 0;
let spellResponse = [];

const defaultValue = '...';
const spellNotFound = {
    name: 'Not found :(',
    description: defaultValue
};

async function getSpell() {
    return new Promise(async (resolve, reject) => {
        const response = await fetch('https://hp-api.onrender.com/api/spells');
        try {
            if (response.status === 200) {
                spellResponse = await response.json();
                resolve();
            }
        } catch (err) {
            reject();
        }
    });
}

async function searchSpell (event) {
    event.preventDefault();
    const name = document.getElementById ('input__search');
    const spellFiltered = spellResponse.filter((spells, i) => {
        index = i;
        return spells.name.toLowerCase() === name.value.toLowerCase()
    });
    if (spellFiltered.length === 0) {
        showSpell(spellNotFound);
    } else {
        const [spells] = spellFiltered;
        showSpell(spells);
    }
}

function showSpell(spells) {
    const nameMain = document.getElementById('spell__title');
    nameMain.innerText = spells.name;
    const description = document.getElementById('spell__description');
    description.innerText = spells.description;
}

function showPrev() {
    index--;
    if (index < 0) {
        index = spellResponse.length - 1;
    }
    const spells = spellsResponse.at(index);
    showSpell(spells);
}

function showNext(isLoadInitial = false) {
    console.log(isLoadInitial)  
    if (!isLoadInitial) {
        console.log(isLoadInitial)
        index++;
    }
    if (index > spellResponse.length - 1) {
        index = 0;
    }
    const spells = spellResponse.at(index);
    showSpell(spells);
}

window.onload = () => {
    getSpell().then(() => {
        showNext(true);
    })
    const buttonSearch = document.getElementById('search__btn');
    buttonSearch.onclick = searchSpell;

    const inputSearch = document.querySelector('.input__search');
    inputSearch.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchSpell(event);
        }
    })
    
    const btnNext = document.getElementById('button__next');
    btnNext.onclick = () => showNext(false);
    const btnPrev = document.getElementById('button__previous');
    btnPrev.onclick = showPrev;
}