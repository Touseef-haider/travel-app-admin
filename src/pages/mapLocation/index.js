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
import Edit from "../../assets/edit.svg";

import Quill from "../../components/quill";
import Select from "../../components/select";

const initialState = {
  lat: "",
  lng: "",
  name: "",
  location: "",
  contact: "",
  category: "",
  description: "",
  province: "",
  city: "",
  hotels: [],
};

const MapLocation = () => {
  const [initialValues, setInitialValues] = useState(initialState);
  const { data, refetch } = useQuery("getData", () =>
    apiService.getMapLocations()
  );
  const [id, setId] = useState("");
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

  const { data: accessibilities } = useQuery("getAccessibilites", () =>
    apiService.getAccessibilities()
  );

  const { data: categories } = useQuery("getCategories", () =>
    apiService.getCategories()
  );

  const { data: hotels } = useQuery("getHotels", () => apiService.getHotels());

  const addPlaceMutation = useMutation(
    (data) => apiService.addPlaceInMap(data),
    {
      onSuccess: (data) => {
        toastify("success", data?.message);
        setImages([]);
        refetch();
        resetForm();
        setInitialValues(initialState);
      },
    }
  );

  const deletePlaceMutation = useMutation(
    (data) => apiService.removePlaceInMap(data),
    {
      onSuccess: (data) => {
        toastify("success", data?.message);
        refetch();
        setInitialValues(initialState);
      },
    }
  );
  const updataPlaceMutation = useMutation(
    (data) => apiService.updatePlaceInMap(data),
    {
      onSuccess: (data) => {
        toastify("success", data?.message);
        setImages([]);
        refetch();
        resetForm();
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
    category: yup.string().required("*category is required"),
    description: yup.string().required("*description is required"),
    province: yup.string().required("*province is required"),
    city: yup.string().required("*city is required"),
    accessibilities: yup.array(
      yup.string().required("*accessibility is required")
    ),
    hotels: yup.array(yup.string().required("*hotel is required")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (data) => {
      if (id) {
        updataPlaceMutation.mutate({
          ...data,
          images,
          country: { province: data?.province, city: data?.city },
          _id: id,
        });
      } else {
        addPlaceMutation.mutate({
          ...data,
          images,
          country: { province: data?.province, city: data?.city },
        });
      }
    },
  });

  const {
    values,
    errors,
    setFieldValue,
    handleChange,
    handleSubmit,
    resetForm,
  } = formik;

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

  const handleEdit = (data) => {
    setFieldValue("lat", data?.lat);
    setFieldValue("lng", data?.lng);
    setFieldValue("name", data?.name);
    setFieldValue("location", data?.location);
    setFieldValue("description", data?.description);
    setFieldValue("category", data?.category?._id);
    setFieldValue("province", data?.country?.province?._id);
    setFieldValue("contact", data?.contact);
    setFieldValue(
      "accessibilities",
      data?.accessibilities?.map((a) => a?._id)
    );
    setFieldValue("city", data?.country?.city);
    setFieldValue(
      "hotels",
      data?.hotels?.map((h) => h?._id)
    );
    setImages(data?.images);
    setId(data?._id);
  };

  const handleDeletePlace = (id) => {
    deletePlaceMutation.mutate({ _id: id });
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
            error={errors?.province}
            value={values.province}
            onChange={handleChange}
            options={
              Array.isArray(provinces) &&
              provinces?.length > 0 &&
              provinces?.map((p) => ({ value: p?._id, item: p?.name }))
            }
            name="province"
            placeholder="select province"
            selectOption="select province"
          />

          {values?.province && (
            <Select
              error={errors.city}
              selectOption="select city"
              value={values.city}
              onChange={handleChange}
              options={
                values.province &&
                Array.isArray(provinces) &&
                provinces?.length > 0 &&
                provinces
                  ?.find((p) => p?._id === values.province)
                  ?.cities.map((c) => ({ value: c?.name, item: c?.name }))
              }
              name="city"
              placeholder="select city"
            />
          )}

          <Select
            error={errors.category}
            value={values.category}
            onChange={handleChange}
            name="category"
            options={categories?.map((c) => ({ value: c?._id, item: c?.name }))}
            placeholder="select category"
            selectOption="select category"
          />
          <Select
            multiple={true}
            error={errors.hotels}
            value={values.hotels}
            onChange={handleChange}
            name="hotels"
            options={hotels?.map((c) => ({ value: c?._id, item: c?.name }))}
            placeholder="select hotels"
            selectOption="select hotels"
          />
          <Select
            multiple={true}
            error={errors.accessibilities}
            value={values.accessibilities}
            onChange={handleChange}
            name="accessibilities"
            options={accessibilities?.map((c) => ({
              value: c?._id,
              item: c?.via,
            }))}
            placeholder="select accessibilities"
            selectOption="select accessibilities"
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
            title={id ? "Update" : "Add"}
            size="medium"
            type="submit"
            onClick={handleSubmit}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px",
            padding: "20px",
          }}
        >
          {data?.map((l) => (
            <div className="mapLocationCard">
              <img
                className="edit"
                src={Edit}
                onClick={() => handleEdit(l)}
                alt="edit"
                width={20}
                height={20}
              />
              <img
                className="delete"
                src={Delete}
                onClick={() => handleDeletePlace(l?._id)}
                alt="delete"
                width={15}
                height={15}
              />
              <label className="bold">location</label>
              <small>{l?.lat}</small>,<small>{l?.lng}</small>
              <p>
                <span className="bold">category:</span> {l?.category?.name}
              </p>
              <p>
                <span className="bold">description: </span>{" "}
                <p dangerouslySetInnerHTML={{ __html: l?.description }}></p>
              </p>
              <p>
                <span className="bold">country:</span> {l?.country?.name}
              </p>
              <p>
                <span className="bold">province:</span>{" "}
                {l?.country?.province?.name}
              </p>
              <p>
                <span className="bold">city:</span> {l?.country?.city}
              </p>
              <br />
              <small>
                <span className="bold">place name: </span>
                {l?.name}
              </small>
              <br />
              <br />
              <h4>Hotels:</h4>
              <div className="hotel">
                {l?.hotels?.map((h) => (
                  <div className="hotel-section">
                    <p>
                      <span className="bold">hotel name: </span>
                      {h?.name}
                    </p>
                    <p>
                      <span className="bold">location: </span>
                      {h?.location}
                    </p>
                    <p>
                      <span className="bold">stars: </span>
                      {h?.stars}
                    </p>
                    <div className="hotel-images">
                      {h?.images?.map((i) => (
                        <>
                          <img src={i?.url} alt="url" width={60} height={60} />
                        </>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <h4>Accessibility:</h4>
              <div className="hotel">
                {l?.accessibilities?.map((h) => (
                  <div className="hotel-section">
                    <p>
                      <span className="bold">
                        {h?.via === "vehicle"
                          ? "accessible via:"
                          : "available for:"}
                      </span>
                      {h?.via}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AuthLayout>
    </S.MapLocation>
  );
};

export default MapLocation;
