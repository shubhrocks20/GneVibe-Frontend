import React from "react";
import { useForm } from "react-hook-form";

const EventForm = ({ onEventCreated }) => {
  const { register, handleSubmit, watch, reset } = useForm();
  const imageFile = watch("image"); // Watch the image input

  const onSubmit = (data) => {
    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("eventDate", data.eventDate);

    // Append the image only if it exists
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]); // Append the first file
    }

    // Call API to create event here
    onEventCreated(formData); // Pass the new event back to the parent
    // Reset form fields
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-gray-700">Event Name</label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          {...register("description", { required: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Event Date</label>
        <input
          type="date"
          {...register("eventDate", { required: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          {...register("image", { required: false })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200"
      >
        Create Event
      </button>
    </form>
  );
};

export default EventForm;
