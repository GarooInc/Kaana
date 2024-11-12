import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import InfoDisplay from '@/components/InfoDisplay/InfoDisplay'
import PhoneItem from '@/components/PhoneItem/PhoneItem'
import FooterItem from '@/components/FooterItem/FooterItem'

const namespaces = ['home', 'header']

export default async function HouseKeeping({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

    return (
        <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-secondary relative">
            <HeaderItem v={"v4"} transparent/>
            <div className='flex flex-col justify-center items-center '>
                <h2 className='italictiempos_title text-quaternary'>{t('home:nav10')}</h2>
                <InfoDisplay collection="Emergency" colorlines="quaternary" coloricon="tertiary"/>
                <div className="flex flex-col justify-center items-center gap-4 md:w-3/4 px-10 w-full">
                    <div className='collapse-title md:text-lg text-sm font-medium font-futura uppercase peer-checked:collapse-open text-quaternary py-0'>
                        Emergency Contacts
                    </div>
                </div>
                <div className='flex md:flex-row flex-col md:justify-center justify-start items-center md:p-10 md:mx-0 mx-auto pb-10 w-3/4 border-black border-b'>
                    <div className='flex justify-start items-center md:h-48 w-full '>
                        <PhoneItem name="Kaana Resort" p1="+501 523-2435;" link1="tel:+5015232435" />
                        <PhoneItem name="Placencia Police" p1="+501 614-4247" link1="tel:+501 614-4247" />
                    </div>
                    <div className='flex  justify-start items-center md:h-48 w-full'>
                        <PhoneItem name="Placencia Fire Station" p1="+501 503-3022" link1="tel:+5015033022" />
                        <PhoneItem name="Placencia Clinic" p1="+501 523- 3328" link1="tel:+5015233328" />
                    </div>
                </div>
            </div>
            <FooterItem  transparent />
        </div>
        <LanguageSwitcher />
        </TranslationsProvider>
    );
}