const countryAPI = "https://www.randyconnolly.com/funwebdev/3rd/api/travel/countries.php";
//This API takes an optional parameter. Here is the behaviour:
//no paramters: returns all countries for which there are images
//iso=ALL: returns a list of all countries
//iso=[iso value]: returns just the country with the given ISO value (for example, iso=CA would return Canada)

const imageAPI = "https://www.randyconnolly.com/funwebdev/3rd/api/travel/images.php";
//This API takes optional parameters. Here is the behaviour:
//no paramters: returns all images
//id=ALL: also returns all images
//id=[id value]: return a single image with the given id value
//city=[city id]: returns all images from the city with the specified id value (for example city=5913490 would return all photos from Calgary)
//iso=[iso value]: returns all images from the country with the given ISO value (for example, iso=CA would return all cities in Canada)

const cityAPI = "https://www.randyconnolly.com/funwebdev/3rd/api/travel/cities.php";
//This API takes an optional parameters. Here is the behaviour:
//no paramters: returns all cities for which there are images
//id=ALL: returns a list of all cities
//id=[id value]: returns just the city with the given id value (for example, id=5913490 would return Calgary)
//iso=[iso value]: returns just the cities from the country with the given ISO value (for example, iso=CA would return all cities in Canada)

const languageAPI = "https://www.randyconnolly.com/funwebdev/3rd/api/travel/languages.php"

