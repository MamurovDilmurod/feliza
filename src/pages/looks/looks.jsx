import { useNavigate } from "react-router-dom";
import { useGetList } from "../../services/query/useGetList";
import { PiSquaresFour } from "react-icons/pi";
import { LiaGripVerticalSolid } from "react-icons/lia";
import { Button, Skeleton } from "antd";
import { useState } from "react";
import { CiGrid2H } from "react-icons/ci";

const Looks = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetList(
    "/api/lookCollection/getLookCollection"
  );
  const [grid, setGrid] = useState(4);
  const [gridMobile, setGridMobile] = useState(2);
  return (
    <div className="p-1 bg-background">
      <div className="py-5 lg:py-10 space-y-4">
        <div className="flex justify-between lg:justify-center">
          <h1 className="font-tenor font-normal text-2xl text-primary text-center">
            Looklar
          </h1>

          <div className="flex lg:hidden items-center gap-5">
            <Button
              className="!border-none !shadow-none !bg-transparent"
              icon={
                <CiGrid2H
                  color={gridMobile == 1 ? "#0d0d0d" : "#bbb"}
                  size={24}
                  onClick={() => setGridMobile(1)}
                />
              }
            />
            <Button
              className="!border-none !shadow-none !bg-transparent"
              onClick={() => setGridMobile(2)}
              icon={
                <LiaGripVerticalSolid
                  color={gridMobile == 2 ? "#0d0d0d" : "#bbb"}
                  size={24}
                />
              }
            />
          </div>
        </div>

        <div className="flex justify-between items-center px-28">
          <p className="font-tenor font-normal text-base text-primary  leading-[180%] hidden lg:block">
            Galereyamizdan ilhom oling va ijtimoiy tarmoqlarda @feliza va
            #felizastyle bilan o’z ko’rinishingizni ulashing.
          </p>

          <div className="hidden lg:flex gap-2.5 items-center">
            <p className="font-tenor font-normal text-sm text-secondary">
              Ko'rish:
            </p>
            <div className="flex items-center gap-5">
              <Button
                className="!border-none !shadow-none !bg-transparent"
                icon={
                  <PiSquaresFour
                    color={grid == 4 ? "#0d0d0d" : "#bbb"}
                    size={24}
                    onClick={() => setGrid(4)}
                  />
                }
              />
              <Button
                className="!border-none !shadow-none !bg-transparent"
                onClick={() => setGrid(6)}
                icon={
                  <LiaGripVerticalSolid
                    color={grid == 6 ? "#0d0d0d" : "#bbb"}
                    size={24}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={`grid lg:grid-cols-${grid} gap-1`}>
          {Array.from({ length: grid }).map((item) => (
            <Skeleton.Image
              active
              className={`max-w-[357px] !w-full ${
                grid == 4 ? "!min-h-[450px]" : "!min-h-[302px]"
              } h-full`}
            />
          ))}
        </div>
      ) : (
        <div
          className={`grid w-full gap-1 grid-cols-${gridMobile} lg:grid-cols-${grid}`}
        >
          {data?.map((item) => (
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
      )}
    </div>
  );
};

export default Looks;
