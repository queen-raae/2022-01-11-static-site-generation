const axios = require("axios");

const YOUTUBE_IDS = ["UGq8cnNTbwI", "fzlIzQbMtwM", "UsSJ_QNp6uo"];

const fetchEmbed = async (id, logger) => {
  try {
    const {data} = await axios.get("https://www.youtube.com/oembed", {
      params: {url: `https://youtu.be/${id}`, maxwidth: 800},
    });
    logger.info(`Fetched embed for ${id}: ${data.title}`);
    return data;
  } catch (error) {
    logger.warn(`Error fetching embed for ${id}: ${error.message}`);
  }
};

exports.sourceNodes = async ({
  actions: {createNode},
  createContentDigest,
  reporter,
}) => {
  // Sourcing harcoded urls,
  // this would typically come from a more dynamic source
  for (const id of YOUTUBE_IDS) {
    const embedData = await fetchEmbed(id, reporter);
    if (!embedData) return;

    createNode({
      id: id,
      ...embedData,
      internal: {
        type: "youTubeEmbed",
        contentDigest: createContentDigest(id),
      },
    });
  }
};
