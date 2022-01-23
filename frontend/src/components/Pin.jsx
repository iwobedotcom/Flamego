import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { BsDownload, BsSave, BsSave2 } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { client, urlFor } from "../client";
import { fetchUser } from "../utils/fetchUser";

function Pin({ pin: { postedBy, image, _id, destination, save } }) {
  const [PostHovered, setPostHovered] = useState(false);

  const navigate = useNavigate();
  const user = fetchUser();

  const alreadySaved = !!save?.filter(
    (item) => item?.postedBy?._id === user?.googleId
  )?.length;

  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user?.googleId,
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
    <div className="m-2 mb-5">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          src={urlFor(image).width(640).url()}
          alt="user-post"
          className="w-full"
        />
        {PostHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50 bg-gradient-to-t from-black to-transparent"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between"></div>
            <div className="flex justify-between items-center gap-2 w-full">
              <Link
                to={`user-profile/${postedBy?._id}`}
                className="flex gap-2 mt-2 p-3 items-center"
              >
                <img
                  src={postedBy?.image}
                  alt="user-profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-gray-200 capitalize hover:text-white">
                  {postedBy?.userName}
                </p>
              </Link>
              <div className="flex gap-2 mt-3">
                <button
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="w-9 h-9 flex items-center justify-center text-gray-200 text-lg hover:text-white outline-none"
                  title="Download"
                >
                  <BsDownload />
                </button>
                {alreadySaved ? (
                  <button
                    href={`${image?.asset?.url}?dl=`}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="w-9 h-9 flex items-center justify-center text-gray-200 text-lg hover:text-white outline-none"
                    title="Saved"
                  >
                    {save?.length}
                    <BsSave2 />
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      savePin(_id);
                    }}
                    type="button"
                    className="w-9 h-9 flex items-center justify-center text-gray-200 text-lg hover:text-white outline-none"
                    title="Save"
                  >
                    <BsSave />
                  </button>
                )}
                {postedBy?._id === user?.googleId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePin(_id);
                    }}
                    type="button"
                    className="w-9 h-9 flex items-center justify-center text-gray-200 text-lg hover:text-white outline-none"
                    title="Delete"
                  >
                    <AiOutlineDelete />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pin;
