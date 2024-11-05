import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const InputComponent = ({ inputvalue, handleSubmit, clearInput }) => {
  return (
    <>
      <div>
        <input
          type="text"
          value={inputvalue}
          onChange={handleSubmit}
          style={{ width: "30rem", height: "4rem", marginTop: "2rem" }}
        />
        {inputvalue && (
          <CloseIcon
            size="large"
            onClick={clearInput}
            style={{ cursor: "pointer", marginLeft: "-40px" }}
          />
        )}
      </div>
    </>
  );
};

export default InputComponent;
