import Link from 'next/link';

function AvatarMenu({ loggedIn, closeMenu, logout }) {
  return (
    <div
      className="flex flex-col justify-center items_start w-32 h-22 border-2 bg-primary bg-opacity-10 text-center text-md"
      onClick={closeMenu}
    >
      {loggedIn ? (
        <ul>
          <li className="my-1 py-2 bg-white cursor-pointer hover:bg-primary hover:text-white">
            <Link href="/events/new">
              <a className="w-full h-full">+ New Event</a>
            </Link>
          </li>
          <li className="my-1 py-2 bg-white cursor-pointer hover:bg-primary hover:text-white">
            <Link href="/">
              <a className="w-full h-full">Profile</a>
            </Link>
          </li>
          <li className="my-1 py-2 bg-white cursor-pointer hover:bg-primary hover:text-white">
            <button onClick={() => logout()}>Signout</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li className="my-1 py-2 bg-white cursor-pointer hover:bg-primary hover:text-white">
            <Link href="/account/login">
              <a className="w-full h-full">Login</a>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default AvatarMenu;
