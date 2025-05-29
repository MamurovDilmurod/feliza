import { Button } from "antd";
import { BiCategory } from "react-icons/bi";
import { FaRegHeart, FaRegUser } from "react-icons/fa6";
import { LuShoppingBag } from "react-icons/lu";
import FeIcon from "./fe-icon";
import { useLocation } from "react-router-dom";

export const MobileBottomTab = () => {
  const location = useLocation();
  const menuList = [
    {
      path: "/",
      icon: <FeIcon color={"#0d0d0d"} />,
    },
    {
      path: "/categoty",
      icon: <BiCategory size={24} />,
    },
    {
      path: "/liked",
      icon: <FaRegHeart size={24} />,
    },
    {
      path: "/cart",
      icon: <LuShoppingBag size={24} />,
    },
    {
      path: "/profile",
      icon: <FaRegUser size={24} />,
    },
  ];
  return (
    <div className=" bg-white z-[999] p-2 lg:hidden">
      <div className="flex justify-between items-center px-3">
        {menuList.map((item) => (
          <Button
            className={`!border-none ${
              location.pathname == item.path
                ? "!text-primary"
                : "!text-secondary"
            }`}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};
