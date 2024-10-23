"use client";
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/contexts/CartContext';
import CartNotification from '@/components/CartNotification/CartNotification';

const ServicesItem = ({ room, collection}) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [data, setData] = useState([]);
    const [notification, setNotification] = useState(false);
    const [actualProduct, setActualProduct] = useState({});
    const pb = new PocketBase(`${backendUrl}`);
    pb.autoCancellation(false);

    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const { dispatch } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection(collection).getFullList({
                    sort: 'id_number',
                });
                setData(records);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    const addToCart = (item) => {
        const updatedItem = {
            ...item,
            Title: item[`title_${currentLocale}`],
            Variant: "",
            Price: item.price || 0,
        };
        setNotification(true);
        setActualProduct(updatedItem);
        console.log(updatedItem);
        setTimeout(() => {
            setNotification(false);
        }, 3000);

        dispatch({ type: 'ADD_ITEM', payload: updatedItem });
    };

    return (
        <div className="grid md:grid-cols-3 md:gap-10 grid-cols-1 gap-4 md:w-3/4 w-full px-10 pt-10 pb-20">
            {room ? (
                data.map((item, index) => (
                    <div key={index} className="px-2 pb-16 gap-2 flex flex-col relative" >
                        <img className="adventure_img" src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.image}?token=`} alt={item.name} />
                        <h3 className="adventure_title">{item[`title_${currentLocale}`]}</h3>
                        <p className="text-quaternary text-xs  leading-none font-futura font-bold"> £{item.price}</p>
                        <button className='green_button w-[200px] absolute bottom-4' onClick={() => addToCart(item)}>Add to cart</button>
                    </div>
                ))
            ) : (
                data.map((item, index) => (
                    <div className='flex' key={index}>
                        <a href={item.link_service ? item.link_service : ""} className='flex gap-4 justify-start items-center'>
                            <img className="md:w-20 md:h-20 w-16 rounded-full object-cover" src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.image}?token=`} alt={item.name} />
                            <span className='text-green font-futura infodisplay' dangerouslySetInnerHTML={{ __html: item[`title_${currentLocale}`] }}></span>
                        </a>
                    </div>
                ))
            )}
            {notification && <CartNotification productName={actualProduct.Title} productImage={`${backendUrl}/api/files/${actualProduct.collectionId}/${actualProduct.id}/${actualProduct.image}?token=`} productVariant={actualProduct.Variant} />}
        </div>
    );
}

export default ServicesItem;