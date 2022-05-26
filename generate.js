let filteredCitySection = ".filteredCityList"

function generateCountryDetails(e) {

    const countries = JSON.parse(localStorage.getItem('countries'));
    const languages = JSON.parse(localStorage.getItem('languages'));

    let clickedCountry = countries.find((country) => {
        return country.name == e.target.innerText;
    });

    const detailsSection = document.querySelector(".details");
    detailsSection.replaceChildren();

    let countryName = document.createElement("h1");
    countryName.textContent = "" + e.target.innerText;
    detailsSection.append(countryName);

    let areaDetails = document.createElement("p");
    areaDetails.textContent = "Area (km sq): " + clickedCountry.details.area.toLocaleString();
    detailsSection.insertAdjacentElement('beforeend', areaDetails);

    let populationDetails = document.createElement("p");
    populationDetails.textContent = "Population: " + clickedCountry.details.population.toLocaleString();
    detailsSection.insertAdjacentElement('beforeend', populationDetails);

    let currencyDetails = document.createElement("p");
    currencyDetails.textContent = "Currency: " + clickedCountry.details.currency + " (" + clickedCountry.details.currencyCode + ")";
    detailsSection.insertAdjacentElement('beforeend', currencyDetails);

    let domainDetails = document.createElement("p");
    domainDetails.textContent = "Domain: " + clickedCountry.details.domain;
    detailsSection.insertAdjacentElement('beforeend', domainDetails);

    let languageSet = clickedCountry.details.languages

    languageSet = clickedCountry.details.languages.split(",");

    for (lang of languageSet) {
        lang = lang.substring(0, 2);
    }

    let languageDetails = document.createElement("p");
    languageDetails.textContent = "Languages: ";

    for (let language of languages) {
        for (lang of languageSet) {

            if (language.iso.toUpperCase() == lang.substring(0, 2).toUpperCase()) {
                languageDetails.textContent += ", " + language.name;
            }
        }
    }
    languageDetails.textContent =  languageDetails.textContent.replace(',', '');
    detailsSection.insertAdjacentElement('beforeend', languageDetails);

    let neighbourDetails = document.createElement("p");
    neighbourDetails.textContent = "Neighbouring countries: ";

    countryNeighbours = clickedCountry.details.neighbours.split(",");

        for (neighbour of countryNeighbours) {
            let neighbouringCountry = countries.find((country) => {
                return country.iso == neighbour;
            });
            if (countryNeighbours.length >= 1 && countryNeighbours[0] != ""){
                neighbourDetails.textContent += ", " + neighbouringCountry.name;
            }
        }

        neighbourDetails.textContent =  neighbourDetails.textContent.replace(',', '');
        detailsSection.insertAdjacentElement('beforeend', neighbourDetails);

    let descDetails = document.createElement("p");
    descDetails.textContent = clickedCountry.description;
    detailsSection.insertAdjacentElement('beforeend', descDetails);
}

function generateImages(countryEvent) {

    const gallery = document.querySelector(".Gallery");
    gallery.innerHTML = "";

    const countriesWithImagesAvailable = JSON.parse(localStorage.getItem('countriesWithImagesAvailable'));

    if (!countriesWithImagesAvailable.includes(countryEvent.target.innerText)) {
        message = document.createElement("p");
        message.textContent = "There are no images available for " + countryEvent.target.innerText;
        gallery.append(message);
    }
    else {
        gallery.replaceChildren();
    }

    const images = JSON.parse(localStorage.getItem('images'));

    for (let image of images) {
        if (image.location.country == countryEvent.target.innerText) {
            let picture = document.createElement("picture");
            let source = document.createElement("source");
            let img = document.createElement("img");
            picture.id = image.id;
            source.srcset = `https://res.cloudinary.com/exsius/image/upload/c_scale,h_150,w_150/v1634106203/large1600/${image.filename}`;
            source.media = "(min-width: 1024px)";
            img.src = `https://res.cloudinary.com/exsius/image/upload/c_scale,h_75,w_75/v1634106203/large1600/${image.filename}`;
            img.alt = image.title;
            picture.className = "clickable";
            picture.append(source);
            picture.append(img);
            gallery.append(picture);
        }
    }

}

