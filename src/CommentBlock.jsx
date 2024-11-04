import React, { useState } from "react";

const CommentBlock = ({ comment, addReplys,addDelete }) => {
  const [replyButton, setReplyButton] = useState(false);
  const [inputdata, setInputData] = useState("");

  const handleReply = () => {
    setReplyButton(!replyButton);
  };
  console.log(addDelete);

  const handleAdd = () => {
    addReplys(comment.id, inputdata);
    setInputData("");
    setReplyButton(!replyButton);
  };

  return (
    <div
      className="parent"
      style={{ border: "2px solid black", padding: "10px", margin: "10px 0" }}
      key={comment.id}
    >
      <h3>{comment.title}</h3>
      {replyButton && (
        <input
          type="text"
          value={inputdata}
          onChange={(e) => setInputData(e.target.value)}
        />
      )}
      <button onClick={replyButton ? handleAdd : handleReply}>
        {replyButton ? "Add" : "Reply"}
      </button>
      <button onClick={()=>addDelete(comment.id)}>Delete</button>

      {comment.reply.length > 0 && (
        <div style={{ marginLeft: "20px", marginTop: "10px" }}>
          {comment.reply.map((reply) => (
            <CommentBlock
              key={reply.id}
              comment={reply}
              addReplys={addReplys}
              addDelete={addDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBlock;
