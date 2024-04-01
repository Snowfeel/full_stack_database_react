import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  let navigate = useNavigate();
  const initialValues = {
    title: "",
    content: "",
  };

  const validationScheme = yup.object().shape({
    title: yup.string().required("You must input a Title!"),
    content: yup.string().required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        navigate("/");
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

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
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
