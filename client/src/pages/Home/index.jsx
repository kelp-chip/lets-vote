import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styles from "./home.scss";
import { Button } from "@material-ui/core";

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
      <Button variant="contained" color="primary">
        <Button fullWidth component={Link} to="/poll">
          create a poll
        </Button>
      </Button>
      {/* <Link to="/poll" className={styles.btn}>
        create a poll
      </Link> */}
      <form onSubmit={handleFindPoll}>
        <h4 className="link-btn">Enter Voting Code</h4>
        <input
          type="text"
          value={pollId}
          onChange={handleInputChange}
          placeholder="enter code"
        ></input>
        <h5>{!validId && "sorry, not a valid poll id"}</h5>
        <input type="submit" className={styles.btn}></input>
      </form>
    </div>
  );
}

export default Home;
