const comments = [
  {
    id: "comment1",
    text: "It is a first comment",
    likes: 1,
  },
  {
    id: "comment20",
    text: "It is a 20 comment",
    likes: 10,
  },
  {
    id: "comment30",
    text: "It is a 30 comment",
    likes: 5,
  },
];

function getAllComments() {
  return comments;
}

function getCommentsByLikes(minLikes) {
  return comments.filter((comment) => {
    return comment.likes >= minLikes;
  });
}

function addNewComment(id, text) {
  const newComment = {
    id,
    text,
    likes: 0,
  };

  comments.push(newComment);
  return newComment;
}

module.exports = {
  getAllComments,
  getCommentsByLikes,
  addNewComment,
};
