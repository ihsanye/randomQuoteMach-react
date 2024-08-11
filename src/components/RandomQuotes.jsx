import React, { useState } from 'react'
import '../css/randomQuotes.css'
import axios from 'axios'

const base_url = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function RandomQuotes() {

    let quotes = [];

    const [quote, setQuote] = useState({
        quote: "Hello World",
        author: "A Programmer"
    })

    const getQuotes = async () => {
        const response = await axios.get(base_url);
        quotes = await response.data.quotes;
    }

    const getRandom = () => {
        const select = quotes[Math.floor(Math.random() * quotes.length)]
        setQuote(select);
    }

    const tweet = () => {
        window.open(`https://twitter.com/intent/tweet?text="${quote.quote}" -${quote.author}`)
    }

    getQuotes();

    return (
        <div className='container'>
            <div id="quote-box">
                <h1>Random Quote Machine</h1>
                <h3 id="text">{quote.quote}</h3>
                <p id="author">- {quote.author}</p>
                <div id="buttons">
                    <button onClick={tweet}><a target='_blank' href="twitter.com/intent/tweet" id="tweet-quote">share</a></button>
                    <button id="new-quote" onClick={getRandom}>New Quote</button>
                </div>
            </div>
        </div >
    )
}

export default RandomQuotes