import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import axios from "axios";
import { useParams, withRouter } from "react-router-dom";
import DragHandleRounded from "@material-ui/icons/DragHandleRounded";
import style from "./Poll.scss";

function Poll() {
  const { id } = useParams();
  const [pollExists, setPollExists] = useState(true);
  const [name, setName] = useState("");
  const [options, setOptions] = useState([]);

  const handleGetPollData = async () => {
    const res = await axios.get(`/api/poll/${id}`);
    if (res.data) {
      const { name, choices } = res.data;
      await setPollExists(true);
      await setName(name);

      //add sort attribute to each choice and sort list
      const sortedChoices = [...choices]
        .map((choice) => ({ value: choice.value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort);

      await setOptions(sortedChoices);
    } else {
      await setPollExists(false);
    }
  };
  useEffect(() => {
    handleGetPollData();
  }, []);

  const onDragOver = (e) => {
    e.preventDefault();
  };

  if (pollExists) {
    return (
      <div>
        <h2>{name}</h2>
        <div className={style.sortedContainer}>
          {/* <div>
            <ul className={}>
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
          </div> */}
          <ul onDragOver={(e) => onDragOver(e)}>
            {/* {[{ value: "" }, { value: "" }, { value: "" }].map((choice, i) => (
            <li key={i} data-index={i} className={style.rowContainer}>
              <div className={style.listNumber}>{i + 1}</div>
              <div draggable className={style.draggable}>
                {choice.value}
                <DragHandleRounded
                  fontSize="inherit"
                  className={style.handle}
                />
              </div>
            </li>
          ))} */}
          </ul>
        </div>
        <ul onDragOver={(e) => onDragOver(e)} className={style.noVote}>
          {options.map((choice, i) => (
            <li key={i} data-index={i} className={style.rowContainer}>
              <div draggable className={style.draggable}>
                {choice.value}
                <DragHandleRounded
                  fontSize="inherit"
                  className={style.handle}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div>sorry, no such poll exists</div>;
  }
}

export default withRouter(Poll);
