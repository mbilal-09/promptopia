"use client";
import Profile from "@components/Profile";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const userProfile = () => {
  let [data, setData] = useState(null);
  let [posts, setPosts] = useState([]);
  const id = usePathname().replace("/profile/", "");

  useEffect(() => {
    const user = async () => {
      const res = await fetch(`/api/userdata/${id}`).then(
        async (res) => await res.json()
      );
      data = res;
      setData(data);
      const response = await fetch(`/api/users/${data?._id}/posts`);
      const post = await response.json();
      console.log("post-->", post);
      posts = post;
      setPosts([...posts]);
      console.log("posts-->", posts);
    };

    user();
  }, []);

  return (
    <Profile
      name={data?.username}
      desc={`Welcome to ${data?.username} profile and explore ${data?.username} prompts.`}
      data={posts}
    />
  );
};

export default userProfile;