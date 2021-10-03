function GoogleMapLink({ href, children, target = '_blank' }) {
  return (
    <a
      className="tracking-wide text-secondary lg:text-black lg:hover:opacity-60 lg:hover:text-secondary lg:hover:underline"
      href={href}
      target={target}
    >
      {children}
    </a>
  );
}

export default GoogleMapLink;
