import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const selectedLanguage = e;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div className="w-fit hidden md:block">
      {/* <select
        value={i18n.language}
        onChange={handleChange}
        className="rounded text-sm"
      >
        <option value="ru">Русский</option>
        <option value="uz">O‘zbek</option>
      </select> */}

      <Select
        variant="borderless"
        value={i18n.language}
        onChange={handleChange}
        className="w-fit rounded text-sm"
        suffixIcon={<IoIosArrowDown width={6} />}
        options={[
          { value: "ru", label: "Русский" },
          { value: "uz", label: "O‘zbek" },
        ]}
        // dropdownClassName="bg-white text-black"
        // dropdownStyle={{
        //   backgroundColor: "white",
        //   color: "white",
        //   border: "1px solid #d9d9d9",
        //   width: 160,
        // }}
        styles={{
          root: { backgroundColor: "white", color: "red" },
        }}
      />
    </div>
  );
};

export default LanguageSelector;
