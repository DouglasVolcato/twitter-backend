const Tweet = require("./Tweet");

const createTweetService = (message, userId) =>
  Tweet.create({ message, user: userId });

const findAllTweetsService = (offset, limit) =>
  Tweet.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countTweetsService = () => Tweet.countDocuments();

const searchTweetService = (message) =>
  Tweet.find({
    message: { $regex: `${message || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

const likesService = (id, userId) =>
  Tweet.findOneAndUpdate(
    {
      _id: id,
      "likes.userId": { $nin: [userId] },
    },
    {
      $push: {
        likes: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

const reteetsService = (id, userId) =>
  Tweet.findOneAndUpdate(
    {
      _id: id,
      "retweets.userId": { $nin: [userId] },
    },
    {
      $push: {
        retweets: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

const commentsService = (id, userId) =>
  Tweet.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        comments: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

module.exports = {
  createTweetService,
  findAllTweetsService,
  searchTweetService,
  likesService,
  reteetsService,
  commentsService,
  countTweetsService,
};
