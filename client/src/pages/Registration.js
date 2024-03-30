import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationScheme = yup.object().shape({
    username: yup
      .string()
      .min(3)
      .max(15)
      .required("You must input a Username!"),
    password: yup
      .string()
      .min(4)
      .max(20)
      .required("You must input a Password!"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <div className="createPostPage">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationScheme}
        >
          <Form className="formContainer">
            <label>Username:</label>
            <ErrorMessage name="username" component="span" />
            <Field
              id="inputCreatePost"
              name="username"
              placeholder="(EX. Snowfeel...)"
            />
            <label>Password:</label>
            <ErrorMessage name="password" component="span" />
            <Field
              id="inputCreatePost"
              name="password"
              placeholder="Your Password..."
              type="password"
            />
            <button type="submit">Register</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Registration;
