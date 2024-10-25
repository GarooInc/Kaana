import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import InfoDisplay from '@/components/InfoDisplay/InfoDisplay'
import { FaWhatsapp, FaPhone, FaWifi } from "react-icons/fa"
import FooterItem from '@/components/FooterItem/FooterItem'

const namespaces = ['frontdesk', 'header']

export default async function FrontDesk({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

    return (
        <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-quaternary">
            <HeaderItem v={"v4"} />
            <div className='info_container'>
                <h2 className='italictiempos_title'>{t('frontdesk:title')}</h2>
                    <div className="bg-secondary md:p-10 p-8 rounded-lg font-serif flex flex-col md:gap-8 gap-4">
                        <div className='flex md:flex-row flex-col md:items-center justify-start gap-4'>
                            <div className="flex items-center">
                                <FaWhatsapp className="mr-2 text-quaternary text-2xl" />
                                <a href="https://wa.me/5016144247" className="md:text-lg text-gray-700">{t('frontdesk:whatsapp')}: +501 614-4247</a>
                            </div>
                            <div className="flex items-center">
                                <FaPhone className="mr-2 text-quaternary text-2xl" />
                                <a href="tel:+501 614-4247" className="md:text-lg text-gray-700">{t('frontdesk:phone')}: +501 614-4247</a>
                            </div>
                        </div>

                        <div className="flex md:flex-row flex-col items-start gap-4">
                            <div className="flex items-center">
                                <FaWifi className="mr-2 text-quaternary text-2xl" />
                                <span className="md:text-lg text-gray-700">{t('frontdesk:wifi_name')}: Kanna Kaana Guest WiFi</span>
                            </div>
                            <div className="flex items-center">
                                <FaWifi className="mr-2 text-quaternary text-2xl" />
                                <span className="md:text-lg text-gray-700">{t('frontdesk:wifi_password')}: kaana2022</span>
                            </div>
                        </div>
                    </div>
                <InfoDisplay collection="Front_Desk" />
                <FooterItem  transparent/>
            </div>
        </div>
        <LanguageSwitcher />
        </TranslationsProvider>
    );
}