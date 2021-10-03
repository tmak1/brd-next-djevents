import NotestA from '../components/NotestA';
import NotestB from '../components/NotestB';

function notest() {
  return (
    <form>
      <NotestA abc={<NotestB />} />
    </form>
  );
}

export default notest;
