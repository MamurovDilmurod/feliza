import { useGetList } from "../../services/query/useGetList";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCart/ProductCard";
import { Button } from "antd";
import { IoIosArrowBack } from "react-icons/io";

const LooksDetail = () => {
  const { id } = useParams();
  const { data } = useGetList(
    "/api/lookCollection/getLookCollectionById/" + id
  );

  const navigate = useNavigate();
  const { data: Looks, isLoading } = useGetList(
    "/api/lookCollection/getLookCollection"
  );

  return (
    <div className="lg:space-y-20 px-1 relative">
      <Button
        icon={<IoIosArrowBack />}
        className="!absolute !left-10 top-10 !text-primary !font-tenor !text-base !border-none backdrop-blur-sm !bg-white/20"
        children={"Barcha looklar"}
      />
      <div className="flex  lg:gap-10 w-full max-w-[1440px] overflow-hidden flex-wrap lg:flex-nowrap">
        <div className="">
          <img
            className="min-w-[524px] h-[400px] w-full lg:h-[660px] object-cover"
            src={data?.images[0]?.url}
            alt=""
          />
        </div>

        <div className="w-full">
          <div className="flex flex-col gap-2 justify-between h-full py-10">
            <div className="flex justify-between items-center w-full pr-3 lg:pr-20">
              <h1 className="font-tenor font-normal text-xl text-primary">
                Lookga ega bo'ling!
              </h1>
              <p className="font-tenor font-normal text-base text-primary underline">
                #felizastyle
              </p>
            </div>
            <p className="font-tenor font-normal text-base text-secondary">
              {data?.productResponseDtos?.length} mahsulot
            </p>
            <div className="w-full">
              <div
                style={{ scrollbarWidth: "none" }}
                className="flex gap-7 w-full max-w-[955px] overflow-x-scroll pr-3"
              >
                {data?.productResponseDtos.map((item) => (
                  <div className="w-full">
                    <div className="min-w-[240px]">
                      <ProductCard item={item} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        <h1 className="font-tenor font-normal text-xl text-primary text-center">
          BOSHQA LOOKLARNI HAM KO’RING
        </h1>

        <div className={`grid w-full gap-1 grid-cols-2 lg:grid-cols-4`}>
          {Looks?.map((item) => (
            <div
              onClick={() => (
                navigate("/looksDetail/" + item.id),
                window.scrollTo({ top: 0, behavior: "smooth" })
              )}
              className="cursor-pointer hover:scale-95 duration-300"
            >
              <img
                className="max-w-[357px] min-w-full w-full"
                src={item.images[0].url}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LooksDetail;
