import { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form/dist/index.ie11";

const FormContext = createContext({});

FormProvider.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.string,
  onSuccess: PropTypes.func,
};

FormProvider.propTypes = {
  children: PropTypes.node,
  onSubmit: async () => null,
  onSuccess: () => null,
};

export default function FormProvider({ children, onSubmit, onSuccess }) {
  const { handleSubmit, control, errors, register } = useForm();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const renderFields = () => !success && children;

  const renderThankYou = () =>
    success && (
      <div className="form__thank_you">
        <p>Changes saved.</p>
      </div>
    );

  const renderError = () =>
    error &&
    !success && (
      <div>
        <p>{error}</p>
      </div>
    );

  const submitHandler = handleSubmit((formData) => {
    console.log(formData);
    onSubmit(formData)
      .then((resp) => {
        console.log(resp);
        if (resp.error) {
          return setError(error.message || "An error occurred.");
        }

        setSuccess(true);
        onSuccess(resp, formData);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message || "An error occurred.");
      });
  });

  return (
    <FormContext.Provider
      value={{
        control,
        register,
        errors,
      }}
    >
      <form className="form" onSubmit={submitHandler}>
        {renderFields()}
        {renderThankYou()}
        {renderError()}
      </form>
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
