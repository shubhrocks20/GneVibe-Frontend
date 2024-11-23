import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"; // Adjust import path based on your project structure
import { Input } from "@/components/ui/input"; // Adjust import path based on your project structure
import { Textarea } from "@/components/ui/textarea"; // Adjust import path based on your project structure
import { Button } from "@/components/ui/button"; // Adjust import path based on your project structure

// Define the schema for validation
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  image: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Image file is required",
  }),
});

const PostForm = ({ onCreatePost }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: null,
    },
  });

  const fileInputRef = useRef(null); // Create a ref for the file input

  const onSubmit = (data) => {
    // Create a new FormData object to handle file uploads
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image", data.image); // Directly append the file object
    onCreatePost(formData);
    form.reset(); // Reset the form after submission
    fileInputRef.current.value = ""; // Clear the file input
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      form.setValue("image", file); // Set the file object directly in the form state
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter post content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef} // Attach the ref to the input
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Post</Button>
      </form>
    </Form>
  );
};

export default PostForm;
