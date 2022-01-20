import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import { MasonryLayout, Spinner } from "../components";

function Feeds() {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) {
    return <Spinner message="Adding new ideas to your feed!" />;
  }

  if (!pins?.length)
    return (
      <h2 className="flex flex-col justify-center items-center">
        Sorry no pins available.
      </h2>
    );

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
}

export default Feeds;
