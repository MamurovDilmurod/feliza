import { useTranslation } from "react-i18next";
import Logo from "../assets/images/feliza-logo.png";
import LanguageSelector from "../components/header/language-selector";
import { FaRegHeart, FaRegUser } from "react-icons/fa6";
import { LuShoppingBag } from "react-icons/lu";
import { CiHeart, CiSearch } from "react-icons/ci";
import { Badge, Drawer } from "antd";
import { useState } from "react";
import UserAuth from "../components/header/user-auth";
import { HeaderBoard } from "../components/header/header-board";
import { HeaderSearch } from "../components/header/header-search";

const Header = () => {
  const { t } = useTranslation();
  const [showBoard, setShowBoard] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [brandName, setBrandName] = useState("");

  const handleBoard = (name) => {
    setShowSearch(false);
    setBrandName(name);
    setShowBoard(true);

    if (name == brandName) {
      setShowBoard(false);
      setBrandName("");
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between  max-w-[1280px] px-3 mx-auto py-5">
        <div className="hidden md:flex items-center justify-between gap-12">
          <p
            className="font-normal text-xl pb-2"
            style={{
              borderBottom: brandName == "Kiyimlar" && "1px solid black",
            }}
            onClick={() => handleBoard("Kiyimlar")}
          >
            Katalog
          </p>
          <p
            className="font-normal text-xl pb-2"
            style={{ borderBottom: brandName == "Nessa" && "1px solid black" }}
            onClick={() => handleBoard("Nessa")}
          >
            Nessa
          </p>

          <p
            className="flex items-center gap-2 text-secondary font-normal text-xs leading-[100%]"
            onClick={() => (
              setShowSearch(true), setShowBoard(false), setBrandName("")
            )}
          >
            <CiSearch size={18} /> {t("search")}
          </p>
        </div>
        <div className="">
          <img src={Logo} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center justify-between gap-[53px]">
            <FaRegHeart size={21} />
            <Badge
              styles={{
                indicator: { color: "black" },
              }}
              style={{ border: "1px solid black" }}
              color="white"
              count={5}
            >
              <LuShoppingBag size={21} />
            </Badge>
            <UserAuth />
            <LanguageSelector />
          </div>
        </div>
      </div>

      {showBoard && <HeaderBoard brand={brandName} />}
      {showSearch && (
        <HeaderSearch setShowSearch={setShowSearch} brand={brandName} />
      )}
    </div>
  );
};

export default Header;
