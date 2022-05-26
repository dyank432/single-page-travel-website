function clearCountryFilter() {
    for (let box of document.querySelectorAll(`.continentFilterContainer input[type="checkbox"]`)) {
        box.checked = false;
    }
    document.querySelector(`.Countryfilters input[type="text"]`).value = "";
}

function clearCityFilter() {
    document.querySelector(`.Cityfilters input[type="text"]`).value = "";
}

function orderListByInput(filterEvent) {

    const countries = JSON.parse(localStorage.getItem('countries'));

    let filteredCountries = [];

    if (filterEvent.target.name == "nameFilter") {
        for (let country of countries) {
            if (country.name.toUpperCase().startsWith(filterEvent.target.value.toUpperCase())) {
                filteredCountries.push(country);
            }
        }
    }

    countryOrderHelper(filteredCountries);
}

function orderListByImage(filterEvent) {

    const countries = JSON.parse(localStorage.getItem('countries'));
    const countriesWithImagesAvailable = JSON.parse(localStorage.getItem('countriesWithImagesAvailable'));

    let filteredCountries = [];

    for (country of countries) {
        if (countriesWithImagesAvailable.includes(country.name))
            filteredCountries.push(country);
    }

    countryOrderHelper(filteredCountries);
}

function countryOrderHelper(countries) {

    const countryListSection = document.querySelector(".filteredCountryList");
    countryListSection.innerHTML = "";

    let alphabeticallySortedCountries = countries.sort(function (a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });

    for (country of alphabeticallySortedCountries) {
        countryName = document.createElement("p");
        countryName.textContent = country.name;
        countryName.className = "clickable";
        countryListSection.append(countryName);
    }
}

function orderListByContinent(filterEvent) {

    const countries = JSON.parse(localStorage.getItem('countries'));
    let allCheckboxes = document.querySelectorAll("input[type=checkbox]");
    let filteredCountries = [];

    //populates list when checkboxes are checked
    if (filterEvent.target.name == "Africa" || allCheckboxes[0].checked) {
        for (let country of countries) {
            if (country.continent == "AF" && !filteredCountries.includes(country.name)) {
                filteredCountries.push(country);
            }
        }
    }
    if (filterEvent.target.name == "Antarctica" || allCheckboxes[1].checked) {
        for (let country of countries) {
            if (country.continent == "AN" && !filteredCountries.includes(country.name)) {
                filteredCountries.push(country);
            }
        }
    }
    if (filterEvent.target.name == "Asia" || allCheckboxes[2].checked) {
        for (let country of countries) {
            if (country.continent == "AS" && !filteredCountries.includes(country.name)) {
                filteredCountries.push(country);
            }
        }
    }
    if (filterEvent.target.name == "Europe" || allCheckboxes[3].checked) {
        for (let country of countries) {
            if (country.continent == "EU" && !filteredCountries.includes(country.name)) {
                filteredCountries.push(country);
            }
        }
    }
    if (filterEvent.target.name == "NorthAmerica" || allCheckboxes[4].checked) {
        for (let country of countries) {
            if (country.continent == "NA" && !filteredCountries.includes(country.name)) {
                filteredCountries.push(country);
            }
        }
    }
    if (filterEvent.target.name == "Oceania" || allCheckboxes[5].checked) {
        for (let country of countries) {
            if (country.continent == "OC" && !filteredCountries.includes(country.name)) {
                filteredCountries.push(country);
            }
        }
    }
    if (filterEvent.target.name == "SouthAmerica" || allCheckboxes[6].checked) {
        for (let country of countries) {
            if (country.continent == "SA" && !filteredCountries.includes(country.name)) {
                filteredCountries.push(country);
            }
        }
    }
    // clears countries if box is unchecked
    for (checkbox of allCheckboxes) {
        if (checkbox.checked == false) {
            for (country of countries) {
                if (country.continent == checkbox.id && filteredCountries.includes(country)) {
                    let countryIndex = filteredCountries.indexOf(country);
                    filteredCountries.splice(countryIndex, 1);
                }
            }
        }
    }
    if (filteredCountries.length == 0) {
        filteredCountries = countries;
    }

    countryOrderHelper(filteredCountries);
}

// city filters ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function orderCityListByInput(filterEvent) {

    const cities = JSON.parse(localStorage.getItem('cities'));
    const countries = JSON.parse(localStorage.getItem('countries'));

    let currentCityList = [];
    
    let allCityPara = document.querySelectorAll(".filteredCityList > p");

        for (cityPara of allCityPara){
            cityPara.style.display = "block";
            currentCityList.push(cityPara.textContent);            
        }

    let filteredCities = [];

    if (filterEvent.target.name == "cityNameFilter") {
        for (let city of currentCityList) {
            if (city.toUpperCase().startsWith(filterEvent.target.value.toUpperCase())) {
                filteredCities.push(city);
            }
        }
    }

    for (cityPara of allCityPara){
            if (!filteredCities.includes(cityPara.innerText)){
                cityPara.style.display = "none";
            }
        }
}

function orderCityListByImage(filterEvent) {

    const countries = JSON.parse(localStorage.getItem('countries'));
    const cities = JSON.parse(localStorage.getItem('cities'));
    const citiesWithImagesAvailable = JSON.parse(localStorage.getItem('citiesWithImagesAvailable'));

    let currentParaList = [];
    let currentCityList = [];
    let allCityPara = document.querySelectorAll(".filteredCityList > p");

  
    for (cityPara of allCityPara){
        cityPara.style.display = "block";
        currentParaList.push(cityPara.textContent);            
    }
    if (allCityPara.length > 0) {
        let citySearch = cities.find((city) => {
            return city.name == allCityPara[0].innerText;
        });
        let clickedCountry = countries.find((country) => {
            return country.iso == citySearch.iso;
        });

        currentCityList = citiesIn(clickedCountry)
    }

    let filteredCities = [];

    for (let city of currentCityList) {
        for (let cityWithImg of citiesWithImagesAvailable) {
            if (cityWithImg.id == city.id)
                filteredCities.push(city.name);
        }
    }

    for (cityPara of allCityPara){
        if (!filteredCities.includes(cityPara.innerText)){
            cityPara.style.display = "none";
        }
    }
}