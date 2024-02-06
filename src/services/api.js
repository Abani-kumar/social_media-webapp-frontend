const BASE_URL = process.env.REACT_APP_BASE_URL;
const AUTH_URL = process.env.REACT_APP_AUTH_URL;

export const authApi = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  PICTURE_API: BASE_URL + "/auth/picture",
};


export const passport={
  USER_DETAILS:AUTH_URL+"/login/userdetails",
  LOGOUT:AUTH_URL+"/logout",
  GOOGLE_LOGIN:AUTH_URL+"/google",
  GITHUB_LOGIN:AUTH_URL+"/github"
}

export const profileApi={
  UPDATE_PROFILE:BASE_URL+"/profile/updateProfile",
  CHANGE_PASSWORD:BASE_URL+"/profile/changePassword"
}

export const postApi={
  CREATE_POST:BASE_URL+"/post/createPost",
  ALL_POST:BASE_URL+"/post/myPost",
  POST_LISTEN:BASE_URL+"/post/Posts",
  LIKE_POST:BASE_URL+"/post/like",
  UNLIKE_POST:BASE_URL+"/post/unLike",
  SAVE_POST:BASE_URL+"/post/savePost",
  UNSAVE_POST:BASE_URL+"/post/unsavePost",
  ALLSAVE_POST:BASE_URL+"/post/getAllSavePost",
  POSTBY_ID:BASE_URL+"/post/postById",
  USERANDPOSTBY_ID:BASE_URL+"/post/userAndPostById",
  USER_POST:BASE_URL+"/post/userPosts",
}

export const commentApi={
  CREATE_COMMENT:BASE_URL+"/comment/createComment",
  CREATE_SUBCOMMENT:BASE_URL+"/comment/createSubComment"
}
