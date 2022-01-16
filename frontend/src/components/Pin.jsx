import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  MdDelete,
  MdDownload,
  MdOutlineDataSaverOff,
  MdSave,
} from "react-icons/md";
import { BsFillArrowDownRightSquareFill } from "react-icons/bs";
import { client, urlFor } from "../client";
import { fetchUser } from "../utils/fetchUser";

function Pin({ pin: { postedBy, image, _id, destination, save } }) {
  const [PostHovered, setPostHovered] = useState(false);

  const navigate = useNavigate();
  const user = fetchUser();

  const alreadySaved = !!save?.filter(
    (item) => item.postedBy._id === user.googleId
  )?.length;

  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          src={urlFor(image).width(250).url()}
          alt="user-post"
          className="rounded-lg w-full"
        />
        {PostHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-pink-700 text-lg opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                  title="Download"
                >
                  <MdDownload />
                </a>
              </div>
              {alreadySaved ? (
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-pink-700 text-md opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                  title="Saved"
                >
                  {save?.length}
                  <MdOutlineDataSaverOff />
                </a>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-pink-700 text-md opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                  title="Save"
                >
                  <MdSave />
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full bg-opacity-70 hover: opacity-100 hover:shadow-md"
                >
                  <BsFillArrowDownRightSquareFill className="text-pink-700 text-md" />
                  {destination.length > 20
                    ? destination.slice(8, 20)
                    : destination.slice(8)}
                </a>
              )}
              {postedBy?._id === user.googleId && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  type="button"
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-pink-700 text-md opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                  title="Delete"
                >
                  <MdDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          src={postedBy?.image}
          alt="user-profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
}

export default Pin;
