import { useState } from "react";
import { useForm } from "react-hook-form";

import AppContainer from "../../appContainer";

import "./style.scss";

type TestForm = {
  firstName: string;
  category: string;
  aboutYou: string;
}

enum TestFormInputNames {
  firstName = 'firstName',
  category = 'category',
  aboutYou = 'aboutYou'
}

export default function TestFormPage() {
  const { register, handleSubmit, setValue, clearErrors, formState: {errors} } = useForm<TestForm>({
    defaultValues: {
      [TestFormInputNames.firstName]: 'ALEXIUS',
      [TestFormInputNames.aboutYou]: 'genius'
    }
  });

  // const submit: SubmitHandler<TestForm> = data: any => console.log('data', data);
  const [data, setData] = useState("");

  const onTestButtonClick = () => {
    setValue(TestFormInputNames.firstName, "Maxim");
    setValue(TestFormInputNames.aboutYou, "Not a genius");
    setValue(TestFormInputNames.category, "B");
  };

  const form = (
    <form className="testForm"  onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
      

      <div className="testForm__inputs">
        <input {...register(TestFormInputNames.firstName)} placeholder="First name" />
        <select {...register(TestFormInputNames.category, { required: true })} aria-invalid={errors.category ? true : false}>
          <option value="">Select...</option>
          <option value="A">Option A</option>
          <option value="B">Option B</option>
        </select>
        <textarea {...register(TestFormInputNames.aboutYou)} placeholder="About you" />
      </div>
      <p>{data}</p>
      <div className="testForm__buttons">
        <button>Submit</button>
        <button type="button" onClick={() => {onTestButtonClick()}}>Test BUTTON</button>
        <button type="button" onClick={() => {clearErrors()}}>CLEAR errors</button>
      </div>
      
    </form>
  );

  return (
    <div className="wrapper">
      <AppContainer>
        {form}
      </AppContainer>
    </div>
  );
}
