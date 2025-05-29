import React from 'react';
import { IoIosHeartEmpty } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import { RiShoppingBag4Line } from "react-icons/ri";
import { message } from 'antd';



const ProductCard = ({ item, onLike }) => {
    const { i18n } = useTranslation();
    const hasDiscount = item.sale > 0;

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.success(
            i18n.language === 'uz' ? 'Mahsulot savatchaga qo`shildi' :
                i18n.language === 'ru' ? 'Товар добавлен в корзину' :
                    ''
        );
    };

    return (
        <div className="bg-white shadow-md overflow-hidden relative hover:shadow-sm transition-shadow duration-300">
            {contextHolder}
            <button className="absolute top-3 right-3 z-10 bg-white rounded-full p-1 hover:shadow-lg">
                <IoIosHeartEmpty onClick={success} className="text-black cursor-pointer hover:text-red-600 w-6 h-6" />
            </button>

            {hasDiscount && (
                <div className="absolute top-4 left-3 z-20 bg-[#EEB415] text-white text-xs font-bold px-2 py-1 rounded">
                    {item.sale}%
                </div>
            )}

            <img
                src={item?.productImages?.[0]?.url}
                alt={i18n.language === 'uz' ? item.nameUZB : item.nameRUS}
                className="w-full md:h-[365px] h-auto object-cover"
            />
            <div className='flex items-center justify-between'>
                <div className="p-4 space-y-1">
                    <h2 className="text-md font-semibold text-gray-800 line-clamp-1">
                        {i18n.language === 'uz' ? item.nameUZB : item.nameRUS}
                    </h2>
                    <div className="text-gray-900 font-semibold space-x-2">
                        {hasDiscount ? (
                            <>
                                <span className="text-gray-600">{item.salePrice} so’m</span><br />
                                <span className="text-sm text-gray-500 line-through">{item.sellPrice} so’m</span>
                            </>
                        ) : (
                            <span>{item.sellPrice} so’m</span>
                        )}
                    </div>
                </div>
                <span className='px-3 group'>
                    <RiShoppingBag4Line className='text-2xl cursor-pointer transition duration-300 group-hover:scale-110 group-hover:text-black' />
                </span>
            </div>
        </div>
    );
};

export default ProductCard;
