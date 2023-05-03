let index = 0;
let spellsResponse = [];

async function getSpells() {
    return new Promise(async (resolve, reject) => {
        const response = await fetch('https://hp-api.onrender.com/api/spells');
        try {
            if (response.status === 200) {
                spellsResponse = await response.json();
                resolve();
            }
        } catch (err) {
            reject();
        }
    });
}

async function searchSpells() {
    const name = document.getElementById('input__search');
    const spellsFiltered  = spellsResponse.filter((spells, i) => {
        index = i;
        return spells.name.toLowerCase() === name.value.toLowerCase()
    });
    if (spellsFiltered.length === 0) {
        // validate not found spells
    } else {
        const [ spells ] = spellsFiltered;
        showSpells(spells);
    }
}

function showSpells(spells) {
    const description = document.getElementById('spell__description');
    console.log(spells);
    const nameMain = document.getElementById('spell__title');
    const nameContent = document.getElementById('spell__name');
    nameMain.innerText = spells.name;
    nameContent.innerText = spells.name;
    description.innerText = spells.description; 
}

function showPrev() {
    index--;
    if(index < 0) {
        index = spellsResponse.length - 1;
    }
    const spell = spellsResponse.at(index);
    showSpells(spell);
}

function showNext() {
    index++;
    if(index > spellsResponse.length - 1) {
        index = 0;
    }
    const spell = spellsResponse.at(index);
    showSpells(spell);
}

window.onload = () => {
    getSpells().then(() => {
        showNext();
    })
    const buttonSearch = document.getElementById('search__btn');
    buttonSearch.onclick = searchSpells;

    const btnNext = document.getElementById('button__next');
    btnNext.onclick = showNext;
    const btnPrev = document.getElementById('button__previous');
    btnPrev.onclick = showPrev;
}