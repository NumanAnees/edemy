import { useState, useEffect } from "react";
import Link from "next/link";
const Nav = () => {
  const [current, setCurrent] = useState("");
  return (
    <>
      <Link href="/">
        <a>App</a>
      </Link>
      <Link href="/login">
        <a>Login</a>
      </Link>

      <Link href="/register">
        <a>Register</a>
      </Link>
    </>
  );
};

export default Nav;
