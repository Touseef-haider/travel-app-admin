import { useNavigate } from "react-router-dom";
import Edit from "../../assets/edit.svg";
import * as S from "./styled";

const Alerts = ({ alerts, profile }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/update-experience?id=${id}`);
  };

  const filteredAlerts =
    Array.isArray(alerts) &&
    alerts?.length > 0 &&
    alerts?.filter((a) => a?.is_active);
  return (
    <S.Alerts>
      <div className="story-section">
        <h1>Alerts</h1>
        {Array.isArray(filteredAlerts) && filteredAlerts?.length > 0
          ? filteredAlerts?.map((alert) => (
              <div className="story" key={alert}>
                {alert?.profile?._id === profile?._id ? (
                  <img
                    className="edit"
                    onClick={() => handleEdit(alert?._id)}
                    src={Edit}
                    alt="edit"
                  />
                ) : (
                  ""
                )}

                <label htmlFor="h1" className="label">
                  title:
                </label>
                <p>{alert?.description}</p>
              </div>
            ))
          : "No active alerts"}
      </div>
    </S.Alerts>
  );
};

export default Alerts;
