import { useState } from "react";
import { useForm } from "react-hook-form";
import {get as getDataFromLs} from "local-storage";
import AppContainer from "../../appContainer";
import MarvelButton from "../../marvelButton";
import TestCurrency from "../../testCurrency";
import store from "../../../app/store/store";

import SecondTestSection from "../../testBlock/secondTestSection";
import ThirdTestSection from "../../testBlock/thirdTestSection";

import "./style.scss";

type TestForm = {
  firstName: string;
  lastName: string;
  category: string;
  aboutYou: string;
}

type UserInfo = {
  firstName: string;
  lastName: string;
}

enum TestFormInputNames {
  firstName = "firstName",
  lastName = "lastName",
  // phoneNumber = 'phoneNumber',
  category = "category",
  aboutYou = "aboutYou"
}

const selectOptions: Record<string, string> = {
	bumer: "Bumer",
	zumer: "Zumer",
	singer: "Singer",
	doter: "Doter"
};

export default function TestFormPage() {
	const { register, handleSubmit, setValue, clearErrors, formState: {errors} } = useForm<TestForm>({
		defaultValues: {
			[TestFormInputNames.firstName]: "Wrong",
			[TestFormInputNames.lastName]: "Data",
			[TestFormInputNames.aboutYou]: "genius"
		}
	});

	const userDataFromDB = {
		firstName: "Alex",
		lastName: "Stoliarenko",
		userId: 15
	};

	const [data, setData] = useState("");

	const onTestButtonClick = () => {
		setValue(TestFormInputNames.firstName, "Alex");
		setValue(TestFormInputNames.lastName, "Stoliarenko");
		setValue(TestFormInputNames.aboutYou, "Not a genius");
		setValue(TestFormInputNames.category, Object.keys(selectOptions)[0]);
	};

	const onValidSubmit = (data: TestForm) => {
		const currenUser = getDataFromLs<UserInfo>("user");

		if (currenUser && data.firstName === userDataFromDB.firstName && data.lastName === userDataFromDB.lastName) {
			alert("success");
		}
		else {
			setData(JSON.stringify(data));
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onInvalidSubmit = (...arrM: any[]) => {
		console.log("arrM", arrM);
	}

	const form = (
		<form className="testForm"  onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}>
			<div className="testForm__inputs">
				<input {...register(TestFormInputNames.firstName, { maxLength: 20 })} placeholder="First name" aria-invalid={errors.firstName ? "true" : "false"}/>
				{
					errors.firstName && errors.firstName.type === "maxLength" && (
						<span role="alert">Max length exceeded</span>
					)
				}
				<input {...register(TestFormInputNames.lastName, { maxLength: 20 })} placeholder="Last name" aria-invalid={errors.lastName ? "true" : "false"}/>
				{
					errors.lastName && errors.lastName.type === "maxLength" && (
						<span role="alert">Max length exceeded</span>
					)
				}
				{/* React does not support the selected attribute on <option>. Instead, pass this option’s value to the parent
        <select defaultValue> for an uncontrolled select box, or <select value> for a controlled select. */}
				<select {...register(TestFormInputNames.category, { required: true })} defaultValue={selectOptions.empty} aria-invalid={errors.category ? "true" : "false"}>
					{
						[
							<option key='empty' value=''>Select...</option>,
							...Object.keys(selectOptions).map((key, index) => {
								return <option key={index} value={key}>{selectOptions[key]}</option>;
							})
						]
					}
				</select>
				{errors.category && errors.category.type === "required" && <span>This is required</span>}
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
					buttonStyle="main"
					onClickHandler={() => console.log(store.getState())} /* TODO: */
					text="Show state in console"
					type="button"
				/>
				<MarvelButton
					buttonStyle="secondary"
					onClickHandler={() => {clearErrors()}}
					text="CLEAR errors"
					type="button"
				/>
			</div> 
		</form>
	);

	return (
		<>
			<section className="test-section">
				<AppContainer>
					<div className="test-block">
						{form}
						<TestCurrency currency="USD" baseCurrency="RUB"></TestCurrency>
					</div>
				</AppContainer>
			</section>
			<SecondTestSection/>
			<ThirdTestSection/>
		</>
	);
}
