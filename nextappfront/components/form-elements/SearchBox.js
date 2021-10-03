import { useState } from 'react';
import { useRouter } from 'next/router';
import { BiSearchAlt } from 'react-icons/bi';

function SearchBox() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm !== '') {
      router.push(`/search?searchTerm=${searchTerm}`);
    }
  };
  return (
    <form
      className="flex justify-between items-center gap-3"
      onSubmit={handleSubmit}
    >
      <input
        className="w-52 h-8 px-3 border-2 border-gray-300"
        type="text"
        name="search"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.trim())}
      />
      <BiSearchAlt
        className="cursor-pointer"
        size={25}
        color="#ef4444"
        onClick={handleSubmit}
      />
    </form>
  );
}

export default SearchBox;
