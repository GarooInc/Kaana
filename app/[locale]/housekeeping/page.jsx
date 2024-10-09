import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import InfoDisplay from '@/components/InfoDisplay/InfoDisplay'
import FooterItem from '@/components/FooterItem/FooterItem'

const namespaces = ['home', 'header']

export default async function HouseKeeping({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

    return (
        <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-quaternary">
            <HeaderItem v={"v4"} />
            <div className='info_container'>
                <h2 className='italictiempos_title'>{t('home:nav3')}</h2>
                <InfoDisplay collection="Housekeeping" />
                <FooterItem  transparent/>
            </div>
        </div>
        <LanguageSwitcher />
        </TranslationsProvider>
    );
}