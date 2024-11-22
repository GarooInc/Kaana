import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import Carousel from '@/components/Carousel/Carousel'
import ChatBubble from '@/components/ChatBubble/ChatBubble'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import ArrowBack from '@/components/ArrowBack/ArrowBack'



const namespaces = ['welcome', 'header']

export default async function Welcome({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
    <div className="page">
        <div className="flex flex-col w-full h-screen">
            <ArrowBack absolute white/>
            <div className="w-full md:h-3/5">
                <Carousel />
            </div>
            <div className='welcome_container'>
                <p>{t('welcome:subtitle')}</p>
                <h1 className="principal_title">{t('welcome:title')}</h1>
                <span className="text-secondary text-md font-futura text-justify leading-6 tracking-wide my-4">
                    {t('welcome:content')}
                </span>
                <img className="md:w-40 w-28" src="/assets/images/logo_luxury.png" alt="luxury logo"/>
            </div>
        </div>
      </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}