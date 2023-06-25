import propTypes from "prop-types";

function Error(props) {
  const { errorMessage } = props;

  return (
    <p className="text text_type_main-medium mt-30 mb-10 ml-10">
      {errorMessage}
    </p>
  );
};

Error.propTypes = {
  errorMessage: propTypes.string.isRequired
};

export default Error;