import React, { useState } from "react";
import axios from "axios";
import InputComponent from "./InputComponent";
import SuggestionButton from "./SuggestionButton";

const API_URL = import.meta.env.VITE_API_URL
const Token = import.meta.env.VITE_GIT_TOKEN;

const TodayReview = () => {
  const [data, setData] = useState([]);
  const [inputvalue, setInputvalue] = useState("");
  const [buttonValue, setButtonValue] = useState(false);

  function handleSubmit(e) {
    const value = e.target.value;
    setInputvalue(value);
    getdata(value);
  }

  function handleSuggestion(value) {
    setButtonValue(!buttonValue);
    setInputvalue(value);
    setData([]);
  }
  const clearInput = () => {
    setInputvalue("");
    setData([]);
  };

  const getdata = async (query) => {
    if (!query) {
      setData([]);
      return;
    }
    try {
      let response = await axios.get(`${API_URL}?per_page=5&q=${query}`, {
        headers: {
          Authorization: `token ${Token}`,
        },
      });
      console.log(response);
      setData(response.data.items);
    } catch (error) {
      console.log("error in fetching");
    }
  };

  return (
    <>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <InputComponent
            inputValue={inputvalue}
            handleSubmit={handleSubmit}
            clearInput={clearInput}
          />
        </div>

        {!buttonValue &&
          data &&
          data.map((user) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <SuggestionButton
                key={user.id}
                user={user}
                handleSuggestion={handleSuggestion}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default TodayReview;
