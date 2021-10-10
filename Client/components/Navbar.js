import { useState, useEffect } from "react";
import Link from "next/link";
const Nav = () => {
  const [current, setCurrent] = useState("");
  return (
    <>
      <div className="nav-container">
        <div>
          <Link href="/">
            <a>
              <h3 className="logo">Edemy</h3>
            </a>
          </Link>
        </div>
        <div className="nav-element">
          <Link href="/login">
            <a>Login</a>
          </Link>

          <Link href="/register">
            <a>Register</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Nav;
