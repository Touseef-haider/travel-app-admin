/* eslint-disable jsx-a11y/img-redundant-alt */
import Input from "../../components/Input";
import * as S from "./styled";
import AuthLayout from "../../layouts/authLayout";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import Button from "../../components/button";
import { useMutation, useQuery } from "react-query";
import apiService from "../../services/apiService";
import toastify from "../../components/toast";
import Delete from "../../assets/delete.svg";

import Quill from "../../components/quill";
import Select from "../../components/select";

const initialState = {
  lat: "",
  lng: "",
  name: "",
  location: "",
  contact: "",
  description: "",
  province: "",
  city: "",
};

const Alert = () => {
  const [initialValues, setInitialValues] = useState(initialState);
  const { data } = useQuery("getData", () => apiService.getMapLocations());
  const [images, setImages] = useState([]);
  const fileRef = useRef(null);

  const { mutate: imageMutation } = useMutation(
    "img",
    (data) => apiService.addFile(data),
    {
      onSuccess: ({ data }) => {
        const img = [...images];
        img.push(data?.Location);
        setImages(img);
      },
      onError: (error) => {
        toastify("error", error.message);
      },
    }
  );

  const { data: provinces } = useQuery("getProvinces", () =>
    apiService.getProvinces()
  );

  const addPlaceMutation = useMutation(
    (data) => apiService.addPlaceInMap(data),
    {
      onSuccess: (data) => {
        console.log(data);
        toastify("success", data?.message);
        setImages([]);

        setInitialValues(initialState);
      },
    }
  );

  const schema = yup.object({
    lat: yup.number().required("*lat is required"),
    lng: yup.number().required("*lng is required"),
    name: yup.string().required("*name is required"),
    location: yup.string().required("*location is required"),
    contact: yup.number().required("*contact is required"),
    description: yup.string().required("*description is required"),
    province: yup.string().required("*province is required"),
    city: yup.string().required("*city is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (data) => {
      console.log(data);
      addPlaceMutation.mutate({ ...data, images });
    },
  });

  const { values, errors, setFieldValue, handleChange, handleSubmit } = formik;

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
    <S.MapLocation>
      <AuthLayout showFooter>
        <div className="mapLocation">
          <h1>Places</h1>
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
          <Input
            type="text"
            placeholder="location"
            onChange={handleChange}
            name="location"
            value={values.location}
            error={errors.location}
          />
          <Input
            type="number"
            placeholder="contact"
            onChange={handleChange}
            name="contact"
            value={values.contact}
            error={errors.contact}
          />

          <Select
            multiple={true}
            error={values.province}
            value={errors.province}
            onChange={handleChange}
            options={provinces}
            name="province"
            placeholder="select province"
          />

          {values.province && (
            <Select
              multiple={true}
              error={values.city}
              value={errors.city}
              onChange={handleChange}
              options={provinces?.filter((p) => p === values.province).cities}
              name="city"
              placeholder="select city"
            />
          )}

          <Select
            multiple={true}
            error={values.city}
            value={errors.city}
            onChange={handleChange}
            name="city"
            placeholder="select city"
          />

          <Quill
            value={values.description}
            name="description"
            onChange={(e) => setFieldValue("description", e)}
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
                  src={file}
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
