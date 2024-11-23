import axiosInstance from "@/lib/axiosInstance";

export const fetchUserDetails = async () => {
  const response = await axiosInstance.get("/user/me");
  return response.data;
};

export const updateUserDetails = async (data) => {
  const response = await axiosInstance.patch("/user/update", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getUsersList = async () => {
  const response = await axiosInstance.get("/user/users");
  return response.data;
};

export const getSingleUser = async (userId) => {
  const response = await axiosInstance.get(`/user/user/${userId}`);
  return response.data;
};

export const createPost = async (data) => {
  const response = await axiosInstance.post("/post/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAllPosts = async () => {
  const response = await axiosInstance.get("/post");
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axiosInstance.delete(`/post/${postId}/delete`);
  return response.data;
};

export const likePost = async (postId) => {
  const response = await axiosInstance.post(`/post/${postId}/like`);
  return response.data;
};
export const unlikePost = async (postId) => {
  const response = await axiosInstance.post(`/post/${postId}/unlike`);
  return response.data;
};

export const getLikedPosts = async () => {
  const response = await axiosInstance.get("/post/liked/posts");
  return response.data;
};

export const getCommentsForPost = async (postId) => {
  const response = await axiosInstance.get(`/post/${postId}/comments`);
  return response.data;
};

export const postCommentForPost = async (data) => {
  const postId = data?.postId;
  const response = await axiosInstance.post(`/post/${postId}/comment`, data);
  return response.data;
};

export const sendConnectionRequest = async (userId) => {
  const response = await axiosInstance.post(
    `/user/send-connection-request/${userId}`
  );
  return response.data;
};

export const acceptConnectionRequest = async (userId) => {
  const response = await axiosInstance.post(
    `/user/accept-connection-request/${userId}`
  );
  return response.data;
};

export const getConnectionsList = async () => {
  const response = await axiosInstance.get(`/user/connections`);
  return response.data;
};

export const receivedConnectionRequest = async () => {
  const response = await axiosInstance.get("/user/connections/pending");
  return response.data;
};

export const getEvents = async () => {
  const response = await axiosInstance.get("/event/all/list");
  return response.data;
};

export const listParticipants = async (eventId) => {
  const response = await axiosInstance.get(`/event/participants/${eventId}`);
  return response.data.participants;
};

export const participateInEvent = async (eventId) => {
  const response = await axiosInstance.post(`/event/participate/${eventId}`);
  return response.data;
};

export const deleteParticipationInEvent = async (eventId) => {
  const response = await axiosInstance.delete(`/event/depart/${eventId}`);
  return response.data;
};

export const createEvent = async (data) => {
  const response = await axiosInstance.post(`event/create/event`, data);
  return response.data;
};
