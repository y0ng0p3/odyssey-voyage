const resolvers = {
  Query: {
    latestReviews: (_, __, {dataSources}) => {
      return dataSources.reviewsAPI.getLatestReviews();
    },
  },
  Location: {
    __resolveReference: (location) => {
      return location;
    },
    overallRating: ({id}, _, {dataSources}) => {
      return dataSources.reviewsAPI.getOverallRatingForLocation(id);
    },
    reviewsForLocation: ({id}, _, {dataSources}) => {
      return dataSources.reviewsAPI.getReviewsForLocation(id);
    },
  },
  Mutation: {
    submitReview: (_, {locationReview}, {dataSources}) => {
      const newReview = dataSources.reviewsAPI.submitReviewForLocation(locationReview);
      return {code: 200, success: true, message: 'success', locationReview: newReview};
    },
  },
  Review: {
    location: ({locationId}) => {
      return {id: locationId};
    },
  },
};

module.exports = resolvers;
