const authorEl = document.getElementById('author')
const cryptoEl = document.getElementById('crypto')
const weatherEl = document.getElementById('weather')

window.onload = () => {
	getImage()
	dogeCoin()
	getTime()
	weatherApi()
}

async function getImage() {
	try {
		const res = await fetch(
			'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature'
		)
		const data = await res.json()
		console.log('Image', data)
		document.body.style.backgroundImage = `url(${data.urls.full})`
		authorEl.textContent = `Photo by: ${data.user.name}`
	} catch (err) {
		alert(err)
	}
}

async function dogeCoin() {
	try {
		const res = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
		const data = await res.json()
		console.log('Crypto', data)
		document.getElementById('crypto-top').innerHTML = `
      <img src=${data.image.small} />
      <span>${data.name}</span>`
		document.getElementById('crypto').innerHTML += `
      <p id="current">Current: ${data.market_data.current_price.nok.toLocaleString()} kr</p>
      <p id="highest">Highest: ${data.market_data.high_24h.nok.toLocaleString()} kr</p>
      <p id="lowest">Lowest ${data.market_data.low_24h.nok.toLocaleString()} kr</p>`
	} catch (err) {
		alert(err)
	}
}

async function weatherApi() {
	const apiKey = 'b505883134b72a8aabf131728b5c93ac'
	const city = 'Stavanger'
	try {
		const res = await fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
		)
		const data = await res.json()
		console.log('Weather', data)
		const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
		weatherEl.innerHTML = `
      <img src=${iconUrl} />
      <p class="weather-temp">${data.main.temp.toFixed()}°</p>
      <p class="weather-city">${data.name}</p>`
	} catch (err) {
		alert(err)
	}
}

function getTime() {
	const date = new Date()
	document.getElementById('time').textContent = date.toLocaleTimeString('nor', {
		timeStyle: 'medium',
	})
	setInterval(getTime, 1000)
}
