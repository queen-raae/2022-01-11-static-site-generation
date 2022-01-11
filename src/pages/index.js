import React from "react";

const IndexPage = () => {
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
    </main>
  );
};

export default IndexPage;
