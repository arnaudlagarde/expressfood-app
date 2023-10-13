import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footerSpaceUp">
      <footer
        className="footerSpaceUp text-center text-lg-start bg-light text-muted"
      >
        <div className="text-center p-4">
          © 2023 Copyright:
          <Link to="/mentions-legales" className="text-reset fw-bold">
            Mentions Légales 2023
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
