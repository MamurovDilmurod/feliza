import { useGetList } from "../../services/query/useGetList";
import { useTranslation } from "react-i18next";

export const HeaderBoard = ({ brand }) => {
  const { i18n } = useTranslation();
  const { data, isLoading } = useGetList(
    "/api/categories/getSubCategoriesByParent/" + brand,
    {}
  );

  return (
    <div className="min-h-[430px] h-fit absolute bg-white w-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-full font-tenor text-primary font-normal">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-1 h-full overflow-x-auto">
          {data?.map((item, index) => (
            <div
              key={index}
              className="break-inside-avoid p-2 h-full border-r pl-10"
            >
              <p className="font-tenor font-normal text-base text-secondary hover:text-primary cursor-pointer">
                {i18n.language == "uz" ? item.nameUZB : item.nameRUS}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
