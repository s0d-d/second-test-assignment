import React from "react";
import { IDiscussion } from "../types";
import "./Discussion.css";
import Post from "./Post";
import { useAuth } from "../AuthProvider";

interface DiscussionProps {
  discussion: IDiscussion;
  onResponse: () => void;
}

const Discussion: React.FC<DiscussionProps> = ({ discussion, onResponse }) => {
  const { user } = useAuth();

  return (
    <div>
      <div style={{ marginLeft: discussion.parentId ? "20px" : "0" }}>
        <div className="discussion-container">
          <div className="discussion-user">User: {discussion.userId}</div>

          <div className="discussion-number">
            {discussion.operation &&
              `${discussion.operation}${discussion.number}=`}
            {discussion.result}
          </div>
          {user && (
            <div>
              <Post parentId={discussion._id} onResponse={onResponse} />
            </div>
          )}
        </div>
        <div>
          {discussion.children.length > 0 && (
            <div>
              {discussion.children.map((child) => (
                <Discussion
                  key={child._id}
                  discussion={child}
                  onResponse={onResponse}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discussion;
