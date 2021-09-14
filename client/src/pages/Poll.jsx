import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import axios from "axios";
import { useParams, withRouter } from "react-router-dom";

function Poll() {
  const { id } = useParams();
  const [pollExists, setPollExists] = useState(false);
  const [name, setName] = useState("");
  const [options, setOptions] = useState([]);

  const handleGetPollData = async () => {
    const res = await axios.get(`/api/poll/${id}`);
    if (res.data) {
      const { name, choices } = res.data;
      await setPollExists(true);
      await setName(name);
      await setOptions(choices);
    }
  };
  useEffect(() => {
    handleGetPollData();
  });

  if (pollExists) {
    return (
      <div>
        <h1>{name}</h1>
        <ul>
          {options.map((choice, i) => (
            <li key={i}>{choice.value}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div>no poll</div>;
  }
}

export default withRouter(Poll);