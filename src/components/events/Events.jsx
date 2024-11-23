// Events.js
import React from "react";
import EventForm from "./EventForm";
import EventList from "./EventList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEvent,
  deleteParticipationInEvent,
  getEvents,
  participateInEvent,
} from "@/http/route";
import { useToast } from "@/hooks/use-toast";

const Events = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["events-list"],
    queryFn: getEvents,
  });
  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: (response) => {
      toast({
        title: "Success",
        description: response.message || "Login successful",
        variant: "success",
      });
      queryClient.invalidateQueries({queryKey: ['events-list']})
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Network error or server issue",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });
  const handleEventCreated = (newEvent) => {
    createEventMutation.mutate(newEvent);
  };
  const participateEventMutation = useMutation({
    mutationFn: participateInEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events-list"] });
      queryClient.invalidateQueries({ queryKey: ["event-participants"] });
    },
  });
  const departicipateEventMutation = useMutation({
    mutationFn: deleteParticipationInEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events-list"] });
      queryClient.invalidateQueries({ queryKey: ["event-participants"] });
    },
  });

  const handleParticipateChange = (eventId, action) => {
    if (!action) {
      departicipateEventMutation.mutate(eventId);
    } else {
      participateEventMutation.mutate(eventId);
    }
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-20 text-center">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-4">Welcome to the Event Hub</h1>
          <p className="text-xl mb-8">Create, Join, and Enjoy Events</p>
        </div>
      </header>

      {/* Event Form Section */}
      <div className="flex justify-center py-10 bg-gradient-to-b from-blue-300 to-blue-500/50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Create an Event
          </h2>
          <EventForm onEventCreated={handleEventCreated} />
        </div>
      </div>

      {/* Event List Section */}
      <section className="pb-20 px-10 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">
            Upcoming Events
          </h2>
          {isLoading && (
            <div className="text-center text-gray-600">Loading events...</div>
          )}
          {isError && (
            <div className="text-center text-red-600">
              Error: {error.message}
            </div>
          )}
          {!isLoading && !isError && (
            <EventList
              events={events}
              onParticipateChange={handleParticipateChange}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Events;
