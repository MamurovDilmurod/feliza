import Cookies from "js-cookie";
import { useGetById } from "../../services/query/useGetById";
import { useTranslation } from "react-i18next";
import CouponCard from "../cart/coupon-card";
import { Spin } from "antd";

const UserCouponCard = () => {
  const userID = Cookies.get("USER-ID");
  const { i18n, t } = useTranslation();
  const { data, isLoading } = useGetById(
    "/api/couponCustomer/getCouponsByCustomerId/",
    userID
  );

  console.log(data);
  if (isLoading) {
    return <Spin />;
  }
  return (
    <div>
      {" "}
      <div className="grid grid-cols-2 gap-5 w-full justify-items-center">
        {data.map((item) => (
          <CouponCard credit={item?.coupon?.credit} name={item?.coupon?.name} />
        ))}
      </div>
    </div>
  );
};

export default UserCouponCard;
