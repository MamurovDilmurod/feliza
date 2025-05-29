import { useGetList } from './../../services/query/useGetList';
import { endpoints } from './../../configs/endpoints';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function Menu1CategoryList() {
    const navigate = useNavigate();
    const { data, isLoading } = useGetList(endpoints.category.categoryBlocks.getCategoryByBlockTypeMenu_1, {});
    const { i18n } = useTranslation();

    const skeletonItems = Array.from({ length: 5 });

    if (isLoading) {
        return (
            <div className="max-w-[1280px] mx-auto px-4 py-8 overflow-x-auto scrollbar-hide">
                <div className="flex gap-6 w-max">
                    {skeletonItems.map((_, index) => (
                        <div
                            key={index}
                            className="min-w-[220px] h-[240px] bg-gray-200 rounded-md animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    const sortedData = [...data].sort((a, b) => a.placementNumber - b.placementNumber);

    return (
        <div className="max-w-[1280px] mx-auto px-4 py-8 overflow-x-auto scrollbar-hide" style={{
            scrollbarWidth: "none"
        }}>
            <div className="flex gap-6 font-tenor w-max">
                {sortedData.map((item, index) => (
                    <div
                        onClick={() => navigate(`/categoryDetail/${item.category.id}`)}
                        key={index}
                        className="min-w-[220px] relative group overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    >
                        <img
                            src={item.category.horizontalImage?.url}
                            alt={i18n.language === 'uz' ? item.category.nameRUS : item.category.nameUZB}
                            className="w-full h-[240px] object-cover"
                        />
                        <div className="absolute inset-0 bg-[#0000004D] group-hover:bg-transparent flex items-center group-hover:items-end justify-center transition-all duration-500">
                            <h2 className="text-white group-hover:text-[#0D0D0D] text-lg font-bold text-center group-hover:mb-4 mb-0 px-2">
                                {i18n.language === 'uz' ? item.category.nameUZB : item.category.nameRUS}
                            </h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu1CategoryList;
