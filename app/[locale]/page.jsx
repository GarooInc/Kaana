import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import TextItem from '@/components/TextItem/TextItem'
import ButtonNav from '@/components/ButtonNav/ButtonNav'

const namespaces = ['letter', 'header']

export default async function Home({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

    return (
        <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <main className="page bg-quaternary">
            <HeaderItem v={"v4"} principal />
            <div className='flex flex-col pt-10 pb-20 md:py-20 md:px-40 px-10 gap-4'>
                <h1 className="principal_title m-0 flex gap-2 justify-center items-center md:flex-row flex-col">{t('letter:letter_title')}</h1>
                <TextItem text={t('letter:letter_text')} color="secondary" />
                <div className='w-full flex justify-center items-center'>
                    <ButtonNav title={t('letter:button')} link="/menu" />
                </div>
            </div>
        </main>
        <LanguageSwitcher />
        </TranslationsProvider>
    );
}