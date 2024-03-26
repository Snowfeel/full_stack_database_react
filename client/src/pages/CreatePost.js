import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const initialValues = {
    title: "",
    content: "",
    username: "",
  };

  const validationScheme = yup.object().shape({
    title: yup.string().required("You must input a Title!"),
    content: yup.string().required(),
    username: yup
      .string()
      .min(3)
      .max(15)
      .required("You must input a Username!"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((res) => {
      navigate("/");
    });
  };

  let navigate = useNavigate();

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationScheme}
      >
        <Form className="formContainer">
          <label>Title:</label>
          <ErrorMessage name="title" component="span" />
          <Field
            id="inputCreatePost"
            name="title"
            placeholder="(EX. Title...)"
          />
          <label>Post:</label>
          <ErrorMessage name="content" component="span" />
          <Field
            id="inputCreatePost"
            name="content"
            placeholder="(EX. Post...)"
          />
          <label>Username:</label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="(EX. Snowfeel...)"
          />
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
