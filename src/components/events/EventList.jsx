// EventList.js
import React from "react";
import EventItem from "./EventItem";
import { useQuery } from "@tanstack/react-query";
import { fetchUserDetails } from "@/http/route";

const EventList = ({ events, onParticipateChange }) => {
  const { data: me } = useQuery({
    queryFn: fetchUserDetails,
    queryKey: ["user-profile"],
  });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events?.map((event) => (
        <EventItem
          key={event._id}
          event={event}
          onParticipateChange={onParticipateChange}
          userId={me?._id}
        />
      ))}
    </div>
  );
};

export default EventList;
