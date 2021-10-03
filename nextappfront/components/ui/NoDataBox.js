function NoDataBox({ children }) {
  return (
    <h2 className="mx-auto p-4 border-2 border-red-500 text-center text-xl text-primary font-bold">
      {children}
    </h2>
  );
}

export default NoDataBox;
