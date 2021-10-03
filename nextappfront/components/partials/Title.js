function Title({ children, textSize = 'lg', textCenter = true, mt = 0 }) {
  return (
    <div>
      <h1
        className={`my-10 mt-${mt} ${
          textCenter && 'text-center'
        } text-${textSize} font-rubik font-bold uppercase md:text-left`}
      >
        {children}
      </h1>
    </div>
  );
}

export default Title;
