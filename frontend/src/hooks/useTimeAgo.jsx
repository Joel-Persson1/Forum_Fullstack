import { useState, useEffect } from "react";

const formatTimeAgo = (dateString) => {
  if (!dateString) return "Unknown"; // Handle missing date

  const now = new Date();
  const past = new Date(dateString);
  const localPast = new Date(past.getTime() - past.getTimezoneOffset() * 60000);

  const diffInSeconds = Math.floor((now - localPast) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  return `${days} day${days !== 1 ? "s" : ""} ago`;
};

export function useTimeAgo(createdAt, updatedAt) {
  const [formattedCreatedAt, setFormattedCreatedAt] = useState(() =>
    formatTimeAgo(createdAt)
  );
  const [formattedUpdatedAt, setFormattedUpdatedAt] = useState(() =>
    formatTimeAgo(updatedAt)
  );

  useEffect(() => {
    setFormattedCreatedAt(formatTimeAgo(createdAt));
    setFormattedUpdatedAt(formatTimeAgo(updatedAt));
  }, [createdAt, updatedAt]);

  return { formattedCreatedAt, formattedUpdatedAt };
}
