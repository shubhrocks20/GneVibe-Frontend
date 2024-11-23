// Comments.js
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postCommentForPost, getCommentsForPost } from "@/http/route"; // Adjust these imports as per your API
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "../ui/scroll-area";

const Comments = ({ postId, fullComments }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [comment, setComment] = useState("");

  const createCommentMutation = useMutation({
    mutationFn: postCommentForPost,
    onSuccess: (data) => {
      toast({
        title: "Comment Added",
        description: data.message || "Comment added successfully.",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["list-posts"] });
      setComment(""); // Clear the input after success
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred.",
        variant: "destructive",
      });
    },
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    createCommentMutation.mutate({ postId, content: comment });
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold text-gray-200">Comments</h4>
      <form onSubmit={handleCommentSubmit} className="flex mt-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 p-2 border border-gray-600 rounded"
          placeholder="Add a comment..."
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded ml-2"
        >
          Submit
        </button>
      </form>
      <div className="mt-4">
        <ScrollArea className="h-24 overflow-auto border border-gray-600 rounded">
          <div className="flex flex-col">
            {fullComments.map((c) => (
              <div
                key={c.id}
                className="flex items-start border-b border-gray-600 py-2"
              >
                <img
                  src={c.user.image} // User image URL
                  alt={c.user.name}
                  className="w-10 h-10 rounded-full mr-2" // Adjust size and margin as needed
                />
                <div className="text-gray-300">
                  <strong>{c.user.name}</strong>
                  <p className="mt-1">{c.content}</p> {/* Comment content */}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Comments;
