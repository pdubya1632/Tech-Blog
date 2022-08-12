const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//create associations
User.hasMany(Post, {
  foreignKey: 'UserId',
});

Post.belongsTo(User, {
  foreignKey: 'UserId',
});

Comment.belongsTo(User, {
  foreignKey: 'UserId',
});

Comment.belongsTo(Post, {
  foreignKey: 'PostId',
});

User.hasMany(Comment, {
  foreignKey: 'UserId',
});

Post.hasMany(Comment, {
  foreignKey: 'PostId',
});

module.exports = { User, Post, Comment };
