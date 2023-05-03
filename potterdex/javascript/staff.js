let index = 0;
let staffResponse = [];

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

async function searchStaff() {
    const name = document.getElementById('input__search');
    const staffFiltered  = staffResponse.filter((staff, i) => {
        index = i;
        return staff.name.toLowerCase() === name.value.toLowerCase()
    });
    if (staffFiltered.length === 0 ) {
        // validate not found staff
    } else {
        const [ staff ] = staffFiltered;
        showStaff(staff);
    }
}


function showStaff(staff) {
    console.log(staff);
    const image = document.getElementById('image');
    image.src = staff.image;
    const name = document.getElementById('name');
    name.innerText = staff.name;
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
    if(index < 0) {
        index = staffResponse.length - 1;
    }
    const staff = staffResponse.at(index);
    showStaff(staff);
}

function showNext() {
    index++;
    if(index > staffResponse.length - 1) {
        index = 0;
    }
    const staff = staffResponse.at(index);
    showStaff(staff);
}

window.onload = () => {
    getStaff().then(() => {
        showNext();
    })
    const buttonSearch = document.getElementById('search__btn');
    buttonSearch.onclick = searchStaff;

    const btnNext = document.getElementById('button__next');
    btnNext.onclick = showNext;
    const btnPrev = document.getElementById('button__previous');
    btnPrev.onclick = showPrev;
}