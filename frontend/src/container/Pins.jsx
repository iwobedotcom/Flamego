// MAIN VIEW TO DISPLAY ALL IMAGES
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, Feeds, PinDetail, CreatePin, Search } from "../components";

function Pins({ user }) {
  // We declared the search term state here because we are going to be using it across multiple components.
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feeds />} />
          <Route path="/category/:categoryId" element={<Feeds />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user} />}
          />
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Pins;
