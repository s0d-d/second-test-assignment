import React, { useState } from "react";
import axios from "axios";
import "./Post.css";
import { useAuth } from "../AuthProvider";
import API_ENDPOINTS from "../config/apiUrls";

interface PostProps {
  parentId: string | null;
  onResponse: () => void;
}

const Post: React.FC<PostProps> = ({ parentId, onResponse }) => {
  const [operation, setOperation] = useState(parentId ? "+" : undefined);
  const [number, setNumber] = useState(1);
  const { user } = useAuth();

  const onClick = async () => {
    if (!user) {
      throw new Error("User not found");
    }
    if (parentId) {
      await axios.post(`${API_ENDPOINTS.DISCUSSIONS}/${parentId}`, {
        operation,
        number,
        userId: user.id,
      });
    } else {
      await axios.post(API_ENDPOINTS.DISCUSSIONS, {
        operation,
        number,
        parentId,
        userId: user.id,
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

      <button
        onClick={onClick}
        className={parentId ? "link-button" : "secondary-button"}
      >
        {parentId ? "Reply" : "Post"}
      </button>
    </div>
  );
};

export default Post;
