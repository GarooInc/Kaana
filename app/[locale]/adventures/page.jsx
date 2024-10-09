import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import AdventuresItem from '@/components/AdventuresItem/AdventuresItem'
import ArrowBack from '@/components/ArrowBack/ArrowBack'
import FooterItem from '@/components/FooterItem/FooterItem'


const namespaces = ['adventures', 'header']

export default async function Adventures({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-white md:px-20 px-10 relative">
            <ArrowBack absolute/>
            <div className='flex flex-col justify-center items-center'>
                <img src="/assets/images/logo_v1.png" alt="logo" className="w-[150px]" />
                <h1 className="italictiempos_title">Adventures</h1>
            </div>
            <AdventuresItem />
            <FooterItem />
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}