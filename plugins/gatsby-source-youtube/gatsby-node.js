const axios = require("axios");
const {createRemoteFileNode} = require("gatsby-source-filesystem");

const YOUTUBE_NODE_TYPE = "youTube";

const fetchEmbed = async (id, logger) => {
  try {
    const {data} = await axios.get("https://www.youtube.com/oembed", {
      params: {url: `https://youtu.be/${id}`, maxwidth: 800},
    });
    logger.info(`Fetched oEmbed data for ${id}: ${data.title}`);
    return data;
  } catch (error) {
    logger.warn(`Error fetching oEmbed data for ${id}: ${error.message}`);
  }
};

exports.sourceNodes = async (
  {actions: {createNode}, createContentDigest, reporter},
  options
) => {
  for (const id of options?.ids || []) {
    const embedData = await fetchEmbed(id, reporter);
    if (!embedData) return;

    createNode({
      id: id,
      ...embedData,
      internal: {
        type: YOUTUBE_NODE_TYPE,
        contentDigest: createContentDigest(id),
      },
    });
  }
};

exports.onCreateNode = async ({
  node,
  actions: {createNodeField, createNode},
  createNodeId,
  cache,
  store,
  reporter,
}) => {
  if (node.internal.type === YOUTUBE_NODE_TYPE) {
    const imageNode = await createRemoteFileNode({
      url: node.thumbnail_url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store,
      reporter,
    });

    if (imageNode) {
      createNodeField({node, name: "thumbnail", value: imageNode.id});
    }
  }
};

exports.createSchemaCustomization = ({actions: {createTypes}}) => {
  createTypes(`
    type youTube implements Node {
      thumbnail: File @link(from: "fields.thumbnail")
    }
  `);
};
