import Link from 'next/link';

function Logo() {
  return (
    <div>
      <Link href="/">
        <a>
          <h1 className="text-lg text-primary sm:text-2xl">DJ EVENTS</h1>
        </a>
      </Link>
    </div>
  );
}

export default Logo;
