import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import Carousel from '@/components/Carousel/Carousel'
import ChatBubble from '@/components/ChatBubble/ChatBubble'
import HeaderItem from '@/components/HeaderItem/HeaderItem'



const namespaces = ['welcome', 'header']

export default async function Welcome({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
    <div className="page">
        <div className="flex flex-col w-full h-screen">
            <HeaderItem v={"v4"}/>
            <div className="w-full md:h-3/5">
                <Carousel />
            </div>
            <div className='flex flex-col justify-center items-center w-full h-full bg-quaternary p-10 md:p-14'>
                <h1 className="principal_title m-0 flex gap-2 justify-center items-center md:flex-row flex-col italic">{t('welcome:title')}</h1>
                <p className="text-center md:text-xl text-md  text-primary font-futura">{t('welcome:subtitle')}</p>
                <span className="text-secondary text-md font-futuralight text-center leading-6 tracking-wide my-4 font-tiempos">
                    {t('welcome:content')}
                </span>
            </div>
        </div>
        <ChatBubble />
      </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}