import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div className="w-fit">
      <select
        value={i18n.language}
        onChange={handleChange}
        className="border rounded px-3 py-1 text-sm"
      >
        <option value="ru">Русский</option>
        <option value="uz">O‘zbekcha</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
