import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewsAPI.css";

const apik = "485ebe54f35c4737b726d5965f282570"; // Replace with a valid key

function NewsAPI() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const url = `https://newsapi.org/v2/everything?q=tesla&from=2025-01-02&sortBy=publishedAt&apiKey=485ebe54f35c4737b726d5965f282570`;

    axios.get(url)
      .then((res) => setNews(res.data.articles))
      .catch((err) => {
        console.error("Axios Error:", err);
        setError("Failed to fetch news. Please try again later.");
      });
  }, []);

  return (
    <div className="Body-container">
      <h1 className="Heading">Breaking News</h1>

      {error && <p className="error-message">{error}</p>}

      {news.map((val, index) => (
        <div key={index} className="Container">
          <div className="card">
            <h3>{val.title}</h3>
            <h4 className="Author">{val.author || "Unknown Author"}</h4>
            {val.urlToImage && <img src={val.urlToImage} alt="news" className="image" />}
            <span>{val.description}</span>
            <div>
              <i>{new Date(val.publishedAt).toLocaleString()}</i>
              <br />
              <a href={val.url} className="anchor" target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsAPI;
