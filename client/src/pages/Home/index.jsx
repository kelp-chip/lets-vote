import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import style from "./home.scss";
import { Button, TextField, Tooltip } from "@material-ui/core";

function Home() {
  const [pollId, setPollId] = useState("");
  const [validId, setValidId] = useState(true);
  const history = useHistory();

  const handleFindPoll = async (e) => {
    e.preventDefault();
    const res = await axios.get(`/api/poll/${pollId}`);

    if (res.data) {
      history.push(`/poll/${pollId}`);
    } else {
      setValidId(false);
    }
  };

  const handleInputChange = async (e) => {
    await setPollId(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleFindPoll} className={style.form}>
        {/* <h4 className="link-btn">Enter Voting Code</h4> */}
        <TextField
          inputProps={{
            style: { textAlign: "center", color: "#3f51b5" },
          }}
          fullWidth
          type="text"
          value={pollId}
          onChange={handleInputChange}
          label="Enter Poll Code"
          spellCheck="false"
        />
        <h5>{!validId && "sorry, not a valid poll id"}</h5>
        <Button fullWidth variant="contained" color="primary" type="submit">
          Find Poll
        </Button>
      </form>

      <Button
        fullWidth
        variant="outlined"
        color="primary"
        component={Link}
        to="/poll"
      >
        create your own poll
      </Button>
      {/* </Button> */}
    </div>
  );
}

export default Home;
