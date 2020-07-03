let cityNameInput = document.getElementById("cityNameInput");
let container = document.getElementById("container");
let favoritesCitiesDiv = document.getElementById("favorites-cities");
let favoritesCities = [];

async function fetchMyApi(CityId) {
  let response = await fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" + CityId
  );
  let result = await response.json();
  console.log(result);
  write(result);
}

let searchBtn = document.getElementById("searchBtn");

searchBtn.onclick = () => {
  let BerlinId =
    cityNameInput.value + "&appid=c13254b018d7f2c33627c9a958a168bd";
  fetchMyApi(BerlinId);
};

function write(result) {
  container.innerHTML = "";
  let city = document.createElement("div");
  city.classList.add("city");
  let left = document.createElement("div");
  city.classList.add("left-col");
  let cityName = document.createElement("h2");
  cityName.innerHTML = result.name + " " + result.sys.country;
  let cityTemp = document.createElement("h3");
  cityTemp.innerHTML = Math.round(result.main.temp - 273.15);
  let cityMain = document.createElement("p");
  cityMain.innerHTML = result.weather[0].main;
  city.appendChild(left);
  left.appendChild(cityName);
  left.appendChild(cityTemp);
  left.appendChild(cityMain);
  let weatherImg = document.createElement("img");
  weatherImg.src = showImgFav(result.weather[0].main);
  weatherImg.classList.add("weatherImg");
  city.appendChild(weatherImg);
  let faviBtn = document.createElement("button");
  faviBtn.textContent = "❤️";
  left.appendChild(faviBtn);
  faviBtn.onclick = () => {
    addToFavorite(result);
  };
  container.appendChild(city);
}

function addToFavorite(result) {
  favoritesCities.push(result);
  showFavi();
}

function showFavi() {
  favoritesCitiesDiv.innerHTML = "";
  for (let city of favoritesCities) {
    let favoriteCity = document.createElement("div");
    let cityName = city.name;
    let cityTemp = Math.round(city.main.temp - 273.15);
    let cityMain = city.weather[0].main;
    favoriteCity.innerHTML = cityName + " " + cityTemp + " " + cityMain;
    favoritesCitiesDiv.appendChild(favoriteCity);

    let weatherImg = document.createElement("img");
    weatherImg.src = showImgFav(cityMain);
    weatherImg.classList.add("weatherImg");
    favoriteCity.appendChild(weatherImg);
  }
}

function showImgFav(cityMain) {
  let weatherImg = document.createElement("img");
  let imgSrc = "#";
  switch (cityMain) {
    case "Clouds":
      imgSrc = "4x/cloudy.png";
      break;
    case "Rain":
      imgSrc = "4x/rainy.png";
      break;
    case "Clear":
      imgSrc = "4x/sunny.png";
      break;

    default:
      break;
  }
  return imgSrc;
}
