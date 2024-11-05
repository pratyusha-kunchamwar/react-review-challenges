import React, { useState } from "react";
import CommentBlock from "./CommentBlock";
import { v4 as uuidv4 } from "uuid";

const Minichallenge = () => {
  const [comment, setComment] = useState("");
  const [block, setBlock] = useState([]);

  const addComment = () => {
    if (comment.length > 0) {
      const data = {
        id: uuidv4(),
        title: comment,
        reply: [],
      };
      setBlock((prev) => [...prev, data]);
      setComment("");
    }
  };

  const addReplys = (parentId, inputdata) => {
    if (inputdata.length > 0) {
      const newReply = {
        id: uuidv4(),
        title: inputdata,
        reply: [],
      };
      setBlock((prev) => addReplyToParent(prev, parentId, newReply));
    }
  };

  //parent replys
  const addReplyToParent = (data, parentId, newReply) => {
    return data.map((curr) => {
      if (curr.id === parentId) {
        return {
          ...curr,
          reply: [...curr.reply, newReply],
        };
      } else if (curr.reply && curr.reply.length > 0) {
        return {
          ...curr,
          reply: addReplyToParent(curr.reply, parentId, newReply),
        };
      }
      return curr;
    });
  };
  //delete
  const addDelete = (deleteId) => {
    setBlock((prev) => deleteFromParent(prev, deleteId));
  };
  //parent delete
  const deleteFromParent = (data, deleteId) => {
    return data
      .map((curr) => {
        if (curr.id === deleteId) {
          return null;
        } else if (curr.reply && curr.reply.length > 0) {
          return {
            ...curr,
            reply: deleteFromParent(curr.reply, deleteId),
          };
        }
        return curr;
      })
      .filter((data) => data !== null);
  };

  return (
    <>
      <div>
        <textarea
          placeholder="handle data"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={addComment}>Add Main</button>
      </div>

      {block.map((comment) => (
        <CommentBlock
          key={comment.id}
          comment={comment}
          addReplys={addReplys}
          addDelete={addDelete}
        />
      ))}
    </>
  );
};

export default Minichallenge;
