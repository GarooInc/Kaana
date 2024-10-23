"use client";
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';

const AdventuresItem = () => {
    const [adventures, setAdventures] = useState([]);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const pb = new PocketBase(backendUrl);
    pb.autoCancellation(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection('Top_Five_Adventures').getFullList({
                    sort: '-created',
                });
                console.log(records);
                setAdventures(records);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 grid-flow-row-dense auto-rows-auto md:px-10 pt-10 pb-24">
            {adventures.map((item, index) => (
                <div key={index} className={`bg-white px-2 pb-16 gap-2 flex flex-col relative ${(index + 1) % 4 !== 0 ? 'md:border-r md:border-black' : ''} ${(index + 1) % 2 !== 0 ? 'md:border-r md:border-black' : ''}`}>
                    <img className="md:w-full w-full h-48 md:h-52 object-cover" src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.image}?token=`} alt={item.name} />
                    <h3 className="text-primary text-xl leading-tight font-tiempos mt-2">{item.title}</h3>
                    <p className="text-black text-md font-futuralight leading-6 tracking-tight">{item.short_Description}</p>
                    <p className="text-primary text-xs  leading-none font-futura font-bold"> £{item.price}</p>
                    <button className='green_button w-[200px] absolute bottom-2'>Request a reservation</button>
                </div>
            ))}
        </div>
    );
};

export default AdventuresItem
