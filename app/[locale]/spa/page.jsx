import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import FooterCart from '@/components/FooterCart/FooterCart'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import TabCartItem from '@/components/TabCartItem/TabCartItem'
import HeaderItem from '@/components/HeaderItem/HeaderItem'


const namespaces = ['spa', 'home']

export default async function Adventures({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-secondary relative">
            <HeaderItem v={"v6"} transparent/>
            <img className='icon_page' src="/assets/images/spa/icon.png" alt="Spa" />
            <h1 className="italictiempos_title text-quaternary">Spa</h1>
            <LanguageSwitcher />
            <TabCartItem collection={"spa"} />
            <FooterCart />
        </div>
    </TranslationsProvider>
  )
}