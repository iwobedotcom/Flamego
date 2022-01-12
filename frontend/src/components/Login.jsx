import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import backgroundVideo from "../assets/background.mp4";
import logo from "../assets/logo.png";
import { client } from "../client";

function Login() {
  const navigate = useNavigate();

  function responseGoogle(response) {
    // Setting up profile object to local storage.
    localStorage.setItem("user", JSON.stringify(response.profileObj));

    // Destructure some of the retrieved properties withe the response object.
    const { name, googleId, imageUrl } = response.profileObj;

    // Create a new Sanity profile for the user to be saved in the database.
    // Variable doc contains the users field specified in our backend schemas.
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    // Only create client profile if it does not exist on database.
    // Connecting Sanity to client side.
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={backgroundVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img
              src={logo}
              alt="logo"
              width="90px"
              className="brightness-200"
            />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-2 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" />
                  Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
