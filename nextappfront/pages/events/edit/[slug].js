import { useState } from 'react';
import moment from 'moment';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Layout from '../../../components/Layout';
import Title from '../../../components/partials/Title';
import Input from '../../../components/form-elements/Input';
import ImageUpload from '../../../components/form-elements/ImageUpload';
import Button from '../../../components/ui/Button';

import { fetcher } from '../../../lib/httpClient';
import useToast from '../../../hooks/useToast';

function EventEditPage({ event }) {
  const { toastMsg, toastPromise, Toast } = useToast();

  const [imageFile, setImageFile] = useState();
  const fields = [
    'address',
    'date',
    'description',
    'name',
    'performers',
    'time',
    'venue',
  ];
  const initialValues = fields.reduce(
    (obj, item) => ({
      ...obj,
      [item]:
        item !== 'date'
          ? event[item]
          : moment(event[item]).format('yyyy-MM-DD'),
    }),
    {}
  );
  const validationSchema = Yup.object(
    fields.reduce(
      (obj, item) => ({ ...obj, [item]: Yup.string().required('Required') }),
      {}
    )
  );

  const deletePreviousImage = async () => {
    await fetcher(
      `${process.env.NEXT_PUBLIC_API_URL}/upload/files/${event.image?.id}`,
      {
        method: 'DELETE',
      }
    );
  };
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('files', imageFile);
    const imageUploaded = await fetcher(
      `${process.env.NEXT_PUBLIC_API_URL}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    await deletePreviousImage();
    return imageUploaded;
  };
  const editRequest = async (values, imageUploaded) => {
    return await fetcher(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${event?.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, image: imageUploaded[0].id }),
      }
    );
  };
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const imageUploaded = await toastPromise(uploadImage);
      const event = await editRequest(values, imageUploaded);
      toastMsg({
        message: 'Event Edited!',
        onClose: () =>
          router.push(`/events/${event.slug}?redirectFrom=editpage`),
      });
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };
  return (
    <Layout title="Edit event">
      {event && (
        <>
          <Title textCenter={false}>Edit Event - {event.name}</Title>
          {/* {modalOpen && (
            <ConfirmModal
              title="Confirm create event"
              body="Are you sure you wish to create this event?"
              modalOpen={modalOpen}
              onConfirm={() => {
                setModalOpen(false);
                onSubmit();
              }}
              onCancel={() => {
                ref.current.setSubmitting(false);
                setModalOpen(false);
              }}
            />
          )} */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
            enableReinitialize
          >
            {({ isValid, isSubmitting }) => (
              <Form className="flex flex-col justify-center items-center mx-auto pt-14 pb-8 rounded bg-gray-100 md:w-2/3">
                <div className="flex flex-col sm:grid grid-cols-2 w-full mb-2">
                  <div className="w-2/3 mx-auto mb-8">
                    <Input id="name" name="name" label="Event Name" />
                  </div>
                  <div className="w-2/3 mx-auto mb-8">
                    <Input id="venue" name="venue" label="Venue" />
                  </div>
                  <div className="w-2/3 mx-auto mb-8">
                    <Input id="address" name="address" label="Address" />
                  </div>
                  <div className="w-2/3 mx-auto mb-8">
                    <Input
                      id="performers"
                      name="performers"
                      label="Performers"
                    />
                  </div>
                  <div className="w-2/3 mx-auto mb-8">
                    <Input
                      id="date"
                      type="date"
                      name="date"
                      label="Event Date"
                    />
                  </div>
                  <div className="w-2/3 mx-auto mb-8">
                    <Input id="time" name="time" label="Event Time" />
                  </div>
                  <div className="w-2/3 mx-auto mb-8 sm:col-span-2 sm:w-10/12">
                    <ImageUpload
                      setImageFile={setImageFile}
                      defaultVal={event.image.url}
                    />
                  </div>
                  <div className="w-10/12 mx-auto mb-8 sm:col-span-2">
                    <Input
                      id="description"
                      element="textarea"
                      name="description"
                      label="Description"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  widthXS={24}
                  heightXS={10}
                  width={40}
                  height={14}
                  textSizeSM="lg"
                  textSizeLG="xl"
                  disabled={!isValid || isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
          <Toast />
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
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

export default EventEditPage;
