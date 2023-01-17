import React, { useState } from "react";
import Input from "../../components/Input";
import AuthLayout from "../../layouts/authLayout";
import * as S from "./styled";
import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import apiService from "../../services/apiService";
import Button from "../../components/button";
import toastify from "../../components/toast";
import Select from "../../components/select";
import Tag from "../../components/tag";

const initialState = {
  name: "",
  city: "",
  province: "",
};
const Province = () => {
  const [initialValues, setInitialValues] = useState(initialState);

  const { data: provinces, refetch } = useQuery("getProvince", () =>
    apiService.getProvinces()
  );

  const addCityMutation = useMutation((data) => apiService.addCity(data), {
    onSuccess: (data) => {
      toastify("success", data?.message);
      resetForm();
      refetch();
    },
  });

  const removeCityMutation = useMutation(
    (data) => apiService.removeCity(data),
    {
      onSuccess: (data) => {
        toastify("success", data?.message);
        refetch();
      },
    }
  );
  const addProvince = useMutation((data) => apiService.addProvince(data), {
    onSuccess: (data) => {
      toastify("success", data?.message);
      resetForm();
      refetch();
    },
  });

  const schema = yup.object({
    name: yup.string().required("*name is required"),
    city: yup.string(),
    province: yup.string(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (data) => {
      addProvince.mutate(data);
    },
  });

  const { values, errors, handleChange, handleSubmit, resetForm } = formik;

  let count = 0;
  const addCity = (city, _id) => {
    count++;
    if (count === 1) {
      addCityMutation.mutate(
        {
          city,
          _id,
        },
        {
          onSuccess: () => {
            setInitialValues(initialState);
            count = 0;
          },
        }
      );
    }
  };
  const handleRemoveCity = (id, cityId) => {
    removeCityMutation.mutate({ _id: id, cityId });
  };
  return (
    <S.Province>
      <AuthLayout>
        <div className="section">
          <h1>Province</h1>
          <Input
            type="text"
            value={values.name}
            error={errors.name}
            placeholder="add province"
            onChange={handleChange}
            name="name"
          />
          <Button hasBackground onClick={handleSubmit} title="add province" />

          {provinces?.length > 0 && (
            <small>Note: double click to remove a province</small>
          )}
          {provinces?.length > 0 && (
            <div>
              <h4>Add city</h4>
              <Select
                options={provinces?.map((p) => ({
                  value: p?._id,
                  item: p?.name,
                }))}
                value={values.province}
                onChange={handleChange}
                error={errors.province}
                placeholder="select province"
                selectOption="select province"
                name="province"
              />
              {values.province && (
                <div>
                  <Input
                    error={errors.city}
                    value={values.city}
                    onChange={handleChange}
                    placeholder="add city"
                    name="city"
                  />
                  <Button
                    title="add city"
                    onClick={() => addCity(values.city, values.province)}
                  />
                </div>
              )}
            </div>
          )}

          {provinces?.map((p) => (
            <div className="m-40">
              <span>{p?.name}: </span>
              {p?.cities?.map((c) => (
                <Tag
                  onDoubleClick={() => handleRemoveCity(p?._id, c?._id)}
                  color="primary"
                  title={c?.name}
                  hasBackground
                />
              ))}
            </div>
          ))}
        </div>
      </AuthLayout>
    </S.Province>
  );
};

export default Province;
