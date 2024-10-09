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
        <div className="page bg-white relative">
            <div className="flex flex-col w-full items-center">
                <HeaderItem v={"v4"} />
                <div className="w-full  bg-secondary rounded-lg shadow p-10 my-10 font-futura text-black text-center flex flex-col justify-center items-center gap-4">
                    <h2 className='italictiempos_title'>{t('activities:title')}</h2>
                    <span className='md:w-1/3 tiempos_description'>
                        Find ocean-view rooms, eclectic cuisine, and sparkling pools along the Caribbean Sea. Explore our all-inclusive resort ahead of your stay and
                        imagine what&apos;s possible.
                    </span>
                </div>
                <ActivitiesItem />
            </div>
            <FooterItem />
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}