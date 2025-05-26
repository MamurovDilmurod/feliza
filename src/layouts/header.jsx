import { useTranslation } from "react-i18next";
import Logo from "../assets/images/feliza-logo.png";
import LanguageSelector from "../components/header/language-selector";

const Header = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex items-center justify-between ">
        <div className="">
          <p>{t("search")}</p>
        </div>
        <div className="">
          <img src={Logo} />
        </div>
        <div className="">
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
};

export default Header;
