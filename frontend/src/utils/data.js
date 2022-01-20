// SANITY QUERY

export const categories = [
  {
    name: "architecture",
    image: "https://picsum.photos/id/101/640/974",
  },
  {
    name: "animals",
    image: "https://picsum.photos/id/237/640/974",
  },
  {
    name: "landscapes",
    image: "https://picsum.photos/id/10/640/974",
  },
  {
    name: "fashion",
    image: "https://picsum.photos/id/21/640/974",
  },
  {
    name: "food & drinks",
    image: "https://picsum.photos/id/23/640/974",
  },
  {
    name: "technology",
    image: "https://picsum.photos/id/180/640/974",
  },
  {
    name: "people",
    image: "https://picsum.photos/id/1011/640/974",
  },
  {
    name: "travel",
    image: "https://picsum.photos/id/177/640/974",
  },
  {
    name: "spirituality",
    image: "https://picsum.photos/id/139/640/974",
  },
  {
    name: "others",
    image: "https://picsum.photos/id/248/640/974",
  },
];

export function userQuery(userId) {
  const query = `*[_type == "user" && _id == "${userId}"]`;
  return query;
}

export function searchQuery(searchTerm) {
  const query = `*[_type == "pin" && title match "${searchTerm}*" || category match "${searchTerm}*" || about match "${searchTerm}*"]{
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`;

  return query;
}

export const feedQuery = `*[_type == "pin"] | order(_createAt desc) {
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
}`;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};
