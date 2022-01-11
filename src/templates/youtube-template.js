import React from "react";
import {graphql, Link} from "gatsby";

const YouTubeCreatePage = ({data}) => {
  const {title, html, url} = data.youTube;
  return (
    <main>
      <article>
        <header>
          <p>
            <Link to="/">↫ Frontpage</Link>
          </p>
          <h1>{title}</h1>
        </header>
        <section>
          <ul>
            <li>
              <a href={url}>Watch on YouTube</a>
            </li>
          </ul>
          <p>
            <div
              className="video-container"
              dangerouslySetInnerHTML={{__html: html}}
            ></div>
          </p>
        </section>
        <footer>
          <p>
            Page created by <code>createPage</code>.
          </p>
        </footer>
      </article>
    </main>
  );
};

export const query = graphql`
  query ($eq: String) {
    youTube(id: {eq: $eq}) {
      html
      title
      url
    }
  }
`;

export default YouTubeCreatePage;
