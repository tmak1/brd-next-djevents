import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaTimes, FaPencilAlt } from 'react-icons/fa';

import Layout from '../../components/Layout';
import GoBack from '../../components/partials/GoBack';
import GoogleMapLink from '../../components/partials/GoogleMapLink';
import Title from '../../components/partials/Title';

import useToast from '../../hooks/useToast';

import { fetcher } from '../../lib/httpClient';

function EventDetailsPage({ event }) {
  const router = useRouter();
  const { toastMsg, toastPromise, Toast } = useToast();
  const deleteRequest = async () => {
    await fetcher(
      `${process.env.NEXT_PUBLIC_API_URL}/upload/files/${event.image?.id}`,
      {
        method: 'DELETE',
      }
    );
    await fetcher(`${process.env.NEXT_PUBLIC_API_URL}/events/${event.id}`, {
      method: 'DELETE',
    });
  };
  const handleDelete = async () => {
    try {
      await toastPromise(deleteRequest, {
        pending: 'Deleting Image...',
        success: 'Image deleted!',
        error: 'Image delete failed!',
      });
      toastMsg({
        message: 'Event Deleted!',
        route: `/`,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title="Event Details">
      {event && (
        <div>
          <div className="flex justify-end gap-6 mr-6 mb-6">
            <button
              className="text-secondary"
              onClick={() => router.push(`/events/edit/${event.slug}`)}
            >
              <FaPencilAlt className="inline mr-2" />
              Edit Event
            </button>
            <button className="text-red-600" onClick={handleDelete}>
              <FaTimes className="inline mr-2" />
              Delete Event
            </button>
          </div>
          <h3 className="font-roboto">
            {moment(event?.date).format('MMMM Do, YYYY')} - {event.time}
          </h3>
          <Title textCenter={false} mt={2}>
            {event.name}
          </Title>
          <a href={event.image?.url || '#'} target={event.image && '__blank'}>
            <Image
              src={event.image?.url || '/images/event-default.png'}
              width={900}
              height={700}
              alt=""
            />
          </a>
          <div className="mt-6 p-2">
            <div className="mb-4">
              <h2 className="mb-2 font-rubik font-bold">Performers</h2>
              <div>
                {event.performers.length === 0 ? (
                  <p>No performers listed!</p>
                ) : (
                  <ul>
                    {event.performers.split(',').map((performer, index) => (
                      <li key={index}>{performer}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="mb-4">
              <h2 className="mb-2 font-rubik font-bold">Description</h2>
              <p>{event.description}</p>
            </div>
            <div className="mb-4">
              <h2 className="mb-2 font-rubik font-bold">Venue:Encore</h2>
              <div className="flex flex-col gap-2 md:flex-row">
                <p>{event.venue}</p>
                <p className="hidden md:block"> | </p>
                <GoogleMapLink href="https://www.google.com/maps/search/?api=1&query=1200%20Pennsylvania%20Ave%20SE%2C%20Washington%2C%20District%20of%20Columbia%2C%2020003">
                  {event.address}
                </GoogleMapLink>
              </div>
            </div>
          </div>
          {!router.query?.redirectFrom?.includes('editpage') && (
            <div className="mt-5 px-2">
              <GoBack />
            </div>
          )}
          <Toast />
        </div>
      )}
    </Layout>
  );
}

export async function getStaticPaths() {
  let paths;
  try {
    const events = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}/events`);
    paths = events.map((evt) => ({ params: { slug: evt.slug } }));
  } catch (error) {
    console.log(error);
  }

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(ctx) {
  const { params } = ctx;
  let event;
  try {
    const events = await fetcher(
      `${process.env.NEXT_PUBLIC_API_URL}/events?_slug=${params.slug}`
    );
    event = events[0];
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      event,
    },
    notFound: !event,
  };
}

export default EventDetailsPage;
