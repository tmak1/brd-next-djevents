function DrawerBtn({ setDrawer }) {
  return (
    <div
      className="flex flex-col justify-center items-center gap-1 w-12 m-3 cursor-pointer sm:hidden"
      onClick={() => setDrawer((prev) => !prev)}
    >
      <div className="w-8 h-1 bg-primary"></div>
      <div className="w-8 h-1 bg-primary"></div>
      <div className="w-8 h-1 bg-primary"></div>
    </div>
  );
}

export default DrawerBtn;
