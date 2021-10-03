import { useEffect, useContext } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FaUser } from 'react-icons/fa';

import Layout from '../../components/Layout';
import Input from '../../components/form-elements/Input';
import Button from '../../components/ui/Button';

import { AuthContext } from '../../contexts/AuthProvider';
import useToast from '../../hooks/useToast';

function LoginPage() {
  const { toastMsg, toastError, toastPromise, Toast } = useToast();
  const { user, login, error, resetError } = useContext(AuthContext);

  const initialValues = { email: '', password: '' };
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = async ({ email, password }, { setSubmitting }) => {
    toastPromise(login({ email, password }), {
      pending: 'Logging in...',
      success: '',
      error: '',
    });
    setSubmitting(false);
  };

  useEffect(() => {
    if (error) {
      toastError({ message: error.message, onClose: resetError });
    } else if (user) {
      toastMsg({
        message: `Logged in! ${user.username ? 'as' && user?.username : ''}`,
      });
    }
  });

  return (
    <Layout title="Login">
      <div className="w-full mt-20 mx-auto p-8 rounded shadow-2xl sm:w-1/2 lg:w-5/12">
        <div className="flex items-baseline gap-4 text-4xl font-rubik font-bold">
          <FaUser />
          Login
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
          enableReinitialize
        >
          {({ isValid, isSubmitting }) => (
            <Form className="pt-10 rounded">
              <div className="mb-8">
                <Input type="email" id="email" name="email" label="Email" />
              </div>
              <div className="mb-8">
                <Input
                  type="password"
                  id="password"
                  name="password"
                  label="Password"
                />
              </div>
              <Button
                type="submit"
                widthXS="full"
                heightXS={10}
                width="full"
                height={12}
                textSizeSM="lg"
                textSizeLG="xl"
                disabled={!isValid || isSubmitting}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <p className="mt-10 text-gray-500 font-light font-roboto">
          Don't have an account?
          <Link href="/account/signup">
            <a className="ml-2 text-secondary">Register</a>
          </Link>
        </p>
      </div>
      <Toast />
    </Layout>
  );
}

export default LoginPage;
