"use client";
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { useCart } from '@/contexts/CartContext';
import CartNotification from '@/components/CartNotification/CartNotification';
import { useTranslation } from 'react-i18next';

const TabCartItem = ({ collection, noTags }) => {
    const [items, setItems] = useState([]);
    const [notification, setNotification] = useState(false);
    const [actualProduct, setActualProduct] = useState({});
    const [filter, setFilter] = useState(null);
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const { dispatch } = useCart();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const pb = new PocketBase(`${backendUrl}`);
    pb.autoCancellation(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection(collection).getFullList({
                    sort: '-created',
                });
                setItems(records);
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
            Price: item.price,
        };
        dispatch({ type: 'ADD_ITEM', payload: updatedItem });
        setNotification(true);
        setActualProduct(updatedItem);
        setTimeout(() => {
            setNotification(false);
        }, 3000);
    };

    const uniqueTags_es = [...new Set(items?.map(item => item.tag_es))].sort((a, b) => b.localeCompare(a));
    const uniqueTags_en = [...new Set(items?.map(item => item.tag_en))].sort((a, b) => b.localeCompare(a));
    const filteredItems = filter !== null ? items.filter(item => item.tag_es === filter || item.tag_en === filter) : items;

    return (
        <div className='flex flex-col gap-10 w-full'>
            {!noTags && 
            <div className='flex gap-4 justify-center items-center md:flex-row md:flex-nowrap flex-wrap'>
                {
                    currentLocale === 'es' ? uniqueTags_es.map((tag, index) => (
                        <button key={index} className={`button_line xl:w-[200px] md:w-[150px] w-[45%] h-16 ${filter === tag ? 'bg-secondary' : ''}`} onClick={() => setFilter(tag)}>
                            {tag}
                        </button>
                    )) : uniqueTags_en.map((tag, index) => (
                        <button key={index} className={`button_line xl:w-[200px] md:w-[150px] w-[45%] h-16 ${filter === tag ? 'bg-secondary' : ''}`} onClick={() => setFilter(tag)}>
                            {tag}
                        </button>
                    ))
                }
            </div>
            }
            <div className="adventure_container">
                {filteredItems.map((item, index) => (
                    <div key={index} className={`pb-16 gap-2 flex flex-col relative ${(index + 1) % 4 !== 0 ? 'xl:border-r xl:border-black' : ''} ${(index + 1) % 2 !== 0 ? 'xl:border-r xl:border-black' : ''}`}>
                        <img className="adventure_img" src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.image}?token=`} alt={item.name} />
                        <div className='flex flex-col gap-4  w-full px-4'>
                            <h3 className="adventure_title">{item[`title_${currentLocale}`]}</h3>
                            <p className="text-black text-md font-futura leading-6 tracking-tight" dangerouslySetInnerHTML={{ __html: item[`desc_${currentLocale}`] }}></p>
                            <p className="text-primary text-xs  leading-none font-futura font-bold"> £{item.price}</p>
                            <button className='green_button w-[200px] absolute bottom-4 right-4' onClick={() => addToCart(item)}>Request a reservation</button>
                        </div>
                    </div>
                ))}
                {notification && <CartNotification productName={actualProduct[`title_${currentLocale}`]} productImage={`${backendUrl}/api/files/${actualProduct.collectionId}/${actualProduct.id}/${actualProduct.image}?token=`} productVariant={actualProduct.Variant} />}
            </div>
        </div>
    );
};

export default TabCartItem;