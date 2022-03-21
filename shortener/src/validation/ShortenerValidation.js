import * as yup from "yup";

const ShortenerValidation = yup.object().shape({
  link: yup.string().url().required(),
});

export default ShortenerValidation;
