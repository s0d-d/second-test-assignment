import React, { useState, useEffect } from "react";
import axios from "axios";
import { IDiscussion } from "../types";
import Discussion from "./Discussion";
import Post from "./Post";
import { useAuth } from "../AuthProvider";

const DiscussionList: React.FC = () => {
  const [discussions, setDiscussions] = useState<IDiscussion[]>([]);
  const { user, authStatus } = useAuth();

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
        {user ? (
          <>
            <p className="text-center">What number is on your mind?</p>
            <Post parentId={null} onResponse={fetchDiscussions} />
          </>
        ) : (
          <p className="text-center">
            Please log in or sign up to join the discussion
          </p>
        )}
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
