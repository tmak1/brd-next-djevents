import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout';
import Title from '../../components/partials/Title';
import Button from '../../components/ui/Button';

import { fetcher } from '../../lib/httpClient';
import Pagination from '../../components/ui/Pagination';
import NoDataBox from '../../components/ui/NoDataBox';

function EventsListPage({ events, eventsCount }) {
  const [perPage, setPerPage] = useState(3);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const handlePerPageChange = (e) => {
    setPerPage(+e.target.value);
  };

  useEffect(() => {
    router.push(`/events?page=${page}&perPage=${perPage}`);
  }, [page, perPage]);
  return (
    <Layout title="Events">
      <div>
        <Title textSize="2xl">Events</Title>
        <select
          className="p-4 border-2 border-gray-200 font-bold"
          onChange={handlePerPageChange}
        >
          <option value={1}>1 per page</option>
          <option value={2}>2 per page</option>
          <option value={3}>3 per page</option>
        </select>
        <div>
          {events.length <= 0 ? (
            <NoDataBox> No upcoming events found!</NoDataBox>
          ) : (
            <ul>
              {events.map((event) => (
                <li key={event.id}>
                  <div className="flex flex-col justify-start items-start gap-4 my-8 p-5 shadow-md sm:flex-row sm:justifiy-between sm:items-center sm:gap-8">
                    <a
                      className="w-full h-72 lg:w-1/3 lg:h-44"
                      href={event.image?.url || '#'}
                      target={event.image && '__blank'}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={
                            event.image?.formats?.thumbnail?.url ||
                            '/images/event-default.png'
                          }
                          layout="fill"
                          alt={event.title}
                        />
                      </div>
                    </a>

                    <div className="flex flex-col justify-start items-start gap:4 w-full text-sm md:text-lg lg:flex-row lg:justify-between lg:items-center">
                      <div className="w-2/3 mb-4 sm:mb-8 lg:mb-0">
                        <p>
                          {event.date} at {event.time}
                        </p>
                        <p className="font-rubik font-bold">{event.name}</p>
                      </div>
                      <Link href={`/events/${event.slug}`}>
                        <a>
                          <Button width={28}>details</Button>
                        </a>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Pagination
          eventsCount={eventsCount}
          page={page}
          setPage={setPage}
          perPage={perPage}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const { page = 1, perPage = 3 } = query;
  const start = (+page - 1) * +perPage;
  let events = [];
  let eventsCount = 0;
  try {
    events = await fetcher(
      `${process.env.NEXT_PUBLIC_API_URL}/events?_start=${start}&_limit=${perPage}&_sort=date:ASC`
    );
    eventsCount = await fetcher(
      `${process.env.NEXT_PUBLIC_API_URL}/events/count`
    );
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      events,
      eventsCount,
    },
  };
}

export default EventsListPage;