document.addEventListener("DOMContentLoaded", () => {

if (!JSON.parse(localStorage.getItem('countries'))) {
    fetch(countryAPI + "?iso=ALL")
        .then((response) => response.json())
        .then((countries) => {
            localStorage.setItem('countries', JSON.stringify(countries));

            countryOrderHelper(countries);
            clearCountryFilter();
        });
}
else{
    const countries = JSON.parse(localStorage.getItem('countries'));
    countryOrderHelper(countries);
    clearCountryFilter();
}

if (!JSON.parse(localStorage.getItem('countriesWithImagesAvailable'))) {
    fetch(countryAPI)
        .then((response) => response.json())
        .then((countriesWithImagesAvailable) => {

            //defines an array with country names for the countries with images available.
            const countryNamesWithImages = [];
            countriesWithImagesAvailable.forEach(country => {
                countryNamesWithImages.push(country.name);
            });

            localStorage.setItem('countriesWithImagesAvailable', JSON.stringify(countryNamesWithImages));
        });
}

if (!JSON.parse(localStorage.getItem('images'))) {
    fetch(imageAPI)
        .then((response) => response.json())
        .then((images) => {
            localStorage.setItem('images', JSON.stringify(images));
        });
}

if (!JSON.parse(localStorage.getItem('languages'))) {
    fetch(languageAPI)
        .then((response) => response.json())
        .then((languages) => {
            localStorage.setItem('languages', JSON.stringify(languages));
        });
}

if (!JSON.parse(localStorage.getItem('cities'))) {
    fetch(cityAPI + "?id=ALL")
        .then((response) => response.json())
        .then((cities) => {
            localStorage.setItem('cities', JSON.stringify(cities));
        });
}

if (!JSON.parse(localStorage.getItem('citiesWithImagesAvailable'))) {
    fetch(cityAPI)
        .then((response) => response.json())
        .then((citiesWithImagesAvailable) => {
            localStorage.setItem('citiesWithImagesAvailable', JSON.stringify(citiesWithImagesAvailable));
        });
}

document.querySelector(`.Countryfilters input[type="text"]`).addEventListener("input", (e) => {
    for (let box of document.querySelectorAll(`.continentFilterContainer input[type="checkbox"]`)) {
        box.checked = false;
    }
    if (!document.querySelector(".Cityfilters").classList.contains("hidden"))
    {
        document.querySelector(".Cityfilters").classList.toggle("hidden");
    }
    orderListByInput(e);
});

const button = document.querySelector("button");
button.addEventListener("click", (e) => {
    clearCountryFilter();
    orderListByImage(e);
    if (!document.querySelector(".Cityfilters").classList.contains("hidden"))
    {
        document.querySelector(".Cityfilters").classList.toggle("hidden");
    }
});

document.querySelector(".filteredCountryList").addEventListener("click", (e) => {
    if (e.target.nodeName == "P") {
        generateCountryDetails(e);
        generateCities(e);
        generateImages(e);
        generateMap(e);
        if (document.querySelector(".Cityfilters").classList.contains("hidden"))
        {
            document.querySelector(".Cityfilters").classList.toggle("hidden");
        }        
        clearCityFilter();
    }
});

document.querySelector(".continentFilterContainer").addEventListener("change", (e) => {
    document.querySelector(`.Countryfilters input[type="text"]`).value = "";
    orderListByContinent(e);
    if (!document.querySelector(".Cityfilters").classList.contains("hidden"))
    {
        document.querySelector(".Cityfilters").classList.toggle("hidden");
    }
});

document.querySelector(".Gallery").addEventListener("click", (e) => {
    if (e.target.nodeName == "IMG") {
        document.querySelector(".wrapper").classList.toggle("collapse");
        document.querySelector(".photoView").classList.toggle("hidden");
        generatephotoView(e);
    }
});

document.querySelector(".tabs").addEventListener("click", (e) => {
    const tabs = document.querySelector(".tabs");
    tabButtons = document.querySelectorAll(`.tabs > .clickable`);
    tabButtons.forEach((button) => {
        button.classList.remove("active");
    });
    if (e.target.id == "description") {
        tabs.querySelector(".photoViewDescription").classList.replace("hidden","placeholder");
        tabs.querySelector(".photoViewDetails").classList.replace("placeholder","hidden");
        tabs.querySelector(".photoViewMap").classList.replace("placeholder","hidden");
        e.target.classList.add("active");
    } else if (e.target.id == "details") {
        tabs.querySelector(".photoViewDetails").classList.replace("hidden","placeholder");
        tabs.querySelector(".photoViewDescription").classList.replace("placeholder","hidden");
        tabs.querySelector(".photoViewMap").classList.replace("placeholder","hidden");
        e.target.classList.add("active");
    } else if (e.target.id == "map") {
        tabs.querySelector(".photoViewMap").classList.replace("hidden","placeholder");
        tabs.querySelector(".photoViewDetails").classList.replace("placeholder","hidden");
        tabs.querySelector(".photoViewDescription").classList.replace("placeholder","hidden");
        e.target.classList.add("active");
    }
});

document.querySelector(".photoViewPhoto").addEventListener("mouseenter", (e) => {
    document.querySelector(".hoverView").classList.remove("hidden");
    generateHoverView(e);
});

document.querySelector(".photoViewPhoto").addEventListener("mouseleave", (e) => {
    document.querySelector(".hoverView").classList.add("hidden");
});

document.querySelector(".bio").addEventListener("click", (e) => {
    console.log(e)
    if (e.target.id == "photoclose") {
        document.querySelector(".wrapper").classList.toggle("collapse");
        document.querySelector(".photoView").classList.toggle("hidden");
        document.querySelector(".Cityfilters").classList.toggle("hidden");
        document.querySelector(".Gallery").replaceChildren()
        document.querySelector(".details").replaceChildren()
        document.querySelector(".googlemap").replaceChildren()
        document.querySelector(".filteredCityList").replaceChildren()
        const countries = JSON.parse(localStorage.getItem('countries'));
        countryOrderHelper(countries);
        clearCountryFilter();
    }
});

let allCollapseButtons = document.querySelectorAll("small");

allCollapseButtons.forEach(collapseButton => {
    collapseButton.addEventListener("click", (e) => {
        e.target.parentElement.classList.toggle("collapse");
    });

});

// City Listeners ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//empty city list when any filter is clicked.
let currentList;
document.querySelector(".Countryfilters").addEventListener("click", (e) => {
    let filteredList = [];
    cityOrderHelper(filteredList)
    clearCityFilter();
    if (!document.querySelector(".Cityfilters").classList.contains("hidden"))
    {
        document.querySelector(".Cityfilters").classList.toggle("hidden");
    }
});

document.querySelector(".filteredCityList").addEventListener("click", (e) => {
    if (e.target.nodeName == "P") {
        generateCityDetails(e);
        generateCityImages(e);
        generateCityMap(e);
    }
});

document.querySelector(`.Cityfilters input[type="text"]`).addEventListener("input", (e) => {
    orderCityListByInput(e);
});

const cityButton = document.querySelector("#cityImageFilter");
cityButton.addEventListener("click", (e) => {
    document.querySelector(`.Cityfilters input[type="text"]`).value = "";
    orderCityListByImage(e);
});

// CLEAR FILTERs
const clearCountryButton = document.querySelector("#clearCountryFilters");
clearCountryButton.addEventListener("click", (e) => {
    const countries = JSON.parse(localStorage.getItem('countries'));
    countryOrderHelper(countries);
    clearCountryFilter();
    clearCityFilter();
});

const clearCityButton = document.querySelector("#clearCityFilters");
clearCityButton.addEventListener("click", (e) => {
    const countries = JSON.parse(localStorage.getItem('countries'));
    const cities = JSON.parse(localStorage.getItem('cities'));

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
    clearCityFilter();

});
});