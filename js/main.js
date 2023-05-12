const openModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "flex"
}

const closeModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "none"
}

const handleModalClose = (event) => {
    if(event.target.className === "modal") {
        event.target.style.display = "none"
    }
}

const handleAddTicker = async (event) => {
    event.preventDefault()
    const ticker = event.target.ticker.value
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=6OU8R697MHZQST38`)
        const data = await response.json()
        console.log(data)
        const price = data["Global Quote"]["05. price"]
        if (price) {
            const newTicker = 
            `<div class="ticker">
                <h2>${ticker}</h2>
                <p>${price}</p>
            </div>`

            const tickerList = document.querySelector("#ticker-list")
            tickerList.innerHTML += newTicker
            closeModal('#add-stock')
        } else {
            alert(`Ticker ${ticker} não encontrado!`)
        }
    } catch(error) {
        alert(error)
    }
}

const modal = document.querySelector(".modal")
modal.addEventListener("click", handleModalClose)