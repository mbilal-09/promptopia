import assert from "node:assert/strict";
import test from "node:test";
import { filterPosts } from "./filterPosts.mjs";

const posts = [
  {
    prompt: "Write a poem about the ocean",
    tag: "poetry",
    creator: { username: "ada_lovelace", email: "ada@example.com" },
  },
  {
    prompt: "Summarize this article",
    tag: "summary",
    creator: { username: "alan_turing", email: "alan@example.com" },
  },
  {
    prompt: "A prompt with no author",
    tag: "draft",
  },
];

test("returns every post when the search is empty", () => {
  assert.deepEqual(filterPosts(posts, ""), posts);
});

test("matches prompt text", () => {
  const matches = filterPosts(posts, "ocean");

  assert.equal(matches.length, 1);
  assert.equal(matches[0].tag, "poetry");
});

test("matches a tag", () => {
  const matches = filterPosts(posts, "summary");

  assert.equal(matches.length, 1);
  assert.equal(matches[0].creator.username, "alan_turing");
});

test("matches a username", () => {
  const matches = filterPosts(posts, "ada_lovelace");

  assert.equal(matches.length, 1);
  assert.equal(matches[0].tag, "poetry");
});

test("matches an email", () => {
  const matches = filterPosts(posts, "alan@example.com");

  assert.equal(matches.length, 1);
  assert.equal(matches[0].tag, "summary");
});

test("returns no posts when nothing matches", () => {
  assert.deepEqual(filterPosts(posts, "not-in-the-feed"), []);
});

test("still matches a prompt when the post has no creator", () => {
  const matches = filterPosts(posts, "no author");

  assert.equal(matches.length, 1);
  assert.equal(matches[0].tag, "draft");
});
