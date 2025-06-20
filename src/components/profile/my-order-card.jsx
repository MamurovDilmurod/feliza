import React, { useState } from "react";
import EmptyOrders from "../../assets/icons/empty-orders";
import { useGetById } from "../../services/query/useGetById";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
  IoIosCheckmarkCircle,
} from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import formatPrice from "../../utils/formatPrice";
import { Checkbox, Skeleton, Steps } from "antd";
import OrderStepper from "./order-stepper";

export const MyOrderCard = () => {
  const userID = Cookies.get("USER-ID");
  const { i18n, t } = useTranslation();
  const { data, isLoading } = useGetById(
    "/api/order/getAllByCustomerId/",
    userID
  );
  const [isOpenProduct, setIsOpenProduct] = useState({});
  const reachedOrders = data?.filter(
    (item) => item.orderStatusType === "REACHED"
  );

  const rejectedOrders = data?.filter(
    (item) => item.orderStatusType === "REJECTED"
  );
  console.log(data);

  const toggle = (id) => {
    setIsOpenProduct((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} active paragraph={{ rows: 4 }} />
        ))}
      </div>
    );
  }
  return (
    <div>
      {data?.length > 0 ? (
        <div className="">
          <div className="space-y-6 font-tenor">
            <h1 className="text-center text-xl ">{t("order.my.active")}:</h1>

            {rejectedOrders?.map((item) => (
              <div
                key={item.id}
                className="p-4 border border-accent space-y-2.5 text-accent"
              >
                <div className="flex items-center justify-between border-b-secondary pb-4 text-primary">
                  <h1>{t("order.my.order-number")}:</h1>
                  <p>{item?.orderNumber}</p>
                </div>

                <div className="">
                  <OrderStepper status={item?.orderStatusType} />
                </div>

                <div className="flex items-center justify-between">
                  <h1>{t("order.my.status")}</h1>
                  <p>
                    {item?.orderStatusType == "REACHED" &&
                      t("order.my.reached")}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <h1>{t("order.my.time")}:</h1>
                  <p>{item?.deliveryDate}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h1>{t("order.my.location")}:</h1>
                  <p>
                    {i18n.language == "uz"
                      ? item?.address.region.nameUZB
                      : item?.address.region.nameRUS}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <h1>{t("order.my.products")}:</h1>

                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggle(item.orderId)}
                  >
                    {isOpenProduct[item.orderId] ? (
                      <IoIosArrowUp
                        size={24}
                        // onClick={() => setIsOpenProduct(false)}
                      />
                    ) : (
                      <IoIosArrowDown
                        size={24}
                        // onClick={() => setIsOpenProduct(true)}
                      />
                    )}
                  </div>
                </div>

                {isOpenProduct[item?.orderId] && (
                  <div className="">
                    {item?.orderDetailDtos.map((product) => (
                      <div className="flex gap-4 border-t py-4 font-tenor text-xs lg:text-sm">
                        <div className="">
                          <img
                            className="w-16"
                            src={product?.productImages[0]?.url}
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex gap-3 flex-wrap">
                            <h1>{t("order.my.name")}:</h1>

                            <h1 className="text-primary">
                              {product?.productName}
                            </h1>
                          </div>
                          <div className="flex gap-3">
                            <h1>{t("cart.quantity")}:</h1>
                            <h1 className="text-primary">
                              {product?.quantity}
                            </h1>
                          </div>
                          <div className="flex gap-3">
                            <h1>{t("cart.size")}:</h1>
                            <h1 className="text-primary">
                              {product.productSizeVariant?.size}
                            </h1>
                          </div>
                          <div className="flex gap-3">
                            <h1>{t("order.total-price")}</h1>

                            <h1 className="text-primary">
                              {`${formatPrice(item?.orderCost)} ${t(
                                "cart.sum"
                              )}`}
                            </h1>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-6 font-tenor">
            <h1 className="text-center text-xl ">{t("order.my.history")}:</h1>
            {reachedOrders?.map((item) => (
              <div key={item.id} className="p-4 border space-y-2.5 text-accent">
                <div className="flex items-center justify-between border-b border-b-secondary pb-4 text-primary">
                  <h1>{t("order.my.order-number")}:</h1>
                  <p>{item?.orderNumber}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h1>{t("order.my.status")}</h1>
                  <p>
                    {item?.orderStatusType == "REACHED" &&
                      t("order.my.reached")}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <h1>{t("order.my.time")}:</h1>
                  <p>{item?.deliveryDate}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h1>{t("order.my.location")}:</h1>
                  <p>
                    {i18n.language == "uz"
                      ? item?.address.region.nameUZB
                      : item?.address.region.nameRUS}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <h1>{t("order.my.products")}:</h1>

                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggle(item.orderId)}
                  >
                    {isOpenProduct[item.orderId] ? (
                      <IoIosArrowUp
                        size={24}
                        // onClick={() => setIsOpenProduct(false)}
                      />
                    ) : (
                      <IoIosArrowDown
                        size={24}
                        // onClick={() => setIsOpenProduct(true)}
                      />
                    )}
                  </div>
                </div>

                {isOpenProduct[item?.orderId] && (
                  <div className="">
                    {item?.orderDetailDtos.map((product) => (
                      <div className="flex gap-4 border-t py-4 font-tenor text-xs lg:text-sm">
                        <div className="">
                          <img
                            className="w-16"
                            src={product?.productImages[0]?.url}
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex gap-3 flex-wrap">
                            <h1>{t("order.my.name")}:</h1>

                            <h1 className="text-primary">
                              {product?.productName}
                            </h1>
                          </div>
                          <div className="flex gap-3">
                            <h1>{t("cart.quantity")}:</h1>
                            <h1 className="text-primary">
                              {product?.quantity}
                            </h1>
                          </div>
                          <div className="flex gap-3">
                            <h1>{t("cart.size")}:</h1>
                            <h1 className="text-primary">
                              {product.productSizeVariant?.size}
                            </h1>
                          </div>
                          <div className="flex gap-3">
                            <h1>{t("order.total-price")}</h1>

                            <h1 className="text-primary">
                              {`${formatPrice(item?.orderCost)} ${t(
                                "cart.sum"
                              )}`}
                            </h1>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="">
          <EmptyOrders /> <p></p>
        </div>
      )}
    </div>
  );
};
