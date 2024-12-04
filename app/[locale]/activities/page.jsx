import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import ActivitiesItem from '@/components/ActivitiesItem/ActivitiesItem'
import FooterItem from '@/components/FooterItem/FooterItem'


const namespaces = ['activities', 'header']

export default async function Activities({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-secondary relative">
            <div className="flex flex-col w-full items-center">
                <HeaderItem v={"v3"} transparent/>
                <div className="w-full rounded-lg  px-10 font-futura text-black text-center flex flex-col justify-center items-center gap-4">
                    <h2 className='italictiempos_title text-quaternary'>{t('activities:title')}</h2>
                    <span className='md:w-1/3 futura_description text-quaternary text-center'>
                        {t('activities:desc')}
                    </span>
                </div>
                <ActivitiesItem />
            </div>
            <FooterItem transparent logo={"v11"}/>
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}