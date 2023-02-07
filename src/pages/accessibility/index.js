import React, { useState } from "react";
import Input from "../../components/Input";
import AuthLayout from "../../layouts/authLayout";
import * as S from "../category/styled";
import * as yup from "yup";
import Edit from "../../assets/edit.svg";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import apiService from "../../services/apiService";
import Button from "../../components/button";
import Select from "../../components/select";
import toastify from "../../components/toast";

const initialState = {
  via: "",
  type: "",
};
const Accessibility = () => {
  const [initialValues] = useState(initialState);
  const [id, setId] = useState("");

  const { data: accessibilities, refetch } = useQuery("getAccesibilities", () =>
    apiService.getAccessibilities()
  );

  const addAccessibility = useMutation(
    (data) => apiService.addAccessibilities(data),
    {
      onSuccess: (data) => {
        toastify("success", data?.message);
        resetForm();
        refetch();
      },
    }
  );

  const updateAccessibility = useMutation(
    (data) => apiService.updateAccessibilities(data),
    {
      onSuccess: (data) => {
        toastify("success", data?.message);
        resetForm();
        setId("");
        refetch();
      },
    }
  );

  const removeAccessibilityMutation = useMutation(
    (data) => apiService.removeAccessibilities(data),
    {
      onSuccess: (data) => {
        toastify("success", data?.message);
        refetch();
      },
    }
  );
  const schema = yup.object({
    via: yup.string().required("*via is required"),
    type: yup.string().required("*type is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (data) => {
      if (id) {
        updateAccessibility.mutate({ ...data, _id: id });
      } else {
        addAccessibility.mutate(data);
      }
    },
  });

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
  } = formik;

  const handleRemoveAccessibility = (id) => {
    removeAccessibilityMutation.mutate({ _id: id });
  };

  const handleEdit = (id, via) => {
    setFieldValue("via", via);
    setId(id);
  };
  return (
    <S.Category>
      <AuthLayout>
        <div className="section">
          <h1>Accessibility</h1>
          <Input
            type="text"
            value={values.via}
            error={errors.via}
            placeholder="add vehicle accessibility like car etc."
            onChange={handleChange}
            name="via"
          />

          <Select
            options={[
              { value: "vehicle", item: "vehicle" },
              { value: "individual", item: "individual" },
            ]}
            value={values.type}
            error={errors.type}
            onChange={handleChange}
            name="type"
            selectOption="select accessiblity"
            placeholder="select accessiblity for, like: car,females etc"
          />

          <Button
            hasBackground
            onClick={handleSubmit}
            title={id ? "update accessibility" : "add accessibility"}
          />

          {accessibilities?.length > 0 && (
            <small>Note: double click to remove a accessibility</small>
          )}

          <div className="m-40 cat-section">
            {accessibilities?.map((p) => (
              <div
                className="card"
                onDoubleClick={() => handleRemoveAccessibility(p?._id)}
              >
                <div>
                  {p?.type === "vehicle"
                    ? `accessible via ${p?.via}`
                    : `available for ${p?.via}`}
                </div>
                <img
                  src={Edit}
                  onClick={() => handleEdit(p?._id, p?.via)}
                  width={20}
                  height={20}
                  className="edit"
                  alt="edit"
                />
              </div>
            ))}
          </div>
        </div>
      </AuthLayout>
    </S.Category>
  );
};

export default Accessibility;
