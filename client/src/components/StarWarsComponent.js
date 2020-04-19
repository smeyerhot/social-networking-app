import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Starwars.css";

export default function Starwars() {
  let [charIndex, setCharIndex] = useState(1);
  const [character, setCharacter] = useState({});

  const url = `https://cdn.rawgit.com/akabab/starwars-api/0.2.1/api/id/${charIndex}.json`;
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const api = proxyurl + url
  // const api = "https://newsapi.org/v2/top-headlines?country=us&apiKey=d5cf45043cd34b59b432df10e3cef274"
  useEffect(() => {
    const loadChar = async () => {
      const result = await axios(api);
      console.log(result);
      setCharacter(result.data);
    };

    loadChar();
  }, [api]);

  let incCounter = () => {
    let counter = (charIndex += 1);
    setCharIndex(counter);
  };
  const { name, image, homeworld, species } = character;
  const characterHTML = (
    <div className="card">
      <div className="card-header">
        <h1 className="header-text">{name}</h1>
      </div>
      <div className="card-image">
        <img className="hero-image" src={image} alt="luke skywalker" />
      </div>
      <div className="card-footer">
        <p>{homeworld}</p>
        <p>{species}</p>
      </div>
    </div>
  );

  const buttonsHTML = (
    <div className="buttons-container">
      <button onClick={incCounter} value="next" >
        Click Me
      </button>
    </div>
  );

  return (
    <div className="Starwars">
      {characterHTML}
      {buttonsHTML}
    </div>
  );
}
