import React from "react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("profile"));

  console.log(user);
  return (
    <>
      <h1>Welcome {user?.result.name}</h1>
      <img src={user?.result.imageUrl}></img>
    </>
  );
}

export default Profile;
