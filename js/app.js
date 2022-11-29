function createStorage() {
    let countries = [];
return {
    setCountriesBackup: function(newCountries) {
    return countries = newCountries;
    },
    getCountriesBackup: function() {
    return countries;
    }
}
}

let store = createStorage();

const tabCountries = document.createElement("table");
tabCountries.id = "table";
tabCountries.className = "table table-bordered table-striped";
tabCountries.innerHTML = `<thead><tr><th>Name</th><th>Population</th><th>Area</th><th>Region</th></tr></thead><tbody></tbody>`;

    document.querySelector("#countries").append(tabCountries);

function renderCountries(restCountries) {
    htmlStr = restCountries.reduce((acc, country) => {
        return acc + `<tr>
            <td>${country.name}</td>
            <td>${country.area}</td>
            <td>${country.region}</td>
            <td>${country.population}</td>
        </tr>` 
    }, '');

    document.querySelector("tbody").innerHTML = htmlStr;
    
}
function getCountries() {
    fetch('https://restcountries.com/v2/all')
    .then(res => res.json())
    .then(function(data) {
        const filteredData = data.map((el) => {
            return {
                name: el.name,
                population: el.population,
                area : el.area,
                region: el.region
            }
});
    renderCountries(filteredData);
    store.setCountriesBackup(filteredData);
})
}

function getCountryName(nameCountry) {
    fetch(`https://restcountries.com/v2/name/${nameCountry}`)
    .then(res => res.json())
    .then(function(data) {
        const filteredData = data.map((el) => {
            return {
                name: el.name,
                population: el.population,
                area : el.area,
                region: el.region
            }
    });
        renderCountries(filteredData);
        store.setCountriesBackup(filteredData);
    })
    .catch((error) => {
        console.error("Error:", error);
        myError();
    });
}

function myError() {
    let htmlStr = "";
    htmlStr += `<tr><td colspan='4' class="text-center"> No such country found! </td></tr>`;
    document.querySelector("tbody").innerHTML = htmlStr;
}

function enterTheCountry() {
    const searchField = document.querySelector("#search");
    searchField.onkeyup = e => {
        const searchCountry = e.currentTarget.value.trim().toLowerCase();
        searchButton(searchCountry);
    }
    
}
    document.querySelector("#search").addEventListener("change", enterTheCountry());

function searchButton(searchCountry) {
    const buttonSearch = document.querySelector("#button1");
    buttonSearch.onclick = () => {
        getCountryName(searchCountry);
    }
    
}
    document.querySelector("#button1").addEventListener("click", searchButton());  

function deleteSearch() {
    const battonClear = document.querySelector("#button2")
    battonClear.onclick = () => {
        const searchField = document.querySelector("#search")
        searchField.value = ""
        getCountries();
    }
    
}
    document.querySelector("#button2").addEventListener("click", deleteSearch());

getCountries();







