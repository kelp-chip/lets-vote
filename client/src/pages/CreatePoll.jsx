import React, { useState } from "react";
import "regenerator-runtime/runtime";
import axios from "axios";
import { withRouter, useHistory } from "react-router-dom";

function CreatePoll() {
  const [name, setName] = useState("");
  const [expiryTime, setExpiryTime] = useState("60");
  const [choices, setChoices] = useState([
    { value: "" },
    { value: "" },
    { value: "" },
  ]);
  const history = useHistory();

  const removeBlankChoices = () => {
    let choicesArr = [...choices];
    const list = choicesArr.filter((choice) => choice.value !== "");
    return list;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let choices = removeBlankChoices();
    const expireAfterSeconds = Number(expiryTime);
    const res = await axios.post("/api/poll", {
      name,
      choices,
      //   expireAfterSeconds,
    });
    const { _id } = res.data;
    history.push(`/poll/${_id}`);
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
        <label htmlFor="name">
          <h3>name</h3>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <h3>options</h3>
        {choiceInputList}
        <select
          value={expiryTime}
          onChange={(e) => {
            setExpiryTime(e.target.value);
          }}
        >
          <option value="60">1 minutes</option>
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

export default withRouter(CreatePoll);
