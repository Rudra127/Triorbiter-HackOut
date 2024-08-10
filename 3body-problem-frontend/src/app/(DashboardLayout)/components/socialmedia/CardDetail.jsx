'use client';
import React, { useState } from 'react';
import { IconThumbUp, IconThumbUpFilled, IconThumbDown, IconThumbDownFilled, IconMessageCircle } from '@tabler/icons-react';
import Breadcrumb from "./Breadcrumb";

const CardDetail = () => {
  // State for all data
  const [data, setData] = useState({
    likes: 120,
    dislikes: 20,
    description:
      "This is a detailed description of the video. Here you can add more information about the content of the video, the creator, and any other relevant details. You can also include links, timestamps, and more.",
    comments: [
      { id: 1, user: "User1", text: "This is a comment on the video." },
      { id: 2, user: "User2", text: "Another insightful comment." },
      { id: 3, user: "User3", text: "This video is great!" },
      { id: 4, user: "User4", text: "Loved the content!" },
      { id: 5, user: "User5", text: "Looking forward to more videos like this." },
    ],
  });

  const [showAllComments, setShowAllComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // Toggle show more comments
  const toggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  // Handle like button click
  const handleLike = () => {
    if (liked) {
      setData((prevData) => ({
        ...prevData,
        likes: prevData.likes - 1,
      }));
      setLiked(false);
    } else {
      setData((prevData) => ({
        ...prevData,
        likes: prevData.likes + 1,
        dislikes: disliked ? prevData.dislikes - 1 : prevData.dislikes, // Reduce dislike if previously disliked
      }));
      setLiked(true);
      setDisliked(false);
    }
  };

  // Handle dislike button click
  const handleDislike = () => {
    if (disliked) {
      setData((prevData) => ({
        ...prevData,
        dislikes: prevData.dislikes - 1,
      }));
      setDisliked(false);
    } else {
      setData((prevData) => ({
        ...prevData,
        dislikes: prevData.dislikes + 1,
        likes: liked ? prevData.likes - 1 : prevData.likes, // Reduce like if previously liked
      }));
      setDisliked(true);
      setLiked(false);
    }
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Videos', href: '/videos' },
    { label: 'Video Detail' }, // No href for the current page
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Video Section */}
      <div className="relative w-full h-64 md:h-96 bg-black">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your video URL
          title="Video Title"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Video Title */}
      <div className="mt-4">
        <h1 className="text-2xl font-bold">Video Title</h1>
      </div>

      {/* Likes and Comments */}
      <div className="flex items-center mt-2 space-x-4">
        <div className="flex items-center cursor-pointer" onClick={handleLike}>
          {liked ? (
            <IconThumbUpFilled className="mr-2 w-6 h-6" />
          ) : (
            <IconThumbUp className="mr-2 w-6 h-6" />
          )}
          <span>{data.likes} </span>
        </div>
        <div className="flex items-center cursor-pointer" onClick={handleDislike}>
          {disliked ? (
            <IconThumbDownFilled className="mr-2 w-6 h-6" />
          ) : (
            <IconThumbDown className="mr-2 w-6 h-6" />
          )}
          <span>{data.dislikes} </span>
        </div>
        <div className="flex items-center">
          <IconMessageCircle className="mr-2 w-6 h-6" />
          <span>{data.comments.length} Comments</span>
        </div>
      </div>

      {/* Detailed Description */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="text-gray-500 mt-2">{data.description}</p>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Comments</h2>
        <div className="mt-4">
          {data.comments.slice(0, showAllComments ? data.comments.length : 3).map((comment) => (
            <div key={comment.id} className="border-b py-4">
              <p className="font-bold">{comment.user}</p>
              <p className="text-gray-500">{comment.text}</p>
            </div>
          ))}

          {data.comments.length > 3 && (
            <button onClick={toggleComments} className="text-blue-500 mt-2">
              {showAllComments ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