function generateCities(e) {
    const countries = JSON.parse(localStorage.getItem('countries'));
    const cities = JSON.parse(localStorage.getItem('cities'));

    let clickedCountry = countries.find((country) => {

        return country.name == e.target.innerText;
    });

    let filteredList = []

    for (let city of cities) {
        if (city.iso == clickedCountry.iso)
            filteredList.push(city.name)
    }

    cityOrderHelper(filteredList);
}

function generateCityDetails(e) {

    const countries = JSON.parse(localStorage.getItem('countries'));
    const cities = JSON.parse(localStorage.getItem('cities'));

    let clickedCity = cities.find((city) => {

        return city.name == e.target.innerText;
    });

    const detailsSection = document.querySelector(".details");
    detailsSection.replaceChildren();

    let cityName = document.createElement("h1");
    cityName.textContent = "" + e.target.innerText;
    detailsSection.append(cityName);

    let populationDetails = document.createElement("p");
    clickedCity.population = new Intl.NumberFormat('en-US', {style: 'decimal'}).format(clickedCity.population);
    populationDetails.textContent = "Population: " + clickedCity.population.toLocaleString();
    detailsSection.insertAdjacentElement('beforeend', populationDetails);

    let elevationDetails = document.createElement("p");
    elevationDetails.textContent = "Elevation: " + clickedCity.elevation.toLocaleString() + " m";
    detailsSection.insertAdjacentElement('beforeend', elevationDetails);

    let timezoneDetails = document.createElement("p");
    timezoneDetails.textContent = "Timezone: " + clickedCity.timezone.toLocaleString();
    detailsSection.insertAdjacentElement('beforeend', timezoneDetails);
}

function generateCityImages(cityEvent) {

    const gallery = document.querySelector(".Gallery");
    gallery.innerHTML = "";

    const citiesWithImagesAvailable = JSON.parse(localStorage.getItem('citiesWithImagesAvailable'));

    const cityNamesWithImages = [];
    citiesWithImagesAvailable.forEach(city => {
        cityNamesWithImages.push(city.name);
    });


    if (!cityNamesWithImages.includes(cityEvent.target.innerText)) {
        message = document.createElement("p");
        message.textContent = "There are no images available for " + cityEvent.target.innerText;
        gallery.append(message);
    }
    else {
        gallery.replaceChildren();
    }

    const images = JSON.parse(localStorage.getItem('images'));

    for (let image of images) {
        if (image.location.city == cityEvent.target.innerText) {
            let picture = document.createElement("picture");
            let source = document.createElement("source");
            let img = document.createElement("img");
            picture.id = image.id;
            source.srcset = `https://res.cloudinary.com/exsius/image/upload/c_scale,h_150,w_150/v1634106203/large1600/${image.filename}`;
            source.media = "(min-width: 1024px)";
            img.src = `https://res.cloudinary.com/exsius/image/upload/c_scale,h_75,w_75/v1634106203/large1600/${image.filename}`;
            img.alt = image.title;
            picture.className = "clickable";
            picture.append(source);
            picture.append(img);
            gallery.append(picture);
        }
    }
}

function generateMap(event) {

    const countries = JSON.parse(localStorage.getItem('countries'));
    const cities = JSON.parse(localStorage.getItem('cities'));

    let map = document.querySelector(".googlemap");
    let location;
    let zoom;
    map.replaceChildren();

    for (let country of countries) {
        if (event.target.innerText == country.name) {
            location = country.name;
            zoom = 6;
            break;
        }
    }

    const gmapAPI = `https://maps.googleapis.com/maps/api/staticmap?center=${event.target.innerText}&zoom=${zoom}&size=800x400&key=REDACTED`;
    fetch(gmapAPI).then((response) => response.blob()).then((image) => {
        let img = document.createElement("img");
        img.src = URL.createObjectURL(image);
        map.append(img);
    });
}

