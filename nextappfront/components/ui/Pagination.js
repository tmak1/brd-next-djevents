const showUpto = 2;

function Pagination({ eventsCount, page, setPage, perPage }) {
  const maxPage = () =>
    Math.floor(eventsCount / perPage) + (eventsCount % perPage > 0 ? 1 : 0);

  const handleNext = () => {
    if (page < maxPage()) {
      setPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  const handleClick = (e) => {
    setPage(+e.target.textContent);
  };
  const toBeShownDotted = (num) =>
    (num < page - showUpto && num !== 1) ||
    (num > page + showUpto && num !== maxPage());

  const notToBeShown = (num) =>
    (num < page - showUpto - 1 && num !== 1) ||
    (num > page + showUpto + 1 && num !== maxPage());

  return (
    <div className="flex justify-center items-center my-12 text-gray-500">
      <div
        className="h-8 w-8 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer md:w-12 md:h-12"
        onClick={handlePrev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-left w-6 h-6"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </div>
      <ul className="flex justify-center items-center h-8 px-3 font-medium rounded-full bg-gray-200 md:h-12">
        {[...Array(maxPage() || 0).keys()].map((num) => (
          <li
            key={num}
            onClick={
              toBeShownDotted(num + 1) || notToBeShown(num + 1)
                ? () => {}
                : handleClick
            }
          >
            <div
              className={`w-8 h-8 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full 
              ${page === num + 1 && 'bg-primary text-white md:w-10 md:h-10'} ${
                notToBeShown(num + 1) && 'hidden'
              }`}
            >
              {toBeShownDotted(num + 1) ? '...' : num + 1}
            </div>
          </li>
        ))}
      </ul>
      <div
        className="h-8 w-8 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer md:w-12 md:h-12"
        onClick={handleNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-right w-6 h-6"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div>
  );
}

export default Pagination;
