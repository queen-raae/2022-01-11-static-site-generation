import React from "react";
import {graphql, Link} from "gatsby";
import slugify from "@sindresorhus/slugify";

const IndexPage = ({data}) => {
  return (
    <main>
      <header>
        <h1>
          <span role="img" aria-label="Red circle + women presenter emoji">
            🔴&nbsp;👩‍🏫&nbsp;
          </span>
          Static Site Generation (SSG)
          <span role="img" aria-label="Women presenter + red circle emoji">
            &nbsp;👩‍🏫&nbsp;🔴
          </span>
        </h1>
        <p>Live Screencast · 2022-01-11</p>

        <h2>SSG Three Ways</h2>
        <ol>
          <li>
            React components in <code>src/pages</code>
          </li>
          <li>File System Route API</li>
          <li>
            <code>createPages</code> in <code>gatsby-node.js</code>
          </li>
        </ol>
      </header>

      <section>
        <header>
          <h2>Videos</h2>
        </header>

        {data.allYouTube.nodes.map((node) => {
          return (
            <article>
              <Link to={slugify(node.id)} key={node.id}>
                <img alt={node.title} src={node.thumbnail_url} />
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export const query = graphql`
  {
    allYouTube {
      nodes {
        id
        title
        thumbnail_url
      }
    }
  }
`;

export default IndexPage;
