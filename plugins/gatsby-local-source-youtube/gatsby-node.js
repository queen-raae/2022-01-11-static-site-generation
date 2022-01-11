const axios = require("axios");

const YOUTUBE_NODE_TYPE = "youTube";

const fetchEmbed = async (url, logger) => {
  try {
    const {data} = await axios.get("https://www.youtube.com/oembed", {
      params: {url: url, maxwidth: 800},
    });
    logger.info(`Fetched oEmbed data for ${url}: ${data.title}`);
    return data;
  } catch (error) {
    logger.warn(`Error fetching oEmbed data for ${url}: ${error.message}`);
  }
};

exports.sourceNodes = async (
  {actions: {createNode}, createContentDigest, reporter},
  options
) => {
  for (const id of options?.ids || []) {
    const ytUrl = `https://youtu.be/${id}`;
    const embedData = await fetchEmbed(ytUrl, reporter);
    if (!embedData) return;

    createNode({
      id: id,
      ...embedData,
      url: ytUrl,
      internal: {
        type: YOUTUBE_NODE_TYPE,
        contentDigest: createContentDigest(id),
      },
    });
  }
};
