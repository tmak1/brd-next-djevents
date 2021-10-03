import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Layout from '../../components/Layout';
import Title from '../../components/partials/Title';
import Input from '../../components/form-elements/Input';
import Button from '../../components/ui/Button';
import ImageUpload from '../../components/form-elements/ImageUpload';

import { fetcher } from '../../lib/httpClient';
import useToast from '../../hooks/useToast';

function CreateEventPage() {
  const { toastMsg, toastPromise, Toast } = useToast();
  // const [modalOpen, setModalOpen] = useState(false);

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
    (obj, item) => ({ ...obj, [item]: '' }),
    {}
  );
  const validationSchema = Yup.object(
    fields.reduce(
      (obj, item) => ({ ...obj, [item]: Yup.string().required('Required') }),
      {}
    )
  );
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
    return imageUploaded;
  };

  const createRequest = async (values, imageUploaded) => {
    return await fetcher(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, image: imageUploaded[0].id }),
    });
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const imageUploaded = await toastPromise(uploadImage);
      const event = await createRequest(values, imageUploaded);
      console.log('event ', event);
      toastMsg({
        message: 'Event Created!',
        onClose: () => router.push(`/events/${event.slug}`),
      });
    } catch (error) {
      console.log('Something went wrong');
    }
    setSubmitting(false);
  };

  return (
    <Layout title="Add event">
      <Title>Add new event</Title>
      {/* {modalOpen && (
        <ConfirmModal
          title="Confirm create event"
          body="Are you sure you wish to create this event?"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setConfirm={setConfirm}
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
                <Input id="performers" name="performers" label="Performers" />
              </div>
              <div className="w-2/3 mx-auto mb-8">
                <Input id="date" type="date" name="date" label="Event Date" />
              </div>
              <div className="w-2/3 mx-auto mb-8">
                <Input id="time" name="time" label="Event Time" />
              </div>
              <div className="w-2/3 mx-auto mb-8 sm:col-span-2 sm:w-10/12">
                <ImageUpload setImageFile={setImageFile} />
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
    </Layout>
  );
}

export default CreateEventPage;
