import { InputField } from "./InputField";

export function Form({
  handleOnSubmit,
  errors,
  titleRef,
  contentRef,
  categoryRef,
}) {
  return (
    <form onSubmit={handleOnSubmit} className="form">
      {errors.title && <p className="error">{errors.title}</p>}
      <InputField
        label="Question Title"
        id="title"
        refProp={titleRef}
        error={errors.title}
      />

      {errors.content && <p className="error">{errors.content}</p>}
      <InputField
        label="Question Description"
        id="content"
        type="textarea"
        refProp={contentRef}
        error={errors.content}
      />

      <div className="inputField">
        {errors.category && <p className="error">{errors.category}</p>}
        <label htmlFor="category">Category</label>
        <select id="category" ref={categoryRef}>
          <option value="">Select a category</option>
          <option value="coding">Coding</option>
          <option value="cooking">Cooking</option>
          <option value="sports">Sports</option>
          <option value="tv">TV</option>
          <option value="politics">Politics</option>
          <option value="friends">Friends</option>
          <option value="others">Others</option>
        </select>
      </div>

      <button type="submit">Publish Question</button>
    </form>
  );
}
