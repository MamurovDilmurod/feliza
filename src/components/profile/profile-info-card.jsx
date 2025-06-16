import Cookies from "js-cookie";
import { useGetById } from "../../services/query/useGetById";

export const ProfileInfoCard = () => {
  const userID = Cookies.get("USER-ID");
  const { data: userData } = useGetById(
    "/api/customers/getCustomerById/",
    userID
  );

//   console.log(userData);

  return (
    <div>
      <div className="border h-full">
        <div className="">
          <h1>{userData?.birthDate}</h1>
        </div>
      </div>
    </div>
  );
};
