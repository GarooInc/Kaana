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
            <HeaderItem v={"v5"} transparent whiteArrow/>
            <div className='info_container'>
                <h2 className='italictiempos_title text-secondary'>{t('frontdesk:title')}</h2>
                        <div className='flex flex-col md:items-center justify-center gap-4 font-futura uppercase '>
                            <div className="fontdesk_item">
                                <FaWhatsapp className="mr-2 text-secondary text-2xl" />
                                <a href="https://wa.me/5016144247" className="fontdesk_item_text">{t('frontdesk:whatsapp')} <span>+501 614-4247</span></a>
                            </div>
                            <div className="fontdesk_item">
                                <FaPhone className="mr-2 text-secondary text-2xl" />
                                <a href="tel:+501 614-4247" className="fontdesk_item_text">{t('frontdesk:phone')} <span>+501 614-4247</span></a>
                            </div>
                            <div className="fontdesk_item">
                                <FaWifi className="mr-2 text-secondary text-2xl" />
                                <span className="fontdesk_item_text">WiFi</span>
                                <span className="fontdesk_item_text">{t('frontdesk:wifi_name')}: Kanna Kaana Guest WiFi</span>
                                <span className="fontdesk_item_text">{t('frontdesk:wifi_password')}: kaana2022</span>
                            </div>
                        </div>
                <InfoDisplay collection="Front_Desk" colorlines="white" coloricon="primary" />
                <FooterItem  transparent/>
            </div>
        </div>
        <LanguageSwitcher />
        </TranslationsProvider>
    );
}