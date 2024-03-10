import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbsUp, faThumbsDown, faComments, faImage, faGift} from '@fortawesome/free-solid-svg-icons'
import logo from './logo.jpeg'
import avatar from './Avatar.gif'

const Middle = (props) => {
  const [inputText, setInputText] = useState('');
  const [inputImage, setInputImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [postData, setPostData] = useState([]);
  const [commentText, setCommentText] = useState('');

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setInputImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleClick = () => {
    if (inputText.trim() === '' && !inputImage) {
      return;
    }

    const newPost = {
      text: inputText,
      image: inputImage,
      likes: 0,
      dislikes: 0,
      comments: [],
    };

    setPostData([newPost, ...postData]); // Prepend the new post to postData array
    setInputText('');
    setInputImage(null);
    setPreviewImage(null);
  };

  const handleLike = (index) => {
    setPostData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = { ...updatedData[index], likes: updatedData[index].likes + 1 };
      return updatedData;
    });
  };

  const handleDislike = (index) => {
    setPostData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = { ...updatedData[index], dislikes: updatedData[index].dislikes + 1 };
      return updatedData;
    });
  };

  const handleComment = (index) => {
    if (commentText.trim() !== '') {
      setPostData((prevData) => {
        const updatedData = [...prevData];
        updatedData[index] = {
          ...updatedData[index],
          comments: [...updatedData[index].comments, commentText],
        };
        return updatedData;
      });
      setCommentText('');
    }
  };

  const [showGiftPopup, setShowGiftPopup] = useState(false);
  const [giftAmount, setGiftAmount] = useState('');
  const [giftAmountStored, setGiftAmountStored] = useState(null);

  const handleOpenGiftPopup = () => {
    setShowGiftPopup(true);
  };

  const handleCloseGiftPopup = () => {
    setShowGiftPopup(false);
    setGiftAmount(''); // Clear the gift amount when closing the popup
  };

  const handleGift = () => {
    // Implement your logic for handling the gift/payment here
    // For now, let's just close the popup
    setGiftAmountStored(giftAmount);
    alert(`Gift amount stored ${giftAmount}`)
    handleCloseGiftPopup();
  };
  const dummyPosts = [
    {
      username: 'JohnDoe',
      text: 'This is a sample post by JohnDoe!',
      image: avatar,
      likes: 10,
      dislikes: 2,
      comments: ['Nice post!', 'Keep it up!'],
    },
    {
      username: 'AliceSmith',
      text: 'Hello from AliceSmith!',
      image: avatar,
      likes: 7,
      dislikes: 1,
      comments: ['Great to see you here!', 'Awesome post!'],
    },
  ];


  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-row items-center mb-4">
        <img
          className="w-24 h-24 rounded-full mr-4"
          src={logo}
          alt=""
        />
        <input
          className="bg-gray-100 focus:bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none flex-grow"
          type="text"
          placeholder="What's new, pal?"
          maxLength="200"
          value={inputText}
          onChange={handleTextChange}
        />
        <label className="ml-4">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <span className="text-blue-500 hover:text-blue-600 cursor-pointer">
          <FontAwesomeIcon icon={faImage} />
          </span>
        </label>
      </div>
      {previewImage && (
        <div className="flex items-center mb-4">
          <img
            className="w-24 h-24 object-cover rounded-lg mr-4"
            src={previewImage}
            alt="Preview Image"
          />
          <span className="text-gray-400 text-2xl">Previewing Image...</span>
        </div>
      )}
      <div className="w-full flex justify-center ">
        <button
          className="relative left-[135px] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-16 rounded-full mx-auto"
          onClick={handleClick}
        >
          Post
        </button>
      </div>

      <div className="mt-14">
      <div className="mt-14">
        
        {postData.map((post, index) => (
          <div key={index} className="bg-white p-4 px-[20px] rounded-lg shadow-md mb-4">
            <div className="flex items-start">
              <div className="flex flex-col">
                <div className='flex flex-row'>
                  <img
                    className="w-24 h-24 rounded-full mr-4"
                    src={logo}
                    alt=""
                  />
                  <p className="text-gray-800 mt-4 font-bold">{props.username}</p>
                </div>
                <p className="text-gray-600 mt-7 mx-2">{post.text}</p>
                {post.image && (
                  <img
                    className="w-full rounded-lg mt-4"
                    src={URL.createObjectURL(post.image)}
                    alt="Posted Image"
                  />
                )}
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <button
                      className="m-3 text-gray-600 hover:text-blue-500"
                      onClick={() => handleLike(index)}
                    >
                      <FontAwesomeIcon icon={faThumbsUp} />&nbsp;{post.likes}
                    </button>
                    <button
                      className="m-3 text-gray-600 hover:text-blue-500"
                      onClick={() => handleDislike(index)}
                    >
                      <FontAwesomeIcon icon={faThumbsDown} />&nbsp;{post.dislikes}
                    </button>
                  </div>
                  <div>
                    <button className="mr-4 text-gray-600 hover:text-blue-500" onClick={handleOpenGiftPopup}><FontAwesomeIcon icon={faGift} />&nbsp;</button>
                    <span className="text-gray-600">
                      <FontAwesomeIcon icon={faComments} />&nbsp;{post.comments.length}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  {post.comments.map((comment, commentIndex) => (
                    <p key={commentIndex} className="text-gray-600">{comment}</p>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="flex">
                    <input
                      className="bg-gray-200 focus:bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none w-full cmnt"
                      type="text"
                      placeholder="Add a comment..."
                      maxLength="200"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button
                      className="ml-2 bg-blue-500 hover:bg-blue-600 text-white text-[14px] font-semibold p-2 px-4 rounded-full"
                      onClick={() => handleComment(index)}
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Map through the dummy posts array */}
      {dummyPosts.map((post, index) => (
          <div key={index} className="bg-white p-4 px-[20px] rounded-lg shadow-md mb-4">
            <div className="flex items-start">
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <img
                    className="w-24 h-24 rounded-full mr-4"
                    src={post.image}
                    alt=""
                  />
                  <p className="text-gray-800 mt-4 font-bold">{post.username}</p>
                </div>
                <p className="text-gray-600 mt-7 mx-2">{post.text}</p>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <button
                      className="m-3 text-gray-600 hover:text-blue-500"
                      onClick={() => handleLike(index)}
                    >
                      <FontAwesomeIcon icon={faThumbsUp} />&nbsp;{post.likes}
                    </button>
                    <button
                      className="m-3 text-gray-600 hover:text-blue-500"
                      onClick={() => handleDislike(index)}
                    >
                      <FontAwesomeIcon icon={faThumbsDown} />&nbsp;{post.dislikes}
                    </button>
                  </div>
                  <div>
                    <button className="mr-4 text-gray-600 hover:text-blue-500" onClick={handleOpenGiftPopup}><FontAwesomeIcon icon={faGift} />&nbsp;</button>
                    <span className="text-gray-600">
                      <FontAwesomeIcon icon={faComments} />&nbsp;{post.comments.length}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  {post.comments.map((comment, commentIndex) => (
                    <p key={commentIndex} className="text-gray-600">{comment}</p>
                  ))}
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Gift Popup */}
      {showGiftPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-gray-800 font-bold mb-2">Enter Gift Amount:</p>
            <input
              className="bg-gray-200 focus:bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none w-full mb-2"
              type="text"
              placeholder="Amount"
              value={giftAmount}
              onChange={(e) => setGiftAmount(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white text-[14px] font-semibold p-2 px-4 rounded-full mr-2"
              onClick={handleGift}
            >
              Pay
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-[14px] font-semibold p-2 px-4 rounded-full"
              onClick={handleCloseGiftPopup}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Middle.defaultProps = {
  Image: logo,
  username: 'ContextVectors',
}

export default Middle;