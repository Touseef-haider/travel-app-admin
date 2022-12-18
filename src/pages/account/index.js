import AuthLayout from "../../layouts/authLayout";
import * as S from "./styled";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import * as yup from "yup";
import toastify from "../../components/toast/index";
import apiService from "../../services/apiService";
import Input from "../../components/Input/";
import { useFormik } from "formik";
import Button from "../../components/button/index";

const initialState = {
  _id: "",
  first_name: "",
  last_name: "",
  address: "",
  phone: "",
  city: "",
  state: "",
  zip: "",
};
const Account = () => {
  const [initialValues, setInitialState] = useState(initialState);

  useQuery("getProfile", () => apiService.getOwnProfile(), {
    onSuccess: (data) => {
      setInitialState(data);
    },
  });

  const { mutate, isLoading } = useMutation(
    "addAlbum",
    (data) => apiService.updateProfile(data),
    {
      onSuccess: (data) => {
        toastify("success", data?.message);
      },
      onError: (err) => {
        toastify("error", err?.message);
      },
    }
  );

  const validationSchema = yup.object({
    _id: yup.string(),
    first_name: yup.string().required("*first name is required"),
    last_name: yup
      .string()
      .min(5, "*too short")
      .required("*last name is required"),
    address: yup.string().required("*address is required"),
    phone: yup.string().required("*phone is required"),
    city: yup.string().required("*city is required"),
    state: yup.string().required("*state is required"),
    zip: yup.string().required("*zip is required"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (data) => {
      mutate(data);
    },
  });

  const { values, errors, handleChange, handleSubmit } = formik;
  return (
    <AuthLayout>
      <S.Account>
        <h1>My Account</h1>
        <Input
          label="First Name"
          value={values.first_name}
          error={errors.first_name}
          name="first_name"
          onChange={handleChange}
          type="text"
          placeholder="Add first name"
        />
        <Input
          label="Last Name"
          value={values.last_name}
          error={errors.last_name}
          name="last_name"
          onChange={handleChange}
          type="text"
          placeholder="Add last name"
        />

        <Input
          label="Address"
          value={values.address}
          error={errors.address}
          name="address"
          onChange={handleChange}
          type="text"
          placeholder="Add address"
        />
        <Input
          label="Phone"
          value={values.phone}
          error={errors.phone}
          name="phone"
          onChange={handleChange}
          type="number"
          placeholder="Add phone"
        />
        <Input
          label="City"
          value={values.city}
          error={errors.city}
          name="city"
          onChange={handleChange}
          type="text"
          placeholder="Add city"
        />
        <Input
          label="State"
          value={values.state}
          error={errors.state}
          name="state"
          onChange={handleChange}
          type="text"
          placeholder="Add state"
        />
        <Input
          label="Zip"
          value={values.zip}
          error={errors.zip}
          name="zip"
          onChange={handleChange}
          type="text"
          placeholder="Add zip"
        />

        <Button
          hasBackground
          type="button"
          size="large"
          title={isLoading ? "Please wait" : "Update Profile"}
          onClick={handleSubmit}
        />
      </S.Account>
    </AuthLayout>
  );
};

export default Account;
