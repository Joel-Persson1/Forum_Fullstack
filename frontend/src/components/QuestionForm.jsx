import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { GlobalContext } from "../context/GlobalContextProvider";
import { Error } from "./Error";
import { Form } from "./Form";

export function QuestionForm() {
  const { handleApiRequest, error } = useContext(GlobalContext);
  let navigate = useNavigate();
  const titleRef = useRef();
  const contentRef = useRef();
  const categoryRef = useRef();

  const [successMsg, setSuccessMsg] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    category: "",
  });

  const validateFields = () => {
    const newErrors = {
      title:
        titleRef.current.value.length < 3
          ? "Title must be at least 3 characters long."
          : "",
      content:
        contentRef.current.value.length < 10
          ? "Content must be at least 10 characters long."
          : "",
      category: !categoryRef.current.value ? "Category is required." : "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (validateFields()) {
      const questionResults = {
        title: titleRef.current.value,
        content: contentRef.current.value,
        category: categoryRef.current.value,
      };

      const result = await handleApiRequest({
        endpoint: "/api/question/post",
        method: "POST",
        body: questionResults,
        errMsg: "Failed to post question",
      });

      if (result) {
        titleRef.current.value = "";
        contentRef.current.value = "";
        categoryRef.current.value = "";
        setSuccessMsg(true);
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      }
    }
  };

  return (
    <>
      {error && <Error error={error} />}

      {successMsg && (
        <p className="success-message">Thank you for your question!</p>
      )}

      {!error && !successMsg && (
        <Form
          handleOnSubmit={handleOnSubmit}
          errors={errors}
          titleRef={titleRef}
          contentRef={contentRef}
          categoryRef={categoryRef}
        />
      )}
    </>
  );
}
