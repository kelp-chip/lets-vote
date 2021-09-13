import React, { useState } from "react";
import "regenerator-runtime/runtime";
import axios from "axios";
import "./style.css";

const timeInSeconds = { "1 hour": 3600, "1 day": 43200, "1 week": 302400 };

function App() {
  const [name, setName] = useState("");
  const [expiryTime, setExpiryTime] = useState("60");
  const [choices, setChoices] = useState([
    { value: "" },
    { value: "" },
    { value: "" },
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const expireAfterSeconds = Number(expiryTime);
    const res = await axios.post("/api/poll", {
      name,
      choices,
      expireAfterSeconds,
    });
    console.log(res.data);
  };

  const handleInputChange = async (index, e) => {
    let choicesArr = [...choices];
    choicesArr[index].value = e.target.value;
    if (index + 1 === choicesArr.length) {
      choicesArr.push({ value: "" });
    }
    setChoices(choicesArr);
  };

  const choiceInputList = choices.map((choice, i) => (
    <input
      type="text"
      value={choice.value}
      onChange={(e) => handleInputChange(i, e)}
      key={i}
    />
  ));
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <h1>CHOICESSSS</h1>
        {choiceInputList}
        <select
          value={expiryTime}
          onChange={(e) => {
            setExpiryTime(e.target.value);
          }}
        >
          <option value="60" selected>
            1 minutes
          </option>
          <option value="600">10 minutes</option>
          <option value="3600">1 hour</option>
          <option value="43200">1 day</option>
          <option value="302400">1 week</option>
        </select>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default App;
