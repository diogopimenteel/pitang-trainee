import * as yup from "yup";

const UserValidation = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .max(30)
    .matches(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
      "Invalid name"
    )
    .required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(64).required(),
});

export default UserValidation;
