/* eslint-disable jsx-a11y/alt-text */
import AuthLayout from "../../layouts/authLayout";
import * as S from "./styled";
import apiService from "../../services/apiService";
import { useQuery, useMutation } from "react-query";
import Button from "../../components/button";
import toastify from "../../components/toast/index";

const Home = () => {
  const { data, refetch } = useQuery("getAlerts", () =>
    apiService.getExperiences()
  );
  const { mutate } = useMutation(
    "updateAlert",
    (data) => apiService.updateExperience(data),
    {
      onSuccess: (data) => {
        toastify("success", data?.message);
        refetch();
      },
    }
  );
  const filteredData =
    Array.isArray(data) && data?.length > 0
      ? data?.filter((d) => d?.category === "alert")
      : [];
  const handleActive = (id, action) => {
    if (action) {
      mutate({
        is_active: false,
        _id: id,
      });
    } else {
      mutate({
        is_active: true,
        _id: id,
      });
    }
  };
  return (
    <AuthLayout showFooter>
      <S.Home>
        <div className="album-section">
          <h1>Alerts</h1>
          {Array.isArray(filteredData) && filteredData?.length > 0
            ? filteredData?.map((alert) => (
                <div className="album" key={alert?.title}>
                  <label htmlFor="h1" className="label">
                    title:
                  </label>
                  <h1>{alert?.title}</h1>
                  <label htmlFor="p" className="label">
                    description:
                  </label>
                  <p
                    dangerouslySetInnerHTML={{ __html: alert?.description }}
                  ></p>
                  <label htmlFor="p" className="label">
                    Category Name:
                  </label>
                  <p>{alert?.category}</p>
                  {/* {album?.files?.map((el) => (
                        <img width="300" src={getImage(el?.data)} alt="album" />
                      ))} */}
                  <Button
                    onClick={() => handleActive(alert?._id, alert?.is_active)}
                    title={`${
                      !alert?.is_active ? "make active" : "make unactive"
                    }`}
                  />
                </div>
              ))
            : "No alerts"}
        </div>
      </S.Home>
    </AuthLayout>
  );
};

export default Home;