function generatephotoView(event) {

    const images = JSON.parse(localStorage.getItem('images'));

    const photo = document.querySelector(".photo");
    photo.innerHTML = "";
    const picture = event.target.parentNode.cloneNode(true);
    picture.classList.toggle("clickable");
    picture.childNodes[0].srcset = picture.childNodes[0].srcset.replace("h_150,w_150","h_800,w_800");
    picture.childNodes[1].src = picture.childNodes[1].src.replace("h_75,w_75","h_640,w_640");
    photo.append(picture);

    const desc = document.querySelector(".desc");
    desc.innerHTML = "";
    for (let image of images) {
        if (image.id == picture.id) {
            const title = document.createElement("h2");
            title.textContent = image.title;
            const user = document.createElement("P");
            const location = document.createElement("P");
            user.textContent = `${image.credit.actual}`;
            location.textContent = `${image.location.country}, ${image.location.city}`;
            desc.append(title);
            desc.append(user);
            desc.append(location);

            const overlay = document.querySelector(".overlay")

            const photoViewDesc = document.querySelector(".photoViewDescription")
            photoViewDesc.replaceChildren();
            let description = document.createElement("p");
            description.innerText = image.description;
            photoViewDesc.append(description);
    
            const photoViewDetails = document.querySelector(".photoViewDetails")
            photoViewDetails.replaceChildren();
            let exifInfo = document.createElement("h1");
            exifInfo.innerHTML = "model: " + image.exif.model + "<br/> aperture: " + image.exif.aperture  + "<br/> exposure time: " + image.exif.exposure_time
                                    + "<br/> focal length: " + image.exif.focal_length + "<br/> iso: " + image.exif.iso;
            photoViewDetails.append(exifInfo);

            const photoViewMap = document.querySelector(".photoViewMap")
            photoViewMap.replaceChildren();
            let photoLatitude = image.location.latitude;
            let photoLongitude = image.location.longitude;

            const gmapAPI = `https://maps.googleapis.com/maps/api/staticmap?center=${photoLatitude},${photoLongitude}&zoom=6&size=800x400&markers=${photoLatitude},${photoLongitude}&key=REDACTED`;
            fetch(gmapAPI).then((response) => response.blob()).then((image) => {                                                      
                let img = document.createElement("img"); 
                img.src = URL.createObjectURL(image);
                photoViewMap.append(img);
            });

            document.querySelector("#speak").addEventListener("click", (e) => {
                let utterance = new SpeechSynthesisUtterance();
                speechSynthesis.cancel();
                utterance.text = image.title;
                speechSynthesis.speak(utterance);
            });
        }
    }

};

function generateHoverView(event) {

    const images = JSON.parse(localStorage.getItem('images'));

    const div = document.querySelector(".hoverView");
    div.innerHTML = "";
    div.classList.toggle = "hidden";
    div.style.padding = "15px";
    div.style.minwidth = "40%";
    div.style.backgroundColor = "#DCDCDD";
    div.style.opacity = "0.7";
    div.style.position = "absolute";
    div.style.zindex = "3";
    div.style.margin = "10%";

    const picture = document.querySelector(".photo picture");
    
    for (let image of images) {
        if (image.id == picture.id) {
            const credit = document.createElement("p"); 
            credit.innerHTML = "actual: " + image.credit.actual + "<br/> creator: " + image.credit.creator + "<br/> source: " + image.credit.source
            const exif = document.createElement("P");
            exif.innerHTML = "model: " + image.exif.model + "<br/> aperture: " + image.exif.aperture  + "<br/> exposure time: " + image.exif.exposure_time
            + "<br/> focal length: " + image.exif.focal_length + "<br/> iso: " + image.exif.iso + "<br/> primary color pallete: ";
            div.append(credit);
            div.append(exif);

            const colors = image.colors
            colors.forEach((color) => {
                const colorBlock = document.createElement("DIV");
                colorBlock.style.backgroundColor = color;
                colorBlock.style.height = "32px";
                colorBlock.style.width = "32px";
                const colorID = document.createElement("P");
                colorID.innerText = color;
                div.append(colorID)
                div.append(colorBlock);
            });

        }
    }
}

function generateCityMap(event) {
    const cities = JSON.parse(localStorage.getItem('cities'));

    let map = document.querySelector(".googlemap");
    let location;
    let zoom;
    let latitude;
    let longitude;
    map.replaceChildren();

        for (let city of cities) {
        if (event.target.innerText == city.name) {
            location = city.name;
            zoom = 10;
            latitude = city.latitude;
            longitude = city.longitude;
            break;
        }
    }
    const gmapAPI = `https://maps.googleapis.com/maps/api/staticmap?center=${event.target.innerText}&zoom=${zoom}&size=800x400&markers=${latitude},${longitude}&maptype=roadmap&key=REDACTED`;
    fetch(gmapAPI).then((response) => response.blob()).then((image) => {
        let img = document.createElement("img");
        img.src = URL.createObjectURL(image);
        map.append(img);
    });
}
