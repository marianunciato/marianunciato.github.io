let index = 0;
let studentsResponse = [];

const defaultValue = '...';
const studentNotFound = {
    image: './img/not-found-image.png',
    name: defaultValue,
    species: defaultValue,
    dateOfBirth: defaultValue,
    patronus: defaultValue,
    house: defaultValue,
    ancestry: defaultValue
};

async function getStudents() {
    return new Promise(async (resolve, reject) => {
        const response = await fetch('https://hp-api.onrender.com/api/characters/students');
        try {
            if (response.status === 200) {
                studentsResponse = await response.json();
                resolve();
            }
        } catch (err) {
            reject();
        }
    });
}

async function searchStudent(event) {
    event.preventDefault();
    const name = document.getElementById('input__search');
    const studentFiltered = studentsResponse.filter((student, i) => {
        index = i;
        return student.name.toLowerCase() === name.value.toLowerCase()
    });
    if (studentFiltered.length === 0) {
        showStudent(studentNotFound);
    } else {
        const [student] = studentFiltered;
        showStudent(student);
    }
}


function showStudent(student) {
    const image = document.getElementById('image');
    image.src = student.image;
    const name = document.getElementById('name');
    name.innerText = student.name;
    const species = document.getElementById('species');
    species.innerText = student.species;
    const dateOfBirth = document.getElementById('birth');
    dateOfBirth.innerText = student.dateOfBirth;
    const patronus = document.getElementById('patronus');
    patronus.innerText = student.patronus;
    const house = document.getElementById('house');
    house.innerText = student.house;
    const ancestry = document.getElementById('ancestry');
    ancestry.innerText = student.ancestry;
}


function showPrev() {
    index--;
    if (index < 0) {
        index = studentssResponse.length - 1;
    }
    const student = studentsResponse.at(index);
    showStudent(student);
}

function showNext(isLoadInitial = false) {
    if (!isLoadInitial) {
        index++;
    }
    if (index > studentsResponse.length - 1) {
        index = 0;
    }
    const student = studentsResponse.at(index);
    showStudent(student);
}

window.onload = () => {
    getStudents().then(() => {
        showNext(true);
    })
    const buttonSearch = document.getElementById('search__btn');
    buttonSearch.onclick = searchStudent;

    const inputSearch = document.querySelector('.input__search');
    inputSearch.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            searchStudent(event);
        }
    })

    const btnNext = document.getElementById('button__next');
    btnNext.onclick = showNext;
    const btnPrev = document.getElementById('button__previous');
    btnPrev.onclick = showPrev;
}