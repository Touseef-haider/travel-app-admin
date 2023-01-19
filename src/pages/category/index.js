/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-undef */
import React, { useRef, useState } from "react";
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
import Delete from "../../assets/delete.svg";

const initialState = {
  name: "",
};
const Category = () => {
  const [initialValues] = useState(initialState);
  const [id, setId] = useState("");

  const [images, setImages] = useState([]);
  const fileRef = useRef(null);
  const [image, setImage] = useState("");

  const { mutate: imageMutation } = useMutation(
    "img",
    (data) => apiService.addFile(data),
    {
      onSuccess: ({ data }) => {
        setImage(data?.Location);
      },
      onError: (error) => {
        toastify("error", error.message);
      },
    }
  );

  const { data: categories, refetch } = useQuery("getCategories", () =>
    apiService.getCategories()
  );

  const addCategory = useMutation((data) => apiService.addCategory(data), {
    onSuccess: (data) => {
      toastify("success", data?.message);
      resetForm();
      setImage("");

      refetch();
    },
  });

  const updateCategory = useMutation(
    (data) => apiService.updateCategory(data),
    {
      onSuccess: (data) => {
        toastify("success", data?.message);
        resetForm();
        setImage("");
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
        updateCategory.mutate({ ...data, _id: id, image });
      } else {
        addCategory.mutate({ ...data, image });
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

  const handleEdit = (id, name, image) => {
    setFieldValue("name", name);
    setImage(image);
    setId(id);
  };

  const handleRemoveImage = (ind) => {
    setImage("");
  };

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      if (file) {
        imageMutation(formData);
      }
      e.target.value = "";
    }
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
          <br />

          <input
            ref={fileRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <Button
            type="button"
            size="large"
            title="Upload Image"
            onClick={(e) => {
              e.stopPropagation();
              fileRef.current.click();
            }}
          />
          {image && (
            <div className="images">
              <div className="image-holder">
                <img
                  src={Delete}
                  onClick={() => handleRemoveImage()}
                  alt="delete"
                  className="image-delete-btn"
                />
                <img
                  src={image}
                  className="image"
                  alt="image"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          )}
          <Button
            hasBackground
            onClick={handleSubmit}
            title={id ? "update category" : "add category"}
          />

          {categories?.length > 0 && (
            <small>Note: double click to remove a category</small>
          )}
          <div className="m-40 cat-section">
            {categories?.map((p) => (
              <div
                className="card"
                onDoubleClick={() => handleRemoveCategory(p?._id)}
              >
                <div>{p?.name}</div>
                <img
                  src={Edit}
                  onClick={() => handleEdit(p?._id, p?.name, p?.image)}
                  width={20}
                  className="edit"
                  height={20}
                  alt="edit"
                />
                {p?.image && (
                  <img
                    src={p?.image}
                    width={20}
                    style={{ marginTop: "30px" }}
                    height={20}
                    alt="edit"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </AuthLayout>
    </S.Category>
  );
};

export default Category;
