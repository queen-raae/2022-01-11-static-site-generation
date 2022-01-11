module.exports = {
  plugins: [
    `@raae/gatsby-theme-queen`,
    {
      resolve: `gatsby-source-youtube`,
      options: {
        ids: ["UGq8cnNTbwI", "fzlIzQbMtwM", "UsSJ_QNp6uo"],
      },
    },
  ],
};
