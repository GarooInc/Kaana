"use client";
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { MdLocationPin } from "react-icons/md";
import { TbClockHour3Filled } from "react-icons/tb";



const FoodDrinksItem = () => {
    const [foodDrinks, setFoodDrinks] = useState([]);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const pb = new PocketBase(backendUrl);
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
        <div className="food_container">
            {foodDrinks.map((item, index) => (
                <div key={index} className='food_drinks_inner'>
                    <img className="food_drinks_img" src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.cover_img}?token=`} alt={item.name} />
                    <div className='food_drinks_info'>
                        <h3 className="food_drinks_title">{item.name}</h3>
                        <div className='food_drinks_description_container'>
                            <span className='food_drinks_description'>{item.description}</span>
                        </div>
                        <div className='food_drinks_icons_container'>
                                <p className="food_drinks_text">
                                    <MdLocationPin className="text-secondary text-md" />
                                    {item.location}
                                </p>
                                <p className="food_drinks_text">
                                    <TbClockHour3Filled className="text-secondary text-md" />
                                    {item.open} - {item.closes}
                                </p>
                                <button className='menu_btn' onClick={() => openPdf(item)}>Menu</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FoodDrinksItem
