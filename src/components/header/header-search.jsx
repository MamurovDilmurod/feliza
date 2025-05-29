import { Button, Input } from "antd";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";

export const HeaderSearch = ({ setShowSearch }) => {
  const { t } = useTranslation();
  return (
    <div className="absolute bg-white w-full min-h-[500px]">
      <div className="flex justify-center items-center h-full pt-14">
        <Input
          variant="underlined"
          className="lg:max-w-[800px]"
          placeholder={t("search")}
        />
        <Button
          className="!absolute right-3 lg:right-20 top-3 lg:top-14"
          icon={<IoMdClose size={21} />}
          onClick={() => setShowSearch(false)}
          children="Yopish"
        />
      </div>
    </div>
  );
};
