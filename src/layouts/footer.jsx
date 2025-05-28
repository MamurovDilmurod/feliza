import feliza_logo from '../assets/images/feliza-logo.png';
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { RiTelegram2Line } from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import Link from 'antd/es/typography/Link';

const Footer = () => {
  const { t } = useTranslation();

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
  return (
    <div className="max-w-[1280px] mx-auto pt-24 pb-10 px-4 font-tenor">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <span className="border-y w-full lg:w-[562px] border-stone-400"></span>
        <img src={feliza_logo} alt="Feliza logo" className='w-20' />
        <span className="border-y w-full lg:w-[562px] border-[#858585]"></span>
      </div>

      {/*  Icons */}
      <div className='flex flex-wrap items-center mt-10 justify-center gap-6 sm:gap-10'>
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
      <div className='flex flex-wrap justify-center gap-x-6 gap-y-3 pt-10 pb-5 text-center'>
        {[1, 2, 3, 4, 5].map((num, idx) => (
          <button key={idx} className='text-[#0D0D0D] hover:underline cursor-pointer'>
            {t(`footer.title${num}`)}
          </button>
        ))}
      </div>

      {/* Footer Links 2 */}
      <div className='flex flex-wrap justify-center gap-x-6 gap-y-3 pt-4 pb-7 text-center'>
        {[6, 7, 8, 9, 10].map((num, idx) => (
          <button key={idx} className='text-[#0D0D0D] hover:underline cursor-pointer'>
            {t(`footer.title${num}`)}
          </button>
        ))}
      </div>


      {/* Copyright */}
      <div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-10 pt-16 pb-10 text-center text-sm sm:text-base'>
        <span>© Feliza 2025</span>
        <span>Barcha huquqlar himoyalangan.</span>
      </div>
    </div>
  );
};

export default Footer;
