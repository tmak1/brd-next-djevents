import Link from 'next/link';
import Image from 'next/image';

import Layout from '../components/Layout';
import Title from '../components/partials/Title';
import Button from '../components/ui/Button';
import NoDataBox from '../components/ui/NoDataBox';

import { fetcher } from '../lib/httpClient';

function EventsPage({ events }) {
  return (
    <Layout title="Events">
      <div>
        <Title textSize="2xl">upcoming events</Title>
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
      </div>
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  let events = [];
  try {
    events = await fetcher(
      `${process.env.NEXT_PUBLIC_API_URL}/events?_sort=date:ASC&_limit=3`
    );
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      events,
    },
    revalidate: 30 * 60,
  };
}

export default EventsPage;
