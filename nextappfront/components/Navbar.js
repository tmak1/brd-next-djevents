import Link from 'next/link';

function Navbar({ links = [] }) {
  return (
    <ul className="flex justify-between items-center gap-4">
      {links.map(({ href, title }, index) => (
        <li key={index} className="flex justify-center items-center w-24 h-10">
          <Link href={href}>
            <a className="flex justify-center items-center w-full h-full p-3 rounded bg-white text-center text-lg">
              {title}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Navbar;
