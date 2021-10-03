import { useRouter } from 'next/router';

function GoBack() {
  const { back } = useRouter();
  return (
    <button
      className="font-roboto text-left text-lg text-secondary opacity-60 cursor-pointer"
      onClick={() => back()}
    >
      {'< '}Go Back
    </button>
  );
}

export default GoBack;
