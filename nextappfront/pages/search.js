import qs from 'qs';
import Link from 'next/link';
import Image from 'next/image';

import Layout from '../components/Layout';
import Title from '../components/partials/Title';
import Button from '../components/ui/Button';
import NoDataBox from '../components/ui/NoDataBox';

import { fetcher } from '../lib/httpClient';

function EventsSearchPage({ events }) {
  return (
    <Layout title="Search events">
      <div>
        <Title textSize="2xl">Search Results</Title>
        <div>
          {events.length <= 0 ? (
            <NoDataBox> No events found!</NoDataBox>
          ) : (
            <ul>
              {events.map((event) => (
                <li key={event.id}>
                  <div className="flex flex-col justify-start items-start gap-4 h-60 my-8 p-5 shadow-xl sm:flex-row sm:justifiy-between sm:items-center sm:gap-8">
                    <Image
                      className="thumbnail"
                      src={event.image?.formats?.thumbnail?.url}
                      width={200}
                      height={200}
                      alt={event.title}
                    />

                    <div className="flex justify-between items-center w-full text-sm md:text-lg">
                      <div className="w-2/3">
                        <p>
                          {event.date} at {event.time}
                        </p>
                        <p className="font-rubik font-bold">{event.name}</p>
                      </div>
                      <Link href={`/events/${event.slug}`}>
                        <a>
                          <Button>details</Button>
                        </a>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const { searchTerm } = query;
  let events = [];
  const queryString = qs.stringify({
    _where: {
      _or: [
        { name_contains: searchTerm },
        { venue_contains: searchTerm },
        { performers_contains: searchTerm },
        { description_contains: searchTerm },
      ],
    },
  });
  try {
    events = await fetcher(
      `${process.env.NEXT_PUBLIC_API_URL}/events?${queryString}&_sort=date:ASC`
    );
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      events,
    },
  };
}

export default EventsSearchPage;
