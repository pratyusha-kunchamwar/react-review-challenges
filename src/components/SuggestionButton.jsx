import React from "react";

const SuggestionButton = ({ user, handleSuggestion }) => {
  return (
    <div>
      <button
        style={{
          backgroundColor: "lightpink",
          width: "30rem",
          marginTop: "5px",
          border: "none",
        }}
        key={user.id}
        onClick={() => handleSuggestion(user.login)}
      >
        {user.login}
      </button>
    </div>
  );
};

export default SuggestionButton;
