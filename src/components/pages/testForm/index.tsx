import { useState } from "react";
import { useForm } from "react-hook-form";

import AppContainer from "../../appContainer";
import MarvelButton from "../../marvelButton";

import "./style.scss";

type TestForm = {
  firstName: string;
  lastName: string;
  category: string;
  aboutYou: string;
}

enum TestFormInputNames {
  firstName = 'firstName',
  lastName = 'lastName',
  // phoneNumber = 'phoneNumber',
  category = 'category',
  aboutYou = 'aboutYou'
}

const selectOptions: Record<string, string> = {
  empty: 'Select...',
  bumer: 'Bumer',
  zumer: 'Zumer',
  singer: 'Singer',
  doter: 'Doter'
};

export default function TestFormPage() {
  const { register, handleSubmit, setValue, clearErrors, formState: {errors} } = useForm<TestForm>({
    defaultValues: {
      [TestFormInputNames.firstName]: 'Wrong',
      [TestFormInputNames.lastName]: 'Data',
      [TestFormInputNames.aboutYou]: 'genius'
    }
  });

  // const submit: SubmitHandler<TestForm> = data: any => console.log('data', data);
  const [data, setData] = useState("");

  const onTestButtonClick = () => {
    setValue(TestFormInputNames.firstName, "Alex");
    setValue(TestFormInputNames.lastName, "Stoliarenko");
    setValue(TestFormInputNames.aboutYou, "Not a genius");
    setValue(TestFormInputNames.category, "B");
  };

  const form = (
    <form className="testForm"  onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
      <div className="testForm__inputs">
        <input {...register(TestFormInputNames.firstName)} placeholder="First name" />
        <input {...register(TestFormInputNames.lastName)} placeholder="Last name" />
        <select {...register(TestFormInputNames.category, { required: true })} aria-invalid={errors.category ? true : false}>
          {
            Object.keys(selectOptions).map((key, index) => {
              return <option key={index} value={key}>{selectOptions[key]}</option>;
            })
          }
        </select>
        <textarea {...register(TestFormInputNames.aboutYou)} placeholder="About you" />
      </div>
      <p>{data}</p>
      <div className="testForm__buttons">
        <MarvelButton
          buttonStyle="main"
          onClickHandler={() => {}} /* TODO: */
          text="Submit"
          type="submit"
        />
        <MarvelButton
          buttonStyle="main"
          onClickHandler={onTestButtonClick}
          text="Test BUTTON"
          type="button"
        />
        <MarvelButton
          buttonStyle="secondary"
          onClickHandler={clearErrors}
          text="CLEAR errors"
          type="button"
        />
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
