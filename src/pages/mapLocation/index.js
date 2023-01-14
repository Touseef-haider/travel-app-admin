import Input from "../../components/Input";
import * as S from "./styled";
import AuthLayout from "../../layouts/authLayout";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import Button from "../../components/button";
import { useMutation, useQuery } from "react-query";
import apiService from "../../services/apiService";
import toastify from "../../components/toast";

const initialState = {
  lat: "",
  lng: "",
  name: "",
};

const Alert = () => {
  const [initialValues, setInitialValues] = useState(initialState);
  const { data } = useQuery("getData", () => apiService.getMapLocations());

  const addPlaceMutation = useMutation(
    (data) => apiService.addPlaceInMap(data),
    {
      onSuccess: (data) => {
        console.log(data);
        toastify("success", data?.message);
        setInitialValues(initialState);
      },
    }
  );

  const schema = yup.object({
    lat: yup.number().required("*lat is required"),
    lng: yup.number().required("*lng is required"),
    name: yup.string().required("*name is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (data) => {
      console.log(data);
      addPlaceMutation.mutate(data);
    },
  });

  const { values, errors, handleChange, handleSubmit } = formik;

  return (
    <S.MapLocation>
      <AuthLayout showFooter>
        <div className="mapLocation">
          <Input
            type="number"
            placeholder="latitude"
            onChange={handleChange}
            name="lat"
            value={values.lat}
            error={errors.lat}
          />
          <Input
            type="number"
            placeholder="longitude"
            onChange={handleChange}
            name="lng"
            value={values.lng}
            error={errors.lng}
          />
          <Input
            type="text"
            placeholder="place name"
            onChange={handleChange}
            name="name"
            value={values.name}
            error={errors.name}
          />
          <Button
            hasBackground
            title="Add"
            size="medium"
            onClick={handleSubmit}
          />
        </div>
        <div style={{ display: "flex", padding: "20px" }}>
          {data?.map((l) => (
            <div
              style={{
                boxShadow: "rgb(0 0 0 / 16%) 0px 0px 3px 0px",
                padding: "10px",
              }}
            >
              <small>{l?.lat}</small>,<small>{l?.lng}</small>
              <br />
              <br />
              <small>{l?.name}</small>
            </div>
          ))}
        </div>
      </AuthLayout>
    </S.MapLocation>
  );
};

export default Alert;
