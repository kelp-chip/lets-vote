import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

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
    // setValidId(true);
  };

  return (
    <div>
      <Link to="/poll">create a poll</Link>
      <form onSubmit={handleFindPoll}>
        <h4>Enter Voting Code</h4>
        <input
          type="text"
          value={pollId}
          onChange={handleInputChange}
          placeholder="enter code"
        ></input>
        <h5>{!validId && "sorry, not a valid poll id"}</h5>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default Home;
