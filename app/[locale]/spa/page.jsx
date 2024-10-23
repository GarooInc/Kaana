import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import ArrowBack from '@/components/ArrowBack/ArrowBack'
import FooterCart from '@/components/FooterCart/FooterCart'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import TabCartItem from '@/components/TabCartItem/TabCartItem'


const namespaces = ['spa', 'home']

export default async function Adventures({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-white md:px-20 px-10 relative">
            <ArrowBack absolute/>
            <div className='flex flex-col justify-center items-center'>
                <img src="/assets/images/logo_v1.png" alt="logo" className="w-[150px]" />
                <h1 className="italictiempos_title">{t('spa:title')}</h1>
                <span className="tiempos_description py-4">
                    {t('spa:text1')}
                </span>
            </div>
            <LanguageSwitcher />
            <TabCartItem collection={"spa"} />
            <FooterCart />
        </div>
    </TranslationsProvider>
  )
}