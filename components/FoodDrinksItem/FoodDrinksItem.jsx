"use client";
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { MdLocationPin } from "react-icons/md";
import { TbClockHour3Filled } from "react-icons/tb";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { useTranslation } from 'react-i18next';



const FoodDrinksItem = () => {
    const [foodDrinks, setFoodDrinks] = useState([]);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const pb = new PocketBase(backendUrl);
    pb.autoCancellation(false);

    const openPdf = (item) => {
        window.open(`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.menu_pdf}?token=`);
    };
    
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;

    const getWhatsappLink = (item) => {
        const digits = (item.whatsapp_number || '').replace(/\D/g, '');
        const message = currentLocale === 'es'
            ? `Hola, quisiera hacer un pedido del menú de ${item.name_es?.trim()}.`
            : `Hi, I'd like to place an order from the ${item.name_en?.trim()} menu.`;
        return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
    };

    const getCallLink = (item) => {
        const digits = (item.whatsapp_number || '').replace(/\D/g, '');
        return `tel:+${digits}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection('Food_Drinks').getFullList({
                    sort: 'order_num',
                });
                setFoodDrinks(records);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);
    


    return (
        <div className="food_container">
            {foodDrinks.map((item, index) => (
                <div key={index} className='food_drinks_inner'>
                    <img className="food_drinks_img" src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.cover_img}?token=`} alt={item.name} />
                    <div className='food_drinks_info'>
                        <h3 className="food_drinks_title">{item[`name_${currentLocale}`]}</h3>
                        <div className='food_drinks_description_container'>
                        <span 
                            className='food_drinks_description' 
                            dangerouslySetInnerHTML={{ __html: item[`description_${currentLocale}`] }} 
                            />
                        </div>
                        <div className='food_drinks_icons_container'>
                                <p className="food_drinks_text">
                                    <MdLocationPin className="text-secondary text-md" />
                                    {item[`location_${currentLocale}`]}
                                </p>
                                <p className="food_drinks_text">
                                    <TbClockHour3Filled className="text-secondary text-md" />
                                    {item.open} - {item.closes}
                                </p>
                                {(item.menu_pdf || item.whatsapp_number) && (
                                    <div className='flex flex-wrap gap-3 justify-between items-center w-full'>
                                        <div className='flex flex-wrap gap-3'>
                                            {item.menu_pdf && (
                                                <button className='menu_btn' onClick={() => openPdf(item)}>Menu</button>
                                            )}
                                        </div>
                                        {item.whatsapp_number && (
                                            <div className='flex flex-wrap gap-3'>
                                                <a
                                                    href={getWhatsappLink(item)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className='menu_btn flex items-center gap-2'
                                                >
                                                    <FaWhatsapp className="text-base" />
                                                    WhatsApp
                                                </a>
                                                <a
                                                    href={getCallLink(item)}
                                                    className='menu_btn flex items-center gap-2'
                                                >
                                                    <FaPhone className="text-base" />
                                                    {currentLocale === 'es' ? 'Llamar' : 'Call'}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FoodDrinksItem
