import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as React from "react";
import "./main.css";
import "@fontsource/source-code-pro";
import { Layout } from "../templates/Layout";

function hexHtmlToString(str) {
  var REG_HEX = /&#([a-fA-F0-9]+);/g;
  return str.replace(REG_HEX, function (match, grp) {
    var num = parseInt(grp, 10);
    return String.fromCharCode(num);
  });
}

const IndexPage = () => {
  const {
    allGame: { edges },
  } = useStaticQuery(graphql`
    {
      allGame {
        edges {
          node {
            id
            name
            wishlist
            own
            imageUrl
            imageFile {
              childImageSharp {
                gatsbyImageData(
                  layout: FIXED
                  formats: [AUTO, WEBP]
                  width: 250
                  height: 250
                  transformOptions: { fit: INSIDE }
                )
              }
            }
          }
        }
      }
    }
  `);

  const owned = edges.filter((game) => game.node.own);
  const wishlist = edges.filter((game) => game.node.wishlist);
  return (
    <Layout>
      <h2>Ma collection</h2>
      <div className="gamelist">
        {owned.map(({ node: { name, imageFile, id, ...rest } }) => (
          <article className="game-item" key={id}>
            <figure className="game-figure">
              <GatsbyImage
                className="game-cover"
                image={getImage(imageFile)}
                alt={`Couverture de ${name}`}
              />
              <figcaption className="game-title">
                {hexHtmlToString(name)}
              </figcaption>
            </figure>
          </article>
        ))}
      </div>

      <h2>Ma wishlist</h2>
      <div className="gamelist">
        {wishlist.map(({ node: { name, imageFile, id } }) => (
          <article className="game-item" key={id}>
            <figure className="game-figure">
              <GatsbyImage
                className="game-cover"
                image={getImage(imageFile)}
                alt=""
              />
              <figcaption className="game-title">{name}</figcaption>
            </figure>
          </article>
        ))}
      </div>
    </Layout>
  );
};

export default IndexPage;
