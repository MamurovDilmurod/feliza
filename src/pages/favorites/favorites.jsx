import React from "react";
import { useGetList } from "../../services/query/useGetList";
import Cookies from "js-cookie";
import ProductCard from "../../components/ProductCart/ProductCard";
const Favorites = () => {
  const userID = Cookies.get("USER-ID");
  const { data: favorites } = useGetList(
    "/api/likedItem/getByCustomerId/" + userID
  );

  return (
    <div className="max-w-[1220px] mx-auto px-3 lg:px-0">
      <div className="pt-5 lg:pt-10 pb-[30px] text-center">
        <h1 className="font-tenor font-normal text-2xl text-primary">
          Sevimlilar{" "}
          <span className="text-secondary text-xl">({favorites?.length})</span>
        </h1>
      </div>
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favorites?.map((item) => (
          <ProductCard item={item?.product} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
