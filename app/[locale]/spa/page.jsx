import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import FooterItem from '@/components/FooterItem/FooterItem'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import dynamic from 'next/dynamic'

const Flipbook = dynamic(() => import('@/components/FlipBook/FlipBook'), { ssr: false })


const namespaces = ['spa', 'home']

export default async function Adventures({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-secondary relative">
            <HeaderItem v={"v3"} transparent/>
            <h1 className="italictiempos_title text-quaternary">Spa</h1>
            <LanguageSwitcher />
            <div className='px-10 info_container'>
                <Flipbook pdf={"/assets/pdf/spa.pdf"} />
            </div>
            <FooterItem transparent logo={"v11"}/>
        </div>
    </TranslationsProvider>
  )
}