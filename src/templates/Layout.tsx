import * as React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <header className="navbar">
        <h1>Jean-Lou Piermé</h1>
        <nav className="nav-links">
          <a className="nav-link" href="/">
            Home
          </a>
          <a className="nav-link" href="games">
            Mes jeux
          </a>
          <a className="nav-link" href="games">
            Mes bouquins
          </a>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export { Layout };
