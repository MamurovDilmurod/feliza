import { Button } from "antd";
import { BiCategory } from "react-icons/bi";
import { FaRegHeart, FaRegUser } from "react-icons/fa6";
import { LuShoppingBag } from "react-icons/lu";
import FeIcon from "./fe-icon";
import { useLocation, useNavigate } from "react-router-dom";
import FavoritesIcon from "./favorites-icon";
import CartIcon from "./cart-icon";
import ProfileIcon from "./profile-icon";

export const MobileBottomTab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuList = [
    {
      path: "/",
      icon: <FeIcon color={location.pathname == "/" ? "#0d0d0d" : "#5b5b5b"} />,
    },
    {
      path: "/",
      icon: <BiCategory size={24} />,
    },
    {
      path: "/favorites",
      icon: <FavoritesIcon />,
    },
    {
      path: "/cart",
      icon: <CartIcon />,
    },
    {
      path: "/profile",
      icon: <ProfileIcon />,
    },
  ];
  return (
    <div className=" bg-white z-[999] p-2 py-6 lg:hidden">
      <div className="flex justify-between items-center px-3">
        {menuList.map((item) => (
          <Button
            onClick={() => (
              navigate(item.path),
              window.scrollTo({ top: 0, behavior: "smooth" })
            )}
            key={item.path}
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
