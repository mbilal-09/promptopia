export function filterPosts(posts, searchText) {
  if (!searchText) {
    return posts;
  }

  return posts.filter(
    (post) =>
      post.prompt.includes(searchText) ||
      post.tag.includes(searchText) ||
      post.creator?.username?.includes(searchText) ||
      post.creator?.email?.includes(searchText)
  );
}
