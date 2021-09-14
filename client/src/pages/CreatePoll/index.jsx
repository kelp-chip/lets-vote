import React, { useState } from "react";
import "regenerator-runtime/runtime";
import axios from "axios";
import { withRouter, useHistory, Link } from "react-router-dom";
import { TextField, Grid, Button } from "@material-ui/core";
import style from "./CreatePoll.scss";

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
    <Grid item xs={12} sm={12} key={i}>
      <TextField
        fullWidth
        type="text"
        value={choice.value}
        onChange={(e) => handleInputChange(i, e)}
        key={i}
        label={`option ${i + 1}`}
      />
    </Grid>
  ));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={style.wrapper}>
          <TextField
            fullWidth
            label="Enter your question here"
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className={style.optionWrapper}>
          <Grid container spacing={3}>
            {choiceInputList}
          </Grid>
        </div>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        component={Link}
        to="/"
      >
        Cancel
      </Button>
    </div>
  );
}

export default withRouter(CreatePoll);
