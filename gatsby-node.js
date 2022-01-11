const path = require(`path`);

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;

  const result = await graphql(`
    {
      allYouTube {
        nodes {
          id
        }
      }
    }
  `);
  const templatePath = path.resolve(`./src/templates/youtube-template.js`);

  result.data.allYouTube.nodes.forEach((node) => {
    createPage({
      path: node.id,
      component: templatePath,
      context: {
        id: node.id,
      },
    });
  });
};
