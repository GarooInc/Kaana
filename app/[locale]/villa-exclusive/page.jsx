import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'

const namespaces = ['villa-exclusive', 'header']

export default async function FrontDesk({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

    return (
        <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-quaternary">
            <HeaderItem v={"v13"} transparent whiteArrow nav={"/"} />
            <div className='info_container'>
                <h2 className='italictiempos_title text-secondary'>{t('villa-exclusive:title')}</h2>
            </div>
        </div>
        <LanguageSwitcher />
        </TranslationsProvider>
    );
}