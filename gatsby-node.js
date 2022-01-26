const { BggClient } = require("boardgamegeekclient");
const { createRemoteFileNode } = require("gatsby-source-filesystem");

const GameNodeType = `Game`;
exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
  getCache,
  createNodeId,
}) => {
  // get data from GitHub API at build time
  const client = BggClient.Create();
  const result = await client.collection.query({ username: "jloupiote" });

  result.forEach((r) => {
    r.items.forEach(({ image, ...item }) => {
      createNode({
        ...item,
        own: item.status.own,
        wishlist: item.status.wishlist,
        id: createNodeId(item.objectid.toString()),
        imageUrl: image,
        internal: {
          type: GameNodeType,
          contentDigest: createContentDigest(item),
        },
      });
    });
  });
};

exports.onCreateNode = async ({
  actions: { createNode },
  node,
  store,
  cache,
  createNodeId,
  reporter,
}) => {
  let pictureNode;
  if (node.internal.type === GameNodeType) {
    reporter.info("yeah, it's a game node type");

    const remoteFileNodeArgs = {
      url: String(
        "https://static.fnac-static.com/multimedia/Images/FR/NR/3c/33/51/5321532/1540-1/tsp20161013114658/7-wonders-Asmodee.jpg"
      ),
      parentNodeId: node.id,
      store,
      cache,
      createNode,
      createNodeId,
      name: "image",
    };
    try {
      const { id, ...newNode } = await createRemoteFileNode(remoteFileNodeArgs);
      reporter.info("built node" + JSON.stringify(newNode, null, 2));

      pictureNode = id;
    } catch (e) {
      reporter.panic(`bgg: No picture at ${node.image}${e}`);
    }

    node.image___NODE = pictureNode;
    reporter.info("game node" + JSON.stringify(node, null, 2));
  }
};

// exports.createSchemaCustomization = async (args) => {
//   const { createTypes } = args.actions;
//   createTypes(`
//       type ${GameNodeType} implements Node {
//         coverImage: File @link
//       }`);
// };

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
      type Game implements Node {
        image: File 
      }
    `;
  createTypes(typeDefs);
};

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions;
  createResolvers({
    [GameNodeType]: {
      imageFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.imageUrl,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          });
        },
      },
    },
  });
};
