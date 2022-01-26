import * as React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <header className="navbar">
        <div className="mobile-header">
          <h1>Jean-Lou Piermé</h1>
          <label className="menu-toggle-label" htmlFor="menu-toggle">
            ☰
          </label>
        </div>
        <input id="menu-toggle" defaultChecked type="checkbox" />
        <nav className="nav-links">
          <a className="nav-link" href="/">
            Home
          </a>
          <a className="nav-link" href="/games">
            Mes jeux
          </a>
          <a className="nav-link" href="/games">
            Mes bouquins
          </a>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export { Layout };
