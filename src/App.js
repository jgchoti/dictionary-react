import React, { useState } from "react";
import axios from "axios";
import Dictionary from "./Dictionary";
import "./App.css";

export default function App() {
  const [submittedWord, setSubmittedWord] = useState("");
  const [result, setResult] = useState({});

  function handleError() {
    alert(
      `Oops! We couldn't find the input in our database. \n Please submit another intriguing word! 🕵️‍♂️`
    );
    clearResult();
  }
  function clearResult() {
    setSubmittedWord("");
    setResult({});
  }

  function handleResponse(response) {
    console.log(submittedWord);
    const meanings = response.data[0].meanings;
    setResult({
      showResult: true,
      word: response.data[0].word,
      phonetic: response.data[0].phonetic,
      audio: response.data[0].phonetics[0]?.audio || "",
      definitions: meanings.map((meaning) => ({
        partOfSpeech: meaning.partOfSpeech,
        definition: meaning.definitions[0].definition,
        example: meaning.definitions[0].example,
      })),
    });
  }

  function handleRandomWord() {
    const randomWordsApiUrl =
      "https://random-word-api.herokuapp.com/word?number=1";
    axios
      .get(randomWordsApiUrl)
      .then(function (response) {
        const randomWord = response.data[0];
        setSubmittedWord(randomWord);
        fetchRandomWordDefinitions(randomWord);
      })
      .catch(handleRandomWord);
  }
  function fetchRandomWordDefinitions(submittedWord) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${submittedWord}`;
    axios.get(url).then(handleResponse).catch(handleRandomWord);
  }
  function fetchWordDefinitions(submittedWord) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${submittedWord}`;
    axios.get(url).then(handleResponse).catch(handleError);
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetchWordDefinitions(submittedWord);
  }

  function updateWord(event) {
    setSubmittedWord(event.target.value);
  }

  return (
    <div className="App">
      <h1>English Dictionary</h1>
      <div className="row">
        <div className="col-2">
          <button
            type="button"
            onClick={handleRandomWord}
            className="SearchButton"
          >
            Random
          </button>
        </div>
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Enter a word..."
              aria-label="Search"
              autoComplete="off"
              autoFocus={true}
              value={submittedWord}
              onChange={updateWord}
              className="form-control"
            />
          </form>
        </div>
        <div className="col-3">
          <button type="button" onClick={handleSubmit} className="SearchButton">
            Search
          </button>
        </div>
      </div>
      {result.showResult && <Dictionary data={result} />}
    </div>
  );
}
