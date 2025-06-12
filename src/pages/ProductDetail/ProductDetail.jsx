import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useGetList } from '../../services/query/useGetList'
import { endpoints } from '../../configs/endpoints'
import { FaArrowDown, FaMinus, FaStar } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useState } from 'react';
import ProductCard from './../../components/ProductCart/ProductCard';
import { Carousel, message } from 'antd';
import Cookies from 'js-cookie';
import { useCreate } from './../../services/mutations/useCreate';
import { toast } from 'react-toastify';
import { FaPlus } from "react-icons/fa";



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
    const { mutate: addtofavorites } = useCreate(endpoints.favorites.addFavoriteItem)
    const [open, setOpen] = useState(true)
    const [isOpen, setIsOpen] = useState(true)
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [count, setCount] = useState(1);

    console.log(" productVariants", productVariants);

    // savatga qoshish funktsiyasi
    const addToCart = () => {
        // 1. Tanlangan rang variantini olish
        const selectedColorVariant = productVariants?.[selectedColorIndex];

        if (!selectedColorVariant) {
            toast.error(i18n.language === 'uz' ? "Iltimos, rang tanlang" : "Пожалуйста, выберите цвет");
            return;
        }

        // 2. Tanlangan razmerga mos productSizeVariant ni topish
        const selectedSizeVariant = selectedColorVariant.productSizeVariantList?.find(
            (variant) => variant.size === selectedSize
        );

        if (!selectedSizeVariant) {
            toast.error(i18n.language === 'uz' ? "Iltimos, razmer tanlang" : "Пожалуйста, выберите размер");
            return;
        }

        // 3. Mutate funksiyasini chaqirish
        mutate({
            customerId: userID,
            productSizeVariantId: selectedSizeVariant.id,
            quantity: count,
        }, {
            onSuccess: (data) => {
                console.log("Savatga qo'shildi:", data);
                toast.success(i18n.language === 'uz' ? `Mahsulot savatga qo‘shildi` : "Товар добавлен в корзину");
                setCount(1);
            },
            onError: (error) => {
                console.error("Xatolik:", error);
                toast.error(i18n.language === 'uz' ? "Xatolik yuz berdi" : "Произошла ошибка");
            }
        });
    };

    //  sevimlilar qoshish funksiyasi
    const addToFavorites = () => {
        const selectedColorVariant = productVariants?.[selectedColorIndex];

        if (!selectedColorVariant) {
            toast.error(i18n.language === 'uz' ? "Iltimos, rang tanlang" : "Пожалуйста, выберите цвет");
            return;
        }

        const selectedSizeVariant = selectedColorVariant.productSizeVariantList?.find(
            (variant) => variant.size === selectedSize
        );

        if (!selectedSizeVariant) {
            toast.error(i18n.language === 'uz' ? "Iltimos, razmer tanlang" : "Пожалуйста, выберите размер");
            return;
        }

        // ✅ Har bir rang varianti - bu alohida product bo'lganligi uchun
        const productId = selectedColorVariant?.id;

        if (!productId) {
            toast.error(i18n.language === 'uz' ? "Mahsulot topilmadi" : "Товар не найден");
            return;
        }

        addtofavorites(
            {
                customerId: userID,
                productId: productId,
            },
            {
                onSuccess: (data) => {
                    console.log("Sevimlilarga qo'shildi:", data);
                    toast.success(i18n.language === 'uz' ? `Mahsulot sevimlilarga qo‘shildi` : "Товар добавлен в избранное");
                },
                onError: (error) => {
                    console.error("Xatolik:", error);
                    toast.error(i18n.language === 'uz' ? "Xatolik yuz berdi" : "Произошла ошибка");
                }
            }
        );
    };




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
                        <div className="flex flex-col gap-3 md:pt-12 pt-5">
                            <h2 className="text-lg font-normal">
                                {i18n.language === 'uz' ? 'Rang:' : 'Цвет:'}{' '}
                                <span className="font-normal">
                                    {i18n.language === 'uz'
                                        ? productVariants[selectedColorIndex]?.color?.nameUZB
                                        : productVariants[selectedColorIndex]?.color?.nameRUS}
                                </span>
                            </h2>

                            <div className="flex flex-wrap gap-2">
                                {productVariants?.map((item, index) => {
                                    const isSelected = selectedColorIndex === index;
                                    const isActive = item?.active;

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => isActive && setSelectedColorIndex(index)}
                                            className={`
                relative w-[78px] overflow-hidden cursor-pointer border 
                ${isSelected ? 'border-black' : 'border-gray-300'} 
                ${!isActive ? 'opacity-50 cursor-not-allowed' : 'hover:border-black'}
            `}
                                        >
                                            <img
                                                src={item?.productImages?.[0]?.url}
                                                alt="Product"
                                                className="w-[78px] md:h-[108px] h-auto object-cover"
                                            />

                                            {!isActive && (
                                                <div className="absolute inset-0 pointer-events-none bg-white/60 flex items-center justify-center">
                                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                                        <line
                                                            x1="0"
                                                            y1="100"
                                                            x2="100"
                                                            y2="0"
                                                            stroke="gray"
                                                            strokeWidth="5"
                                                        />
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
                                        className={`border md:px-5 md:py-3 px-2 py-1 cursor-pointer
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
                                {/* sevimlilar qoshish */}
                                <button
                                    onClick={addToFavorites}
                                    className="cursor-pointer w-12 h-12 flex items-center justify-center border border-gray-300 hover:bg-red-500 hover:text-white transition duration-300"
                                    title="Sevimlilar"
                                >
                                    <FaRegHeart className="text-2xl" />
                                </button>


                                {/* Count boshqaruvi bolim */}
                                <div className="flex items-center gap-3 mt-2">
                                    <FaMinus
                                        onClick={() => count > 0 && setCount(count - 1)}
                                        className={`cursor-pointer ${count === 0 ? 'opacity-30 pointer-events-none' : ''}`}
                                    />
                                    <p>{count}</p>

                                    <FaPlus
                                        onClick={() => {
                                            const maxQty = data?.productSizeVariantList?.find(item => item.size === selectedSize)?.quantity ?? 0;
                                            if (count < maxQty) setCount(count + 1);
                                        }}
                                        className={`cursor-pointer ${count >= (data?.productSizeVariantList?.find(item => item.size === selectedSize)?.quantity ?? 0)
                                            ? 'opacity-30 pointer-events-none'
                                            : ''
                                            }`}
                                    />
                                </div>

                                {/* savatga qoshish tugmasi */}
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
                            <button className="text-[#5B5B5B] cursor-pointer mb-2 font-bold hover:text-black">
                                {i18n.language === 'uz' ? 'Barchasini ko‘rish' : 'Посмотреть все'} ({data?.reviewList?.length || 0})
                            </button>
                            {
                                data?.reviewList?.map((review, index) => (
                                    <div key={index} className="border-b py-2">
                                        <div className="flex gap-4">
                                            <p className="font-medium">{review?.customerName}</p>
                                            <div className="flex items-center gap-1 text-[#0D0D0D]">
                                                {[...Array(review?.rating)].map((_, i) => (
                                                    <FaStar key={i} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2.5">{review?.createdAt?.slice(0, 10)}</p>
                                        {/* <img className='w-[60px] h-[80px] border object-cover mt-2.5' src={review?.images[0]?.url} alt=" " /> */}
                                        <div className='flex gap-2'>
                                            {
                                                review?.images?.map((image, index) => (
                                                    <img key={index} className='w-[60px] h-[80px] border object-cover mt-2.5' src={image?.url} alt=" " />
                                                ))
                                            }
                                        </div>
                                        <p className="text-sm text-gray-600 md:mt-4 mt-2.5 md:mb-12 mb-4">{review.content}</p>
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
            <div className="w-full space-y-4 md:mt-10 mt-7 block md:hidden px-2 fixed bottom-20 left-0 bg-white ">
                {/* Yuqori actionlar: Sevimli, Count, Savat */}
                <div className="flex gap-3 items-center">
                    {/* Sevimlilar tugmasi */}
                    <button
                        className="w-11 h-11 flex items-center justify-center rounded border border-gray-300 hover:bg-red-500 hover:text-white transition"
                        title="Sevimlilar"
                    >
                        <FaRegHeart className="text-xl" />
                    </button>

                    {/* Count boshqaruvi */}
                    {selectedSize && (
                        <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1">
                            <button
                                onClick={() => count > 0 && setCount(count - 1)}
                                disabled={count === 0}
                                className={`text-lg ${count === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-red-500'}`}
                            >
                                <FaMinus />
                            </button>
                            <span className="font-medium w-6 text-center">{count}</span>
                            <button
                                onClick={() => {
                                    const maxQty = data?.productSizeVariantList?.find(item => item.size === selectedSize)?.quantity ?? 0;
                                    if (count < maxQty) setCount(count + 1);
                                }}
                                disabled={count >= (data?.productSizeVariantList?.find(item => item.size === selectedSize)?.quantity ?? 0)}
                                className={`text-lg ${count >= (data?.productSizeVariantList?.find(item => item.size === selectedSize)?.quantity ?? 0)
                                    ? 'opacity-30 cursor-not-allowed'
                                    : 'hover:text-black'}`}
                            >
                                <FaPlus />
                            </button>
                        </div>
                    )}

                    {/* Savatcha tugmasi (icon only) */}
                    <button
                        onClick={addToCart}
                        className="flex-1 h-11 flex items-center justify-center rounded border border-black bg-black text-white hover:bg-white hover:text-black transition"
                        title={i18n.language === 'uz' ? "Savatchaga qo’shish" : "В корзину"}
                    >
                        <HiOutlineShoppingBag className="text-xl" />
                    </button>
                </div>

                {/* Sotib olish tugmasi */}
                <button className="w-full h-12 rounded border border-black hover:bg-black hover:text-white transition">
                    {i18n.language === 'uz' ? "Sotib olish" : "Купить"}
                </button>
            </div>

        </div>
    )
}

export default ProductDetail  