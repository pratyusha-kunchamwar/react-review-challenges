import React, { useState } from "react";
import CommentBlock from "./CommentBlock";

const Minichallenge = () => {
  const [comment, setComment] = useState("");
  const [block, setBlock] = useState([]);

  const addComment = () => {
    const data = {
      id: Date.now(),
      title: comment,
      reply: [],
    };
    setBlock((prev) => [...prev, data]);
    setComment("");
  };

  const addReplys = (parentId, inputdata) => {
    const newReply = {
      id: Date.now(),
      title: inputdata,
      reply: [],
    };

      setBlock((prev) => {
        const search = (data) => {
          return data.map((curr) => {
            if (curr.id === parentId) {
              return {
                ...curr,
                reply: [...curr.reply, newReply],
              };
            } else if (curr.reply && curr.reply.length > 0) {
              return {
                ...curr,
                reply: search(curr.reply),
              };
            }
            return curr;
          });
        };

        return search(prev);
      });
    };
  const addDelete = (deleteId) => {
    setBlock((prev) => {
      const search = (data) => {
         return data.map((curr) => {
            if (curr.id === deleteId) {
              return null;
            } else if (curr.reply && curr.reply.length > 0) {
              return {
                ...curr,
                reply: search(curr.reply),
              };
            }
            return curr;
          })
          .filter((data) => data !== null);
      };

      return search(prev);
    });
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
