import React, { useState } from "react";
import axios from "axios";
import "./Post.css";

interface PostProps {
  parentId: string | null;
  onResponse: () => void;
}

const Post: React.FC<PostProps> = ({ parentId, onResponse }) => {
  const [operation, setOperation] = useState(parentId ? "+" : undefined);
  const [number, setNumber] = useState(1);

  const onClick = async () => {
    if (parentId) {
      await axios.post(`/api/discussions/${parentId}`, {
        operation,
        number,
      });
    } else {
      await axios.post(`/api/discussions/`, {
        operation,
        number,
        parentId,
      });
    }
    onResponse();
  };

  return (
    <div className={parentId ? "" : "text-center"}>
      {parentId && (
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
      )}
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />

      <button onClick={onClick} className={parentId ? "" : "secondary-button"}>
        {parentId ? "Reply" : "Post"}
      </button>
    </div>
  );
};

export default Post;
