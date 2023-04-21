import Link from "next/link";
import React from "react";

interface PostCardProps {
  title: string;
  content: string;
  id: string;
  createdAt: Date;
}

export default function PostCards({
  title,
  content,
  id,
  createdAt,
}: PostCardProps) {
  const date = new Date(createdAt).toDateString();
  return (
    <Link
      href={`/posts/${id}`}
      className="flex flex-col p-8 space-y-4 rounded-md bg-violet-50 dark:bg-gray-900"
    >
      <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
        {title}
      </h3>
      <span className="text-xs dark:text-gray-400">{date}</span>
      <p>{content}</p>
    </Link>
  );
}
