import styles from "../assets/styles/components/form.module.scss";
import { _classes } from "../utils/helpers";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { StandardInput, TextArea, SubmitField } from "./FormFields";
import { useState } from "react";

import API from "../utils/API";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 1 } },
};

const cl = _classes(styles);

ContactForm.propTypes = {};

ContactForm.defaultProps = {};

export default function ContactForm() {
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await new API().post("/inquiries", data);
      setSuccess(true);
    } catch (e) {
      console.error(e);
    }
  };

  const renderSuccess = () => (
    <motion.div
      variants={variants}
      initial={"hidden"}
      animate={"visible"}
      className={cl("_")}
    >
      <p>Thanks for your submission. We'll be in touch!</p>
    </motion.div>
  );

  const renderForm = () => {
    return (
      <motion.div
        variants={variants}
        initial={"hidden"}
        animate={"visible"}
        className={cl("_")}
        id="login_form"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <StandardInput
            name="email"
            type="email"
            register={register({ required: "Email is required" })}
            label="Email"
            error={errors.email}
          />
          <StandardInput
            name="subject"
            type="text"
            register={register({ required: "Subject is required" })}
            label="Subject"
            error={errors.subject}
          />
          <TextArea
            name="comments"
            type="text"
            register={register({ required: "Message is required" })}
            label="Your Message"
            error={errors.comments}
          />

          <SubmitField />
        </form>
      </motion.div>
    );
  };

  return success ? renderSuccess() : renderForm();
}
