import React, { useState } from 'react'
import '../css/randomQuotes.css'
import axios from 'axios'
import { FaTwitter, FaQuoteLeft } from "react-icons/fa";

const base_url = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

const getRandomColor = () => {
    const red = Math.floor(Math.random() * 128);
    const green = Math.floor(Math.random() * 128);
    const blue = Math.floor(Math.random() * 128);

    return `rgb(${red}, ${green}, ${blue})`;
};

function RandomQuotes() {

    let quotes = [];

    const [quote, setQuote] = useState({
        quote: "Hello World",
        author: "A Programmer"
    })

    const [randomColor, setRandomColor] = useState(getRandomColor());

    const getQuotes = async () => {
        const response = await axios.get(base_url);
        quotes = await response.data.quotes;
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    const tweet = () => {
        window.open(`https://twitter.com/intent/tweet?text="${quote.quote}" -${quote.author}`)
    }

    const changeQuote = async () => {
        setQuote(await getQuotes());
        setRandomColor(getRandomColor());
    };

    return (
        <div className='container' style={{ backgroundColor: randomColor }}>
            <div id="quote-box">
                <h1 style={{ margin: "20px", color: randomColor }} >Random Quote Machine</h1>
                <h3 id="text" style={{ color: randomColor }}><FaQuoteLeft size="30" style={{ marginRight: "10px" }} />{quote.quote}</h3>
                <p id="author" style={{ color: randomColor }}>- {quote.author}</p>
                <div id="buttons">
                    <button onClick={tweet} style={{ backgroundColor: randomColor }}><a target='_blank' href="twitter.com/intent/tweet" id="tweet-quote" ><FaTwitter color="white" size="25px" /></a></button>
                    <button id="new-quote" onClick={changeQuote} style={{ backgroundColor: randomColor }}>New Quote</button>
                </div>
            </div>
        </div >
    )
}

export default RandomQuotes