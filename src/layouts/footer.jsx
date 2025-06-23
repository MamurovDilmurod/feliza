import feliza_logo from '../assets/images/feliza-logo.png';
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { RiTelegram2Line } from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

const Footer = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const socialLinks = [
    {
      href: "https://www.facebook.com/people/Feliza-Dokoni/pfbid0aw6eJ61Ez7pLMinm1WbvMR6UfmKZNJtZcamRA8XB1u5ZcT4HTFJAAbCZDKK1MpKrl/",
      icon: <FaFacebookF />
    },
    { href: "https://www.instagram.com/feliza_uz/reels/", icon: <FaInstagram /> },
    { href: "#", icon: <FaTiktok /> },
    { href: "https://t.me/feliza_uz", icon: <RiTelegram2Line /> },
    { href: "https://www.youtube.com/@feliza_uz6743/featured", icon: <IoLogoYoutube /> },
  ];

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1280px] mx-auto pt-8 md:pt-24 pb-10 px-4 font-tenor">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <span className="border-y w-full lg:w-[562px] border-stone-400"></span>
        <img
          src={feliza_logo}
          alt="Feliza logo"
          className='w-20 cursor-pointer hidden md:block'
          onClick={() => navigate('/')}
        />
        <span className="border-y w-full lg:w-[562px] border-[#858585] hidden md:block"></span>
      </div>

      {/* Icons */}
      <div className='flex flex-wrap items-center mt-8 md:mt-10 justify-center gap-6 sm:gap-10'>
        {socialLinks.map(({ href, icon }, idx) => (
          <a
            key={idx}
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='w-8 text-[#5B5B5B] cursor-pointer text-2xl hover:text-black transition'
            aria-label={`Link to social media ${idx + 1}`}
          >
            {icon}
          </a>
        ))}
      </div>

      {/* Footer Links 1 */}
      <div className='flex flex-wrap justify-center gap-x-6 gap-y-3 md:pt-10 pt-8 md:pb-5 text-center max-w-[1280px] mx-auto'>
        <Link onClick={handleScrollTop} to="/about" className='text-[#0D0D0D] hover:underline cursor-pointer'>
          {i18n.language === 'uz' ? 'Biz haqimizda' : 'О нас'}
        </Link>

        <Link onClick={handleScrollTop} to="/branches" className='text-[#0D0D0D] hover:underline cursor-pointer'>
          {i18n.language === 'uz' ? 'Filiallarimiz' : 'Наши филиалы'}
        </Link>

        <button onClick={
          () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            navigate('/categoryDetail/7')
          }
        } className='text-[#0D0D0D] hover:underline cursor-pointer'>
          {i18n.language === 'uz' ? 'Chegirmalar' : 'Скидки'}
        </button>

        <Link onClick={handleScrollTop} to="/terms" className='text-[#0D0D0D] hover:underline cursor-pointer'>
          {i18n.language === 'uz' ? 'Foydalanish shartlari' : 'Условия использования'}
        </Link>

        <Link to="/contact" onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} className='text-[#0D0D0D] hover:underline cursor-pointer'>
          {i18n.language === 'uz' ? 'Kontakt' : 'Контакты'}
        </Link>
      </div>

      {/* Footer Links 2 */}
      <div className='flex flex-wrap justify-center gap-x-6 gap-y-3 pt-4 md:pb-7 text-center'>
        <Link to="/faq" className='text-[#0D0D0D] hover:underline cursor-pointer'>
          {i18n.language === 'uz' ? 'Ko’p so’raladigan savollar' : 'Часто задаваемые вопросы'}
        </Link>

        <Link to="/delivery" className='text-[#0D0D0D] hover:underline cursor-pointer'>
          {i18n.language === 'uz' ? 'Yetkazib berish' : 'Доставка'}
        </Link>

        <Link to="/returns" className='text-[#0D0D0D] hover:underline cursor-pointer'>
          {i18n.language === 'uz' ? 'Qaytarib olish' : 'Возврат'}
        </Link>

        <Link to="/payment" className='text-[#0D0D0D] hover:underline cursor-pointer'>
          {i18n.language === 'uz' ? 'To’lov' : 'Оплата'}
        </Link>

        <Link to="/career" className='text-[#0D0D0D] hover:underline cursor-pointer'>
          {i18n.language === 'uz' ? 'Karera' : 'Карьера'}
        </Link>
      </div>

      {/* Copyright */}
      <div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-10 md:pt-10 pt-7 pb-10  md:pb-0 text-center text-sm sm:text-base'>
        <span>{
          i18n.language === 'uz' ? '© Feliza 2025' : '© Feliza 2025'
        }</span>
        <span>{
          i18n.language === 'uz' ? 'Barcha huquqlar himoyalangan.' : 'Все права защищены.'
        }</span>
      </div>
    </div>
  );
};

export default Footer;
