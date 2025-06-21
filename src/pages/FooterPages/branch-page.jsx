import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";


const branches = [
    {
        name: 'Chilonzor',
        address: 'Chilonzor 16-kvartal, Bunyodkor shoh ko’chasi 18',
        workingHours: '10:00 - 22:00',
        mapLink: 'https://yandex.uz/maps/org/202265806778/?ll=69.224491%2C41.284303&z=16'
    },
    {
        name: 'Uchtepa',
        address: 'Uchtepa,Lutfiy ko’chasi 21A',
        workingHours: '09:00 - 21:00',
        mapLink: 'https://yandex.uz/maps/org/209844084430/?ll=69.185988%2C41.286011&z=18'
    },
    {
        name: 'Yunusobod',
        address: 'Yunusobod massivi, 11-kvartal, 20-uy',
        workingHours: '09:00 - 22:00',
        mapLink: 'https://yandex.uz/maps/org/154946755839/?ll=69.286268%2C41.367730&z=16'
    },
    {
        name: 'Chorsu Nessa',
        address: 'Chorsu, Besh-Agoch prospekti, 1-uy',
        workingHours: '08:00 - 20:00',
        mapLink: 'https://yandex.uz/maps/org/nessa/127388867584/?ll=69.235943%2C41.321093&z=16'
    },
    {
        name: 'Samarqand',
        address: 'Samarqand shahri, Rudakiy ko‘chasi, 103-uy',
        workingHours: '10:00 - 21:00',
        mapLink: 'https://yandex.uz/maps/org/125900198590/?ll=66.933454%2C39.681493&z=16'
    },
    {
        name: 'Qoraqalpog‘iston ',
        address: 'Qoraqalpog‘iston Respublikasi, Nukus shahri, Ernazar Alaqo‘zi ko‘chasi',
        workingHours: '10:00 - 21:00',
        mapLink: 'https://yandex.uz/maps/org/93550766473/?ll=59.599689%2C42.487862&z=13'
    },
    {
        name: 'Chilonzor',
        address: 'Chilonzor tumani, Chilonzor massivi, 3-kvartal, 45/1-uy',
        workingHours: '10:00 - 21:00',
        mapLink: 'https://yandex.uz/maps/org/202265806778/?ll=69.224491%2C41.284303&z=16'
    }
];

function BranchPage() {
    const [openIndex, setOpenIndex] = useState(0);
    const { i18n } = useTranslation();

    const toggleBranch = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 text-[#0D0D0D]">
            <h1 className="text-2xl sm:text-3xl font-normal text-center mb-8 text-[#0D0D0D]">FILIALLARIMIZ</h1>

            {branches.map((branch, index) => (
                <div key={index} className="border-b border-[#BBBBBB]">
                    <button
                        onClick={() => toggleBranch(index)}
                        className="w-full py-4 flex justify-between items-center text-left"
                    >
                        <span className="text-base sm:text-lg font-normal">{branch.name}</span>
                        <span className="text-lg sm:text-xl text-[#BBBBBB]">
                            {openIndex === index ? <FaAngleUp /> : <FaAngleDown />}
                        </span>
                    </button>

                    {openIndex === index && (
                        <div className="pb-4 pl-1 space-y-3 text-sm sm:text-base">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                    <span className="block text-[#BBBBBB]">Manzil:</span>
                                    <p className="text-[#0D0D0D]">{branch.address}</p>
                                </div>
                                <a
                                    href={branch.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#0D0D0D] hover:underline hover:text-black whitespace-nowrap"
                                >
                                    {i18n.language === 'uz' ? 'Xaritada ko\'rish' : 'Посмотреть на карте'}
                                </a>
                            </div>
                            <div>
                                <span className="block text-[#BBBBBB]">Ish vaqti:</span>
                                <p className="text-[#0D0D0D]">{branch.workingHours}</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default BranchPage;
