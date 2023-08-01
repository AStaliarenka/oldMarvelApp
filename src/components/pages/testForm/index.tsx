import { useState } from "react";
import { useForm } from "react-hook-form";

import "./style.scss";

export default function TestFormPage() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const form = (
    <form className="testForm"  onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
      <input {...register("firstName")} placeholder="First name" />
      <select {...register("category", { required: true })}>
        <option value="">Select...</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
      </select>
      <textarea {...register("aboutYou")} placeholder="About you" />
      <p>{data}</p>
      <input type="submit" />
    </form>
  );

  return (
    <div className="wrapper">
      {form}
    </div>
  );
}
