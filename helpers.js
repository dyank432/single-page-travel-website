function citiesIn(country) {
    const ALL_CITIES = JSON.parse(localStorage.getItem('cities'));
    
    return ALL_CITIES.filter(city => city.iso == country.iso);
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

function cityOrderHelper(filteredList) {
    const cityListSection = document.querySelector(".filteredCityList");
    cityListSection.innerHTML = "";

    let alphabeticallySortedCities = filteredList.sort(function (a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });

    for (city of alphabeticallySortedCities) {
        cityName = document.createElement("p");
        cityName.textContent = city;
        cityName.className = "clickable";
        cityListSection.append(cityName);
    }
}