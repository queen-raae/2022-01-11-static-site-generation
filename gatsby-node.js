exports.createPages = async function ({actions}) {
  actions.createPage({
    path: "yt-id",
    component: require.resolve(`./src/templates/youtube-template.js`),
    context: {id: "yt-id"},
  });
};
