import { useState, useContext } from 'react';

import Drawer from './ui/Drawer';
import Navbar from './Navbar';
import Logo from './partials/Logo';
import Avatar from './partials/Avatar';
import DrawerBtn from './partials/DrawerBtn';
import SearchBox from './form-elements/SearchBox';

import AuthContext from '../contexts/AuthProvider';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [drawer, setDrawer] = useState(false);

  return (
    <>
      {drawer && (
        <Drawer
          closeDrawer={() => {
            setDrawer(false);
          }}
        />
      )}
      <div className="flex justify-between items-center w-full bg-white h-16 py-6 shadow-lg md:gap-8 sm:px-14 lg:px-20">
        <div className="flex justify-start items-center">
          <DrawerBtn setDrawer={setDrawer} />
          <div className="flex justify-start items-center gap-24">
            <Logo />
            <div className="hidden md:block">
              <SearchBox />
            </div>
          </div>
        </div>
        <div className="hidden sm:flex justify-between items-center sm:gap-12">
          <Navbar links={[{ href: '/events', title: 'Events' }]} />
          <Avatar user={user} logout={logout} />
        </div>
      </div>
    </>
  );
}

export default Header;
