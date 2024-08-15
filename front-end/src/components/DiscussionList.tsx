import React, { useState, useEffect } from "react";
import axios from "axios";
import { IDiscussion } from "../types";
import Discussion from "./Discussion";
import Post from "./Post";

const DiscussionList: React.FC = () => {
  const [discussions, setDiscussions] = useState<IDiscussion[]>([]);

  const fetchDiscussions = async () => {
    try {
      const response = await axios.get<IDiscussion[]>("/api/discussions");
      console.log(response.data);
      setDiscussions(response.data);
    } catch (error) {
      console.error("Error fetching discussions:", error);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  return (
    <div>
      <div className="card">
        <p className="text-center">What number is on your mind?</p>
        <Post parentId={null} onResponse={fetchDiscussions} />
      </div>
      <h4>Discussions</h4>
      {discussions.map((discussion) => (
        <Discussion
          key={discussion._id}
          discussion={discussion}
          onResponse={fetchDiscussions}
        />
      ))}
    </div>
  );
};

export default DiscussionList;
