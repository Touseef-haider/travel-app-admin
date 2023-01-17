/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef } from "react";
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
  location: "",
  stars: "",
};
const Hotel = () => {
  const [initialValues] = useState(initialState);
  const [id, setId] = useState("");
  const [images, setImages] = useState([]);
  const fileRef = useRef(null);

  const { mutate: imageMutation } = useMutation(
    "img",
    (data) => apiService.addFile(data),
    {
      onSuccess: ({ data }) => {
        const img = [...images];
        img.push({ url: data?.Location });
        setImages(img);
      },
      onError: (error) => {
        toastify("error", error.message);
      },
    }
  );
  const { data: hotels, refetch } = useQuery("getHotels", () =>
    apiService.getHotels()
  );

  const addHotel = useMutation((data) => apiService.addHotel(data), {
    onSuccess: (data) => {
      toastify("success", data?.message);
      setImages([]);
      resetForm();
      refetch();
    },
  });

  const updateHotel = useMutation((data) => apiService.updateHotel(data), {
    onSuccess: (data) => {
      toastify("success", data?.message);
      resetForm();
      setId("");
      refetch();
    },
  });

  const removeHotelMutation = useMutation(
    (data) => apiService.removeHotel(data),
    {
      onSuccess: (data) => {
        toastify("success", data?.message);
        refetch();
      },
    }
  );
  const schema = yup.object({
    name: yup.string().required("*name is required"),
    location: yup.string().required("*location is required"),
    stars: yup.number().required("*stars is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (data) => {
      if (id) {
        updateHotel.mutate({ ...data, _id: id, images });
      } else {
        addHotel.mutate({ ...data, images });
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

  const handleRemoveHotel = (id) => {
    removeHotelMutation.mutate({ _id: id });
  };

  const handleEdit = (id, name, location, stars, images) => {
    setFieldValue("name", name);
    setFieldValue("location", location);
    setFieldValue("stars", stars);
    setImages(images);
    setId(id);
  };

  const handleRemoveImage = (ind) => {
    const filteredImg = images.filter((img, i) => i !== ind);
    setImages(filteredImg);
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
    <S.Hotel>
      <AuthLayout>
        <div className="section">
          <h1>Hotels</h1>
          <Input
            type="text"
            value={values.name}
            error={errors.name}
            placeholder="add hotel name"
            onChange={handleChange}
            name="name"
          />
          <Input
            type="text"
            value={values.location}
            error={errors.location}
            placeholder="add location"
            onChange={handleChange}
            name="location"
          />
          <Input
            type="text"
            value={values.stars}
            error={errors.stars}
            placeholder="add stars"
            onChange={handleChange}
            name="stars"
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
          <div className="images">
            {images?.map((file, index) => (
              <div key={file + index} className="image-holder">
                <img
                  src={Delete}
                  onClick={() => handleRemoveImage(index)}
                  alt="delete"
                  className="image-delete-btn"
                />
                <img
                  src={file?.url}
                  className="image"
                  alt="image"
                  width={50}
                  height={50}
                />
              </div>
            ))}
          </div>
          <Button
            hasBackground
            onClick={handleSubmit}
            title={id ? "update hotel " : "add hotel "}
          />

          {hotels?.length > 0 && (
            <small>Note: double click to remove a hotel</small>
          )}
          <div className="m-40 cat-section">
            {Array.isArray(hotels) &&
              hotels?.length > 0 &&
              hotels?.map((h) => (
                <div
                  key={h?._id}
                  className="card"
                  onDoubleClick={() => handleRemoveHotel(h?._id)}
                >
                  <p>{h?.name}</p>
                  <p>{h?.location}</p>
                  <p>{h?.stars}</p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: "10px",
                    }}
                  >
                    {h?.images?.map((i) => (
                      <img
                        key={i?.url}
                        src={i?.url}
                        alt="hotel-image"
                        width={50}
                        height={50}
                      />
                    ))}
                  </div>
                  <img
                    className="delete"
                    src={Edit}
                    onClick={() =>
                      handleEdit(
                        h?._id,
                        h?.name,
                        h?.location,
                        h?.stars,
                        h?.images
                      )
                    }
                    width={20}
                    height={20}
                    alt="edit"
                  />
                </div>
              ))}
          </div>
        </div>
      </AuthLayout>
    </S.Hotel>
  );
};

export default Hotel;
