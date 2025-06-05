import { useEffect, useState } from 'react';
import './RandomQuote.css';
import forward from '../../assets/images/forward.png';
import backward from '../../assets/images/backward.png';

function RandomQuote() {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function loadQuotes() {
    try {
      const response = await fetch("https://dummyjson.com/quotes");
      const data = await response.json();
      setQuotes(data.quotes);
      setCurrentIndex(0); // Start at the first quote
    } catch (error) {
      console.error("Error loading quotes:", error);
    }
  }

  useEffect(() => {
    loadQuotes();
  }, []);

  const goForward = () => {
    if (currentIndex < quotes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goBackward = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const quote = quotes[currentIndex] || {
    quote: "Difficulties increase the nearer we get to the goal.",
    author: "Johann Wolfgang Von Goethe",
  };

  return (
    <div className="container">
      <div className="quote">"{quote.quote}"</div>
      <div className="line"></div>
      <div className="bottom">
        <div className="author">- {quote.author}</div>
        <div className="icons">
          <img src={backward} onClick={goBackward} alt="Previous" style={{ cursor: 'pointer', opacity: currentIndex > 0 ? 1 : 0.4 }} />
          <img src={forward} onClick={goForward} alt="Next" style={{ cursor: 'pointer', opacity: currentIndex < quotes.length - 1 ? 1 : 0.4 }} />
        </div>
      </div>
    </div>
  );
}

export default RandomQuote;
