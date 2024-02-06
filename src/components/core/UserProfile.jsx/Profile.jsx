import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserAndPostById } from "../../../services/operations/postOpr";
import Hashtag from "../../common/Hashtag";
import ProfileCard from "../../common/ProfileCard";
import Post from "../../common/PostCard";

const Profile = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { _id } = user;

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  let response = [];

  const helper = async () => {
    response = await getUserAndPostById(id, token);
    setResult(response);
    setPosts(result.result?.post);
    if (result.result?.follower.includes(_id)) {
      setIsFollowing(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    helper();
  }, []);

  return (
    <>
      <div className="text-white w-[100vw]">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="flex justify-between -sm:flex-col">
            <div className="sticky top-0 z-20 w-[20vw] -sm:w-[90vw]">
              <div>
                <ProfileCard
                  avatar={result.result?.avatar}
                  name={result.result?.userName}
                  tagLine={result.result?.tagLine}
                  shortBio={result?.result?.shortBio}
                  portFolio={result.result?.portFolio}
                  email={result.result?.email}
                  follower={result.result?.follower}
                  following={result.result?.following}
                  buttonText={isFollowing ? "Followed" : "Follow"}
                />
              </div>
            </div>

            {/* Post section */}
            {posts?.length === 0 ? (
              <div className="flex justify-center items-center w-[100%] h-[100%] text-white text-4xl">
                No post available
              </div>
            ) : (
              <div className="mt-6 z-10">
                {posts?.map((post, index) => (
                  <Post id={post._id} post={post} key={index} link={"user"} />
                ))}
              </div>
            )}

            {/* Hashtag section */}
            <div className="sticky-0 top-0 z-20 -sm:hidden">
              <div className="mr-8 mt-6">
                <Hashtag
                  tag1={"javascript"}
                  tag2={"typescript"}
                  tag3={"java"}
                  tag4={"python"}
                  tag5={"react"}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
