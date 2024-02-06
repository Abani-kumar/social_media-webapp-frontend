import { useSelector } from "react-redux";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SocialLogin from "./pages/SocialLogin";
import MyProfile from "./components/Dashboard/MyProfile";
import PrivateRoute from "./components/common/PrivateRoute";
import PostListen from "./components/Dashboard/PostListen";
import CreateSection from "./components/common/CreateSection";
import MyPost from "./components/core/MyProfile/MyPost";
import EditProfile from "./components/core/MyProfile/EditProfile";
import ChangePassword from "./components/core/MyProfile/ChangePassword";
import SavedPost from "./components/core/MyProfile/SavedPost";
import Feed from "./components/core/Feed/Feed";
import Card from "./pages/Post";
import Comment from "./components/common/Comment";
import UserProfile from "./components/Dashboard/UserProfile";
import Profile from "./components/core/UserProfile.jsx/Profile";


function App() {

  return (
    <div className="w-screen min-h-screen bg-richblack-1000 flex flex-col font-inter ">
      <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register/>} />
            <Route path="/socialLogin" element={<SocialLogin />} />
            <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
              <Route path="feed" element={<PostListen/>}>
                <Route index element={<Feed/>}/>
                <Route path="post/:id" element={<Card/>}/>
              </Route>
              <Route path="profile" element={<MyProfile/>}>
                <Route path="myProfile" element={<MyPost/>}/>
                <Route path="post/:id" element={<Card/>}/>
                <Route path="editProfile" element={<EditProfile/>}/>
                <Route path="savedPost" element={<SavedPost/>}>
                  <Route path="post/:id" element={<Card/>}/>
                </Route>
                <Route path="changePassword" element={<ChangePassword/>}/>
              </Route>

              <Route path="user" element={<UserProfile/>}>
                <Route path="profile/:id" element={<Profile/>}/>
                <Route path="post/:id" element={<Card/>}/>
              </Route>
            </Route>
      </Routes>
    </div>
  );
}

export default App;
