import Avatar from '../partials/Avatar';
import Link from 'next/link';

function Drawer({ closeDrawer }) {
  return (
    <div className="w-full h-screen bg-gray-300" onClick={closeDrawer}>
      <div className="flex flex-col justify-start items-center w-1/2 h-full pt-32 bg-yellow-50 lg:w-1/3">
        <div className="mb-10">
          <Avatar />
        </div>
        <ul>
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
        </ul>
      </div>
    </div>
  );
}

export default Drawer;
