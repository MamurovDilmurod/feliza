import Cookies from "js-cookie";
import { useGetById } from "../../services/query/useGetById";
import { useTranslation } from "react-i18next";
import { CiLocationOn } from "react-icons/ci";

const AddressCard = () => {
  const userID = Cookies.get("USER-ID");
  const { i18n, t } = useTranslation();
  const { data } = useGetById("/api/address/getAddressesByCustomerId/", userID);

  console.log(data);

  return (
    <div>
      <div className="">
        {data?.map((item) => (
          <div className="flex items-center gap-3">
            <CiLocationOn />
            <h1>
              {i18n.language == "uz"
                ? item.region.nameUZB
                : item.region.nameRUS}
            </h1>
            <p>
              {i18n.language == "uz"
                ? item.subRegion.nameUZB
                : item.subRegion.nameRUS}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressCard;
