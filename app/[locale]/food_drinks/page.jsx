import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import FoodDrinksItem from '@/components/FoodDrinksItem/FoodDrinksItem'
import HeaderItem from '@/components/HeaderItem/HeaderItem'



const namespaces = ['food_drinks', 'header']

export default async function FoodDrinks({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-quinary">
            <HeaderItem v={"v7"} transparent/>
            <h1 className="italictiempos_title text-secondary">Food & Drinks</h1>
            <FoodDrinksItem />
            <div className='flex justify-between items-center w-full p-4 bg-tertiary'>
                <span className="font-futura text-secondary text-sm uppercase">RESORT & SPA</span>
                <img src="/assets/images/logo_v9.png" alt="logo" className="md:w-28 w-16" />
            </div>
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}