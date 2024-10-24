import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import ButtonNav from '@/components/ButtonNav/ButtonNav'
import ChatBubble from '@/components/ChatBubble/ChatBubble'
import { HiInformationCircle } from "react-icons/hi2"

const namespaces = ['home', 'header']

export default async function Menu({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)
    const nav = [
        {
            title: t('home:nav1'),
            link: '/welcome'
        },
        {
            title: t('home:nav2'),
            link: '/frontdesk'
        },
        {
            title: t('home:nav3'),
            link: '/housekeeping'
        },
        {
            title: t('home:nav4'),
            link: '/experiences'
        },
        {
            title: t('home:nav5'),
            link: '/food_drinks'
        },
        {
            title: t('home:nav6'),
            link: '/activities'
        },
        {
            title: t('home:nav7'),
            link: '/adventures'
        },
        {
            title: t('home:nav13'),
            link: '/spa'
        },
        {
            title: t('home:nav12'),
            link: '/room-services'
        },
        {
            title: t('home:nav10'),
            link: '/emergency'
        },
        {
            title: t('home:nav11'),
            link: '/faqs'
        }
    ]

    return (
        <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <main className="page bg-secondary pt-10 pb-20 md:py-10">
            <div className='flex flex-col justify-center items-center'>
                <img src="/assets/images/logo_v3.png" alt="logo" className="w-[150px]" />
                <div className="flex flex-col justify-center items-center gap-4 py-10">
                    {
                        nav.map((item, index) => (
                            <ButtonNav key={index} title={item.title} link={item.link} />
                        ))
                    }
                </div>
            </div>
            <ChatBubble />
        </main>
        <LanguageSwitcher />
        <a href='https://garooinc.com/' className="fixed top-10 left-10">
            <HiInformationCircle className="info-icon text-4xl text-tertiary" />
        </a>
        </TranslationsProvider>
    );
}