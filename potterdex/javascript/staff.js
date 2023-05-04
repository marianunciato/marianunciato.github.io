let index = 0;
let staffResponse = [];

const defaultValue = '...';
const staffNotFound = {
    image: "./potterdex/img/not-found-image.png",
    name: 'Not found :)',
    species: defaultValue,
    dateOfBirth: defaultValue,
    patronus: defaultValue,
    house: defaultValue,
    ancestry: defaultValue
};

async function getStaff() {
    return new Promise(async (resolve, reject) => {
        const response = await fetch('https://hp-api.onrender.com/api/characters/staff');
        try {
            if (response.status === 200) {
                staffResponse = await response.json();
                resolve();
            }
        } catch (err) {
            reject();
        }
    });
}

async function searchStaff(event) {
    event.preventDefault();
    const name = document.getElementById('input__search');
    const staffFiltered = staffResponse.filter((staff, i) => {
        index = i;
        return staff.name.toLowerCase() === name.value.toLowerCase()
    });
    if (staffFiltered.length === 0) {
        showStaff(staffNotFound);
    } else {
        const [staff] = staffFiltered;
        showStaff(staff);
    }
}


function showStaff(staff) {
    const name = document.getElementById('name');
    name.innerText = staff.name;
    const image = document.getElementById('image');
    image.src = staff.image;
    const species = document.getElementById('species');
    species.innerText = staff.species;
    const dateOfBirth = document.getElementById('birth');
    dateOfBirth.innerText = staff.dateOfBirth;
    const patronus = document.getElementById('patronus');
    patronus.innerText = staff.patronus;
    const house = document.getElementById('house');
    house.innerText = staff.house;
    const ancestry = document.getElementById('ancestry');
    ancestry.innerText = staff.ancestry;
}


function showPrev() {
    index--;
    if (index < 0) {
        index = staffResponse.length - 1;
    }
    const staff = staffResponse.at(index);
    showStaff(staff);
}

function showNext(isLoadInitial = false) {
    if (!isLoadInitial) {
        index++;
    }
    if (index > staffResponse.length - 1) {
        index = 0;
    }
    const staff = staffResponse.at(index);
    showStaff(staff);
}

window.onload = () => {
    getStaff().then(() => {
        showNext(true);
    })
    const buttonSearch = document.getElementById('search__btn');
    buttonSearch.onclick = searchStaff;

    const inputSearch = document.querySelector('.input__search');
    inputSearch.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            searchStaff(event);
        }
    })

    const btnNext = document.getElementById('button__next');
    btnNext.onclick = () => showNext(false);
    const btnPrev = document.getElementById('button__previous');
    btnPrev.onclick = showPrev;
}