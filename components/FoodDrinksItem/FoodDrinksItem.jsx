"use client";
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { MdLocationPin } from "react-icons/md";
import { TbClockHour3Filled } from "react-icons/tb";



const FoodDrinksItem = () => {
    const [foodDrinks, setFoodDrinks] = useState([]);

    const pb = new PocketBase('https://kaana.garooinc.com/kaana');
    pb.autoCancellation(false);

    const openPdf = (item) => {
        window.open(`https://kaana.garooinc.com/kaana/api/files/${item.collectionId}/${item.id}/${item.menu_pdf}?token=`, '_blank');
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
        <div className="flex flex-col gap-10 w-full pb-10">
            {foodDrinks.map((item, index) => (
                <div key={index} className='flex flex-col w-full'>
                    <img className="w-full h-96 object-cover relative" src={`https://kaana.garooinc.com/kaana/api/files/${item.collectionId}/${item.id}/${item.cover_img}?token=`} alt={item.name} />
                    <div className='flex flex-col p-10  bg-secondary gap-4'>
                        <h3 className="md:text-4xl text-2xl leading-tight font-futura mt-2 text-primary">{item.name}</h3>
                        <div className='flex flex-col gap-4 border-b border-primary py-2'>
                            <span className='text-black text-md font-tiempos leading-6 text-justify'>{item.description}</span>
                        </div>
                        <div className='flex flex-col gap-2 justify-end items-start'>
                                <p className="text-black text-md font-futura leading-none flex gap-2 font-medium">
                                    <MdLocationPin className="text-primary text-md" />
                                    {item.location}
                                </p>
                                <p className="text-black text-md font-futuralight leading-none flex gap-2 font-medium">
                                    <TbClockHour3Filled className="text-primary text-md" />
                                    {item.open} - {item.closes}
                                </p>
                                <button className='quaternary_button' onClick={() => openPdf(item)}>Menú</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FoodDrinksItem
