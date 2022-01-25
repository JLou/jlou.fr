import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";
import "./main.css";
import "@fontsource/source-code-pro";
import { Layout } from "../templates/Layout";
// markup
const IndexPage = () => {
  return <Layout>About me</Layout>;
};

export default IndexPage;
