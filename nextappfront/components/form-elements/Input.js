import { Field, ErrorMessage } from 'formik';

function Input({ element = 'input', type = 'text', id, name, label }) {
  return (
    <>
      {element === 'input' && (
        <div className="relative">
          <label
            className="mb-2 block text-gray-500 hover:text-black"
            htmlFor={id}
          >
            {label}
          </label>
          <Field
            className={`w-full h-10 px-3 border-2 border-gray-200 ${
              type === 'date' && 'cursor-pointer'
            }`}
            id={id}
            type={type}
            name={name}
          />
          <div className="mt-1 text-red-600">
            <ErrorMessage name={name} />
          </div>
        </div>
      )}
      {element === 'textarea' && (
        <div>
          <label
            className="my-4 block text-gray-500 font-light hover:text-black"
            htmlFor={id}
          >
            {label}
          </label>
          <Field
            className="w-full p-5"
            as="textarea"
            maxLength={250}
            rows={7}
            id={id}
            name={name}
          />
          <div className="mt-1 text-red-600">
            <ErrorMessage name={name} />
          </div>
        </div>
      )}
    </>
  );
}

export default Input;
