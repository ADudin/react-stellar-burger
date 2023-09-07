import { ChangeEvent, useState } from "react";

interface IUseForm {[key: string]: string};

export const useForm = (inputValues: IUseForm) => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = evt.target;
    setValues({ ...values, [name]: value});
  };
  return { values, handleChange, setValues };
};