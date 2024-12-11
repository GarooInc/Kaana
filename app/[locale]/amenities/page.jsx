import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import AmenitiesItem from '@/components/AmenitiesItem/AmenitiesItem'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import FooterItem from '@/components/FooterItem/FooterItem'


const namespaces = ['amenities', 'header']

export default async function Amenities({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-tertiary">
            <HeaderItem v={"v12"} transparent whiteArrow/>
            <h1 className="principal_title italic">{t('amenities:title')}</h1>
            <AmenitiesItem/>
            <FooterItem  transparent logo={"v9"}/>
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}