import Link from "next/link";
const Nav = () => {
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
