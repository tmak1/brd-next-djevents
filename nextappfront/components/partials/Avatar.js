import React, { useState } from 'react';

import { BsFillPersonFill } from 'react-icons/bs';
import AvatarMenu from './AvatarMenu';

function Avatar({ user, logout }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <div
        className="flex justify-center items-center w-12 h-12 rounded-full bg-primary cursor-pointer"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        {user ? (
          <p className="text-xl text-white">
            {user?.username.slice(0, 2).toUpperCase()}
          </p>
        ) : (
          <BsFillPersonFill size={20} color="#fff" />
        )}
      </div>
      <div className="absolute mt-5 top-22 right-10 z-20">
        {showMenu && (
          <AvatarMenu
            loggedIn={!!user}
            closeMenu={() => setShowMenu(false)}
            logout={logout}
          />
        )}
      </div>
    </div>
  );
}

export default Avatar;
