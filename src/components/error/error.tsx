import { FC } from "react";

type TError = {
  errorMessage: string;
};

const Error: FC<TError> = ({ errorMessage }) => {

  return (
    <p className="text text_type_main-medium mt-30 mb-10 ml-10">
      {errorMessage}
    </p>
  );
};

export default Error;