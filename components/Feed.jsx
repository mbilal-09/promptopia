"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt?._id}
          post={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  let [searchText, setSearchText] = useState("");
  const [posts, setPost] = useState([]);
  const [mainPosts, setMainPost] = useState([]);

  function handleSearch() {
    if (posts) {
      const filteredPosts = mainPosts.filter((post) => {
        if (
          post.prompt.includes(searchText) ||
          post.tag.includes(searchText) ||
          post.creator.username.includes(searchText) ||
          post.creator.email.includes(searchText)
        ) {
          return post;
        }
      });
      setPost(filteredPosts)
    }

    if (searchText.length < 1) {
      setPost(mainPosts);
    }
  }

  useEffect(() => handleSearch(), [searchText])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt", { cache: 'no-store' });
      const data = await response.json();

      setMainPost(data);
      setPost(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search a Prompt"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={(tag) => {
        searchText = tag;
        setSearchText(searchText);
        }} />
    </section>
  );
};

export default Feed;
