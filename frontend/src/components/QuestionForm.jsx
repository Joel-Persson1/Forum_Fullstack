import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { GlobalContext } from "../context/GlobalContextProvider";
import { InputField } from "./InputField";

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
      {error && <p className="error-box">{error}</p>}

      {successMsg && (
        <p className="success-message">Thank you for your question!</p>
      )}

      {!error && !successMsg && (
        <form onSubmit={handleOnSubmit} className="form">
          {errors.title && <p className="error">{errors.title}</p>}
          <InputField
            label="Question Title"
            id="title"
            refProp={titleRef}
            error={errors.title}
          ></InputField>

          {errors.content && <p className="error">{errors.content}</p>}
          <InputField
            label="Question Description"
            id="content"
            type="textarea"
            refProp={contentRef}
            error={errors.content}
          ></InputField>

          <div className="inputField">
            {errors.category && <p className="error">{errors.category}</p>}
            <label htmlFor="category">Category</label>
            <select id="category" ref={categoryRef}>
              <option value="">Select a category</option>
              <option value="coding">Coding</option>
              <option value="cooking">Cooking</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          <button type="submit">Publish Question</button>
        </form>
      )}
    </>
  );
}
