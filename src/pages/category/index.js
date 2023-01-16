import React, { useState } from "react";
import Input from "../../components/Input";
import AuthLayout from "../../layouts/authLayout";
import * as S from "./styled";
import * as yup from "yup";
import Edit from "../../assets/edit.svg";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import apiService from "../../services/apiService";
import Button from "../../components/button";
import toastify from "../../components/toast";

const initialState = {
  name: "",
};
const Category = () => {
  const [initialValues] = useState(initialState);
  const [id, setId] = useState("");

  const { data: categories, refetch } = useQuery("getCategories", () =>
    apiService.getCategories()
  );

  const addCategory = useMutation((data) => apiService.addCategory(data), {
    onSuccess: (data) => {
      toastify("success", data?.message);
      resetForm();
      refetch();
    },
  });

  const updateCategory = useMutation(
    (data) => apiService.updateCategory(data),
    {
      onSuccess: (data) => {
        toastify("success", data?.message);
        resetForm();
        setId("");
        refetch();
      },
    }
  );

  const removeCategoryMutation = useMutation(
    (data) => apiService.removeCategory(data),
    {
      onSuccess: (data) => {
        toastify("success", data?.message);
        refetch();
      },
    }
  );
  const schema = yup.object({
    name: yup.string().required("*name is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (data) => {
      if (id) {
        updateCategory.mutate({ ...data, _id: id });
      } else {
        addCategory.mutate(data);
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

  const handleRemoveCategory = (id) => {
    removeCategoryMutation.mutate({ _id: id });
  };

  const handleEdit = (id, name) => {
    setFieldValue("name", name);
    setId(id);
  };
  return (
    <S.Category>
      <AuthLayout>
        <div className="section">
          <h1>Category</h1>
          <Input
            type="text"
            value={values.name}
            error={errors.name}
            placeholder="add category"
            onChange={handleChange}
            name="name"
          />
          <Button
            hasBackground
            onClick={handleSubmit}
            title={id ? "update category" : "add category"}
          />

          <div className="m-40 cat-section">
            {categories?.map((p) => (
              <div
                className="card"
                onDoubleClick={() => handleRemoveCategory(p?._id)}
              >
                <div>{p?.name}</div>
                <img
                  src={Edit}
                  onClick={() => handleEdit(p?._id, p?.name)}
                  width={20}
                  height={20}
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

export default Category;
