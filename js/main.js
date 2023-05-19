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
        const price = data["Global Quote"]["05. price"]
        const previousClosePrice = data["Global Quote"]["08. previous close"]
        if (price && previousClosePrice) {
            const priceFormatted = parseFloat(price).toFixed(2)
            const previousClosePriceFormatted = parseFloat(previousClosePrice).toFixed(2)
            let priceChange = ''
            let Symbol = ''
            if (priceFormatted !== previousClosePriceFormatted) {
                if (priceFormatted > previousClosePriceFormatted) {
                    priceChange = 'increase'
                    Symbol = '▲'
                } else {
                    priceChange = 'decrease'
                    Symbol = '▼'
                }
            }
            const newTicker = 
            `<div class="ticker">
                <button class="btn-close" onclick="removeTicker(event)">x</button>
                <h2>${ticker}</h2>
                <p class="${priceChange}">${Symbol} U$ ${priceFormatted}</p>
            </div>`

            const tickerList = document.querySelector("#tickers-list")
            tickerList.innerHTML = newTicker + tickerList.innerHTML
            addTickerCloseEvent()
            closeModal('#add-stock')
        } else {
            alert(`Ticker ${ticker} não encontrado!`)
        }
    } catch(error) {
        alert(error)
    }
}

const handleTickerMouseEnter = (event) => {
    const ticker = event.target
    const btnClose = ticker.querySelector(".btn-close")
    btnClose.style.display = "block"
}

const handleTickerMouseLeave = (event) => {
    const ticker = event.target
    const btnClose = ticker.querySelector(".btn-close")
    btnClose.style.display = "none"
}

const addTickerCloseEvent = () => {
    const tickers = document.querySelectorAll(".ticker")
    tickers.forEach((ticker, index) => {
        ticker.addEventListener("mouseenter", handleTickerMouseEnter)
        ticker.addEventListener("mouseleave", handleTickerMouseLeave)
    })
}

const removeTicker = (event) => {
    const btnClose = event.target
    const ticker = btnClose.closest('.ticker')
    ticker.remove()
}

const refreshTicker = (event) => {
    console.log('teste')
    const btnRefresh = event.target
    const currentPrice = btnRefresh.previousSibling
    currentPrice.remove()
}

const modal = document.querySelector(".modal")
modal.addEventListener("click", handleModalClose)

addTickerCloseEvent()