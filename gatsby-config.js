module.exports = {
  siteMetadata: {
    title: `jlou.fr`,
    siteUrl: `https://jlou.fr`,
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-bgg",
      options: {
        username: "jloupiote",
      },
    },
  ],
};
