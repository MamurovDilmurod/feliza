import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetList } from '../../services/query/useGetList'
import { endpoints } from '../../configs/endpoints'
import { FaArrowDown, FaStar } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useState } from 'react';
import ProductCard from './../../components/ProductCart/ProductCard';
import { Carousel } from 'antd';
import Cookies from 'js-cookie';
import { useCreate } from './../../services/mutations/useCreate';

function ProductDetail() {
    const { id } = useParams()
    const { i18n } = useTranslation()
    const { data, isLoading, isFetching } = useGetList(endpoints.products.getProductById + id, {})
    const userID = Cookies.get("USER-ID");
    console.log(userID);
    const { data: productVariants, isLoading: loadvar } = useGetList(endpoints.products.searchProduct + data?.referenceNumber)
    const { data: similarProducts, isLoading: loadingSimilar } = useGetList(endpoints.products.getProductByCategoryId + data?.category[0]?.id, {
        page: 0,
        size: 15,
    })
    const { mutate, isPending } = useCreate(endpoints.cart.addCartItem, endpoints.cart.getCart)
    const [open, setOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const navigate = useNavigate()

    console.log(" productVariants", data);

    // savatga qoshish funktsiyasi 
    const addToCart = () => {
        mutate({
            customerId: userID,
            productSizeVariantId: productVariants[0]?.productSizeVariantList?.[0]?.id,
            quantity: 1,
        }, {
            onSuccess: (data) => {
                console.log(data);
            },
        })
    }

    // savatga qoshish funktsiyasi yaxshirogi uyda chunish kerak
    // const addToCart = () => {
    //     // 1. Tanlangan rang variantini olish
    //     const selectedColorVariant = productVariants?.[selectedColorIndex];

    //     if (!selectedColorVariant) {
    //         toast.error(i18n.language === 'uz' ? "Iltimos, rang tanlang" : "Пожалуйста, выберите цвет");
    //         return;
    //     }

    //     // 2. Tanlangan razmerga mos productSizeVariant ni topish
    //     const selectedSizeVariant = selectedColorVariant.productSizeVariantList?.find(
    //         (variant) => variant.size === selectedSize
    //     );

    //     if (!selectedSizeVariant) {
    //         toast.error(i18n.language === 'uz' ? "Iltimos, razmer tanlang" : "Пожалуйста, выберите размер");
    //         return;
    //     }

    //     // 3. Mutate funksiyasini chaqirish
    //     mutate({
    //         customerId: userID,
    //         productSizeVariantId: selectedSizeVariant.id,
    //         quantity: 1,
    //     }, {
    //         onSuccess: (data) => {
    //             console.log("Savatga qo'shildi:", data);
    //             toast.success(i18n.language === 'uz' ? "Mahsulot savatga qo‘shildi" : "Товар добавлен в корзину");
    //         },
    //         onError: (error) => {
    //             console.error("Xatolik:", error);
    //             toast.error(i18n.language === 'uz' ? "Xatolik yuz berdi" : "Произошла ошибка");
    //         }
    //     });
    // };

    if (loadvar) {
        return (
            <div className="text-center py-10 text-gray-500 text-lg font-medium">
                {i18n.language === 'uz' ? 'Yuklanmoqda...' :
                    i18n.language === 'ru' ? 'Загрузка...' : ""}
            </div>
        );
    }

    return (
        <div className='font-tenor md:px-6 '>
            <div className='font-tenor'>
                {/* Product Images */}
                <div className='flex flex-col md:flex-row justify-between gap-8 mt-10 md:px-0'>

                    {/* mobile uchun yarilgan bolim */}
                    <div className="md:hidden mb-1">
                        <Carousel
                            autoplay
                            dots={true}
                            autoplaySpeed={3000}
                            draggable={true}
                        >
                            {productVariants[selectedColorIndex]?.productImages?.map((item, index) => (
                                <img
                                    key={item?.id || index}
                                    src={item?.url}
                                    alt={i18n.language === 'uz' ? data?.nameUZB : data?.nameRUS}
                                    className="w-full h-auto object-cover"
                                />
                            ))}
                        </Carousel>
                    </div>

                    {/* Rasmlar bloki */}
                    <div className='hidden md:grid md:grid-cols-2 gap-1'>
                        {productVariants[selectedColorIndex]?.productImages?.map((item, index) => (
                            <img
                                key={item?.id || index}
                                src={item?.url}
                                alt={i18n.language === 'uz' ? data?.nameUZB : data?.nameRUS}
                                className="w-full max-w-[466px] h-auto sm:h-[645px] object-cover shadow-md hover:scale-105 transition-transform duration-300"
                            />
                        ))}
                    </div>

                    {/* Matn va sozlamalar bloki */}
                    <div className="flex flex-col flex-1 max-w-full sm:max-w-[460px] px-4">
                        {/* Mahsulot nomi */}
                        <h1 className='md:pt-10 pt-1 text-lg md:text-2xl font-light leading-relaxed tracking-tight'>
                            {i18n.language === 'uz' ? data?.nameUZB : data?.nameRUS}
                        </h1>

                        {/* Narx va reyting */}
                        <div className='flex flex-row items-center justify-between md:pt-5 pt-2 gap-1 md:gap-4'>
                            {/* Narx */}
                            <div>
                                {data?.sale > 0 ? (
                                    <div className="flex items-center md:gap-3 gap-1 flex-col">
                                        <p className="text-[#0D0D0D] text-[17px] md:text-xl font-normal">
                                            {data?.salePrice} so'm
                                        </p>
                                        <p className="text-gray-400 line-through text-[17px] md:text-xl">
                                            {data?.sellPrice} so'm
                                        </p>
                                    </div>
                                ) : (
                                    <span className="text-[#0D0D0D] text-[17px] md:text-xl font-semibold">
                                        {data?.sellPrice} so'm
                                    </span>
                                )}
                            </div>

                            {/* Reyting */}
                            <div>
                                <p className='flex items-center gap-1 pr-5 mb-1'>
                                    {data?.averageRating} <FaStar className='text-[#0D0D0D] mb-1' />
                                </p>
                            </div>
                        </div>

                        {/* Rang tanlash */}
                        <div className='flex flex-col gap-3 md:pt-12 pt-5'>
                            <h2 className="text-lg font-normal">
                                {i18n.language === 'uz' ? 'Rang:' : 'Цвет:'} <span className='font-normal'>
                                    {i18n.language === 'uz'
                                        ? productVariants[selectedColorIndex]?.color?.nameUZB
                                        : productVariants[selectedColorIndex]?.color?.nameRUS}
                                </span>
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {productVariants?.map((item, index) => {
                                    const isSelected = selectedColorIndex === index;
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => item.active && setSelectedColorIndex(index)}
                                            className={`relative cursor-pointer w-[78px]
              ${isSelected ? 'border-black' : 'border-gray-300'} 
              ${!item?.active ? 'opacity-50 cursor-not-allowed' : 'hover:border-black'}
            `}
                                        >
                                            <img
                                                src={item?.productImages?.[0]?.url}
                                                alt="Product"
                                                className="w-[78px] md:h-[108px] object-cover h-auto"
                                            />

                                            {!item?.active && (
                                                <div className="absolute inset-0 pointer-events-none bg-white/60 rounded-md flex items-center justify-center">
                                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                                        <line x1="0" y1="100" x2="100" y2="0" stroke="gray" strokeWidth="5" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* O‘lcham tanlash */}
                        <div className=" mt-7 md:mt-12">
                            <h2 className='mb-2 font-medium'>
                                {i18n.language === 'uz' ? 'O’lcham:' : 'Размер:'} <span className='font-normal'>{selectedSize}</span>
                            </h2>

                            <div className='flex gap-3 flex-wrap'>
                                {data?.productSizeVariantList?.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedSize(item.size)}
                                        className={`border md:px-5 md:py-3 px-2 py-1 cursor-pointer rounded-md
            hover:bg-black hover:text-white transition-colors duration-300
            ${selectedSize === item.size ? 'bg-black text-white' : 'bg-white text-black'}
          `}
                                    >
                                        {item.size}
                                    </button>
                                ))}
                            </div>

                            {selectedSize && (
                                <p className="mt-2">
                                    {i18n.language === 'uz' ? 'Sotuvda bor' : 'В наличии'} : {
                                        data?.productSizeVariantList?.find(item => item.size === selectedSize)?.quantity ?? 0
                                    } {i18n.language === 'uz' ? 'ta' : 'шт'}
                                </p>
                            )}

                            {/* Ogohlantirish matni o‘lcham tanlanmagan bo‘lsa */}
                            {!selectedSize && (
                                <p className="text-red-500 md:mt-3 mt-1 text-base">
                                    ⚠️ {i18n.language === 'uz' ? 'Iltimos, o‘lchamni tanlang!' : 'Пожалуйста, выберите размер!'}
                                </p>
                            )}
                        </div>

                        <hr className='border-gray-300 md:my-7 my-2' />

                        {/* Qo’shimcha ma’lumotlar */}
                        <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer select-none'>
                            <div className='flex items-center gap-2 justify-between'>
                                <button className='text-lg font-medium'>
                                    {i18n.language === 'uz' ? "Qo’shimcha ma’lumotlar" : "Дополнительная информация"}
                                </button>
                                {!isOpen ? <FaArrowDown /> : <FaArrowUp />}
                            </div>
                            {isOpen && (
                                <p className='md:mt-6 mt-2 text-gray-700'>{i18n.language === 'uz' ? data?.descriptionUZB : data?.descriptionRUS}</p>
                            )}
                        </div>

                        <hr className='border-gray-300 md:my-7 my-2' />

                        {/* To'lov haqida */}
                        <div>
                            <div onClick={() => setOpen(!open)} className='flex items-center gap-2 cursor-pointer select-none justify-between'>
                                <button className='text-lg font-medium'>
                                    {i18n.language === 'uz' ? "To'lov haqida" : "Оплата"}
                                </button>
                                {!open ? <FaArrowDown /> : <FaArrowUp />}
                            </div>
                            {open && (
                                <p className='md:mt-6 mt-2 text-gray-700'>
                                    {i18n.language === 'uz'
                                        ? "To’lov online tarzda PayMe, Uzumbank yoki Click orqali amalga oshiriladi"
                                        : "Оплата онлайн через PayMe, Uzumbank или Click"}
                                </p>
                            )}
                        </div>

                        {/* savatcha Tugmalar */}
                        <div className="w-full space-y-4 md:mt-10 mt-5 hidden md:block">
                            <div className="flex gap-4">
                                <button
                                    className="cursor-pointer w-12 h-12 flex items-center justify-center border border-gray-300 hover:bg-red-500 hover:text-white transition duration-300"
                                    title="Sevimlilar"
                                >
                                    <FaRegHeart className="text-2xl" />
                                </button>

                                <button
                                    onClick={addToCart}
                                    className="cursor-pointer flex-1 h-12 flex items-center justify-center border border-black hover:bg-black hover:text-white transition duration-300"
                                >
                                    <HiOutlineShoppingBag className="text-xl mr-2" />
                                    <span>
                                        {i18n.language === 'uz' ? "Savatchaga qo’shish" : "В корзину"}
                                    </span>
                                </button>

                            </div>

                            <button className="cursor-pointer w-full h-12 border border-black hover:bg-black hover:text-white transition duration-300">
                                {i18n.language === 'uz' ? "Sotib olish" : "Купить"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>



            {/* Comnetariya bolimi uchun  */}
            <div className="md:mt-12 mt-5 px-4">
                <h2 className="text-lg font-semibold mb-2">
                    {i18n.language === 'uz' ? 'Foydalanuvchi izohlari' : 'Отзывы пользователей'}
                </h2>

                {
                    data?.reviewList?.length > 0 ? (
                        <div className="space-y-2">
                            <button className="text-blue-500 underline mb-2">
                                {i18n.language === 'uz' ? 'Barchasini ko‘rish' : 'Посмотреть все'} ({data?.reviewList?.length || 0})
                            </button>
                            {
                                data?.reviewList?.map((review, index) => (
                                    <div key={index} className="border-b py-2">
                                        <p className="font-medium">{review.userName}</p>
                                        <p className="text-sm text-gray-600">{review.comment}</p>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <p className="text-gray-500">  {i18n.language === 'uz' ? 'Hozircha izohlar mavjud emas.' : 'Пока что отзывов нет.'}
                        </p>
                    )
                }
            </div>
            <hr className='text-[#858585] w-full md:mt-10 mt-5' />

            {/* O’XSHASH MAHSULOTLAR */}
            <div className="md:mt-20 mt-7">
                <h2 className="md:text-xl text-base font-semibold px-4" style={{
                    fontWeight: 400,
                    fontSize: '24px',
                    lineHeight: '100%',
                    letterSpacing: '0px',
                }}
                >
                    {i18n.language === 'uz' ? 'O’xshash mahsulotlar' : 'Сопутствующие товары'}
                </h2>

                <div className="overflow-x-auto" style={{
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}>
                    <div className="grid grid-flow-col auto-cols-[285px] gap-4 pt-10">
                        {similarProducts?.content?.length > 0 ? (
                            similarProducts.content.map(item => (
                                <ProductCard key={item.id} item={item} />
                            ))
                        ) : (
                            <p className="text-gray-500">
                                {i18n.language === 'uz'
                                    ? 'O’xshash mahsulotlar topilmadi.'
                                    : 'Сопутствующие товары не найдены.'}
                            </p>
                        )}
                    </div>
                </div>


            </div>

            {/* buttolar mobile uchun tolov btn */}
            <div className="w-full space-y-4 md:mt-10 mt-7 block md:hidden px-2">
                <div className="flex gap-4">
                    <button
                        className="cursor-pointer w-12 h-12 flex items-center justify-center border border-gray-300 hover:bg-red-500 hover:text-white transition duration-300"
                        title="Sevimlilar"
                    >
                        <FaRegHeart className="text-2xl" />
                    </button>

                    <button
                        className="cursor-pointer flex-1 h-12 flex items-center justify-center border border-black hover:bg-black hover:text-white transition duration-300"
                    >
                        <HiOutlineShoppingBag className="text-xl mr-2" />
                        <span>
                            {i18n.language === 'uz' ? "Savatchaga qo’shish" : "В корзину"}
                        </span>
                    </button>
                </div>

                <button className="cursor-pointer w-full h-12 border border-black hover:bg-black hover:text-white transition duration-300">
                    {i18n.language === 'uz' ? "Sotib olish" : "Купить"}
                </button>
            </div>
        </div>
    )
}

export default ProductDetail  