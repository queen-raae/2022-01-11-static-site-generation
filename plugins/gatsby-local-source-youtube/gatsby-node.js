const axios = require("axios");

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
