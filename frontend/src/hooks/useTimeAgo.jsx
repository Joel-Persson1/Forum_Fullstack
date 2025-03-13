import { useState, useEffect } from "react";

const formatTimeAgo = (dateString) => {
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

export function useTimeAgo(threadCreatedAt, lastAnswerAt) {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const lastActivity = lastAnswerAt ? lastAnswerAt : threadCreatedAt;
    setFormattedTime(formatTimeAgo(lastActivity));
  }, [lastAnswerAt, threadCreatedAt]);

  return formattedTime;
}
