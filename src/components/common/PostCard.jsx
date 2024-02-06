import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { AiFillMessage } from "react-icons/ai";
import { IoMdShare } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { formattedDate } from "../../utils/dateFormatter";
import { Link, useNavigate, useParams } from "react-router-dom";
import ShareModal from "../modals/ShareModal";
import {
  likePost,
  savePost,
  unLikePost,
  unsavePost,
} from "../../services/operations/postOpr";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import CreateComment from "./CreateComment";

const Post = (post) => {


  const {id}=useParams();

  const navigate = useNavigate();
  const { link } = post;
  const { token, user } = useSelector((state) => state.auth);
  const [images, setImages] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);

  const [shareModal, setShareModal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showComment, setShowComment] = useState(false);

  const [like, setLike] = useState(
    post.post.likes?.includes(user?._id) ? true : false
  );
  const [save, setSave] = useState(
    user.savedPost?.includes(post.post._id) ? true : false
  );

  useEffect(() => {
    setImages(post.post.images);
    setHashtags(post.post.hashtags);
    setLikes(post.post.likes.length);
    setComments(post.post.comments.length);
  }, []);

  async function handleLike(e) {
    e.preventDefault();
    like
      ? await unLikePost(post.post._id, token)
      : await likePost(post.post._id, token);
  }

  async function handleSave(e) {
    e.preventDefault();
    save
      ? await unsavePost(post.post._id, token)
      : await savePost(post.post._id, token);
  }

  const handleComment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowComment(!showComment);
  };

  const handleProfile = (e) => {
    e.stopPropagation();
  };

  const PostHandler=()=>{
    if(id===post.post._id){
      return;
    }
    else{
      navigate(`/dashboard/${link}/post/${post.post._id}`);
    }
  }

  const profileHandler=(e)=>{
    e.stopPropagation();
    if(id===post.post.user._id){
      return;
    }
    else{
      navigate(`/dashboard/user/profile/${post.post.user._id}`)
    }
  }

  const date = formattedDate(post.post.createdAt);


  return (
    <div className="w-[50vw] text-white relative mb-2 mx-auto">
      <div onClick={PostHandler} className="cursor-pointer">
        <div className="border-[1px] border-white">
          <div className="flex mt-3 ">
            <div className=" ml-2 w-[10%]" onClick={profileHandler}>
              <img
                src={post.post.user?.avatar}
                alt="pic"
                className="w-[50px] h-[50px] rounded-full"
              />
            </div>
            <div className="flex flex-col ml-2 mr-1 w-[85%]">
              <div className="flex gap-2 w-[100%]">
                <div className="w-[100%] flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="text-2xl font-bold" onClick={PostHandler}>
                      {post.post.user?.userName}
                    </div>
                    <div className="flex gap-2 text-richblack-100">
                      <div>{date}</div>
                      <div>ago</div>
                    </div>
                  </div>
                  <div>
                    <BsThreeDotsVertical />
                  </div>
                </div>
              </div>
              <span className="mt-2">{post.post.content}</span>
              <div className="flex gap-3 ">
                {hashtags.map((hashtag, i) => (
                  <div
                    key={i}
                    className="text-richblack-200 flex gap-1 hover:text-pure-greys-1000 cursor-pointer"
                  >{`# ${hashtag}`}</div>
                ))}
              </div>

              {/* image section */}
              <div className="w-[100%] grid grid-cols-2 gap-x-4 mt-4 -sm:grid-cols-1">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="postPic"
                    className=" rounded-md w-[100%] h-[90%] "
                  />
                ))}
              </div>

              {/* save,share,like comment button */}
              <div className="flex justify-between mt-2 mb-1">
                <div className="flex w-[15%] justify-between">
                  <div onClick={handleLike} className="flex gap-1 items-center">
                    {post.post.likes?.includes(user?._id) ? (
                      <FaHeart className="text-2xl text-pure-greys-1000" />
                    ) : (
                      <CiHeart className="text-2xl" />
                    )}
                    <div className="text-lg	">{likes}</div>
                  </div>
                  <div
                    onClick={handleComment}
                    className="flex gap-1 items-center"
                  >
                    <AiFillMessage className="text-lg cursor-pointer" />
                    <div className="text-lg">{comments}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div
                    className="text-lg cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setShareModal(
                        `http://localhost:3000/dashboard/post/${post.post._id}`
                      );
                      setShowModal(true);
                    }}
                  >
                    <IoMdShare />
                  </div>
                  <div onClick={handleSave} className="text-lg cursor-pointer">
                    {user.savedPost?.includes(post.post._id) ? (
                      <FaBookmark className="text-pure-greys-1000" />
                    ) : (
                      <CiBookmark />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showComment && (
        <CreateComment
          reply={post.post.user?.userName}
          postId={post.post?._id}
          setShowComment={setShowComment}
          cancel={"cancel"}
        />
      )}

      {showModal && (
        <ShareModal
          link={shareModal}
          setShareModal={setShareModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default Post;
