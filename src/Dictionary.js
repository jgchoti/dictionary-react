import React, { useEffect, useRef } from "react";

export default function Dictionary(props) {
  const audioRef = useRef(null);
  function generateMeanings(meaning, index) {
    return (
      <ul key={index}>
        <li>{meaning.partOfSpeech}</li>
        <li>{meaning.definition}</li>
        <li>{meaning.example}</li>
      </ul>
    );
  }
  const meaningElements = props.data.definitions.map(generateMeanings);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [props.data.word]);

  return (
    <div className="Dictionary">
      <div className="subHeading">
        <h2>{props.data.word}</h2>
      </div>
      <div className="phoneticContainer">
        <h3>{props.data.phonetic}</h3>
        {props.data.phonetic && (
          <audio controls>
            <source
              key={props.data.word}
              src={props.data.audio}
              type="audio/mpeg"
            />
          </audio>
        )}
      </div>
      <div className="meaningContainer">{meaningElements}</div>{" "}
    </div>
  );
}
