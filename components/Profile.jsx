import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text main_blue_gradient text-left">{name} Profile</h1>
      <p className="desc text-left">{desc}.</p>
      <div className="mt-10 prompt_layout">
        {data ? (
          data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        ) : (
          <img
          width={"500px"}
          height={"500px"}
          src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif"
        />
        )}
      </div>
    </section>
  );
};

export default Profile;
