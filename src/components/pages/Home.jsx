import React from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  deletePost,
  getAllPosts,
  getLikedPosts,
  likePost,
  unlikePost,
} from "@/http/route";
import { useToast } from "@/hooks/use-toast";
import PostForm from "../homePage/PostForm";
import Comments from "../homePage/Comment";
import { Button } from "../ui/button";
import { FaComment, FaHeart, FaTrash } from "react-icons/fa";

const Home = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      toast({
        title: "Post Created Successfully",
        description: data.message || "Post Created Successfully.",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["list-posts"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred.",
        variant: "destructive",
      });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      toast({
        title: "Post Deleted Successfully",
        description: data.message || "Post Deleted Successfully",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["list-posts"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred.",
        variant: "destructive",
      });
    },
  });

  const likePostMutation = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-posts"] });
      queryClient.invalidateQueries({ queryKey: ["liked-posts"] });
    },
  });

  const unlikePostMutation = useMutation({
    mutationFn: unlikePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-posts"] });
      queryClient.invalidateQueries({ queryKey: ["liked-posts"] });
    },
  });

  const { data: likePostsData } = useQuery({
    queryKey: ["liked-posts"],
    queryFn: getLikedPosts,
  });
  const likedPosts = likePostsData?.likedPosts;

  const { data } = useQuery({
    queryKey: ["list-posts"],
    queryFn: getAllPosts,
  });
  const posts = data?.posts || [];

  const handleCreatePost = (newPost) => {
    createPostMutation.mutate(newPost);
  };

  const truncateContent = (content, maxLength = 100) => {
    return content.length > maxLength
      ? content.slice(0, maxLength) + "..."
      : content;
  };

  const handleDeletePost = (postId) => {
    deletePostMutation.mutate(postId);
  };

  const handleLikeToggle = (postId) => {
    if (likedPosts.includes(postId)) {
      unlikePostMutation.mutate(postId);
    } else {
      likePostMutation.mutate(postId);
    }
  };

  return (
    <>
      <header className="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-20 text-center">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-4">Welcome to GneVibe</h1>
          <p className="text-xl mb-8">Connect, Share, and Discover Your Vibe</p>
        </div>
      </header>

      {/* Post Form Section */}
      <div className="flex justify-center py-10 bg-gradient-to-b from-purple-300 to-purple-500/50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Create a Post
          </h2>
          <PostForm onCreatePost={handleCreatePost} />
        </div>
      </div>

      <section className="pb-20 px-10 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-white text-center mb-10">
            Latest Posts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={post.author.image}
                    alt={post.author.name}
                    className="rounded-full w-12 h-12 border-2 border-purple-600 mr-3 object-cover"
                  />
                  <h3 className="text-xl font-bold text-white">
                    {post.author.name}
                  </h3>
                </div>
                <img
                  src={post.image}
                  alt="Post"
                  className="rounded-lg mb-4 max-h-56 object-cover w-full"
                />
                <p className="text-gray-300 mb-4">
                  {truncateContent(post.content)}
                </p>
                <div className="flex space-x-2 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${
                      likedPosts?.includes(post._id)
                        ? "bg-pink-700 text-white" // Active state styling
                        : "bg-pink-500 hover:bg-pink-600 text-white"
                    }`}
                    onClick={() => handleLikeToggle(post._id)}
                  >
                    <FaHeart className="w-5 h-5 mr-1" />
                    {likedPosts?.includes(post._id) ? "Liked" : "Like"}{" "}
                    {post.likeCount}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <FaComment className="mr-1" /> Comment {post.commentCount}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleDeletePost(post._id)}
                  >
                    <FaTrash className="w-5 h-5 mr-1" />
                    Delete
                  </Button>
                </div>
                <Comments postId={post._id} fullComments={post.comments} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
