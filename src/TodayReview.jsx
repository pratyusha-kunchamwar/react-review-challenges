import React, { useState } from "react";
import axios from "axios";

const url = "https://api.github.com/search/users";

const TodayReview= () => {
  const [data, setData] = useState([]);
  const [inputvalue, setInputvalue] = useState("");
  const [buttonValue, setButtonValue] = useState(false);

  function handleSubmit(e) {
    const value = e.target.value;
    setInputvalue(value);
    getdata(value);
  }

  function handlesug(value) {
    setButtonValue(!buttonValue);
    setInputvalue(value);
    setData([]);
  }

  const getdata = async (query) => {
    if (!query) {
      setData([]);
      return;
    }
    try {
      let response = await axios.get(`${url}?per_page=5&q=${query}`);
      console.log(response);
      setData(response.data.items);
    } catch (error) {
      console.log("error in fetching");
    }
  };

  return (
    <>
      <div>
        <h3>Input</h3>
        <input type="text" value={inputvalue} onChange={handleSubmit} />

        <h1>Suggestions</h1>
        {!buttonValue &&
          data &&
          data.map((user) => (
            <button key={user.id} onClick={() => handlesug(user.login)}>
              {user.login}
            </button>
          ))}
      </div>
    </>
  );
};

export default TodayReview
