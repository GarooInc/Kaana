"use client";
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { useCart } from '@/contexts/CartContext';
import CartNotification from '@/components/CartNotification/CartNotification';

const Menu = () => {
    const [food, setFood] = useState([]);
    const [notification, setNotification] = useState(false);
    const [actualProduct, setActualProduct] = useState({});
    const [prices, setPrices] = useState({}); 
    const [selectedVariants, setSelectedVariants] = useState({});
    const { dispatch } = useCart();

    const pb = new PocketBase('https://kaana.garooinc.com/kaana');
    pb.autoCancellation(false);

    const selectVariant = (e, itemId) => {
        const selectedValue = e.target.value;
        setPrices(prevPrices => ({
            ...prevPrices,
            [itemId]: selectedValue,
        }));
        setSelectedVariants(prevVariants => ({
            ...prevVariants,
            [itemId]: e.target.selectedOptions[0].text,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection('Room_Service').getFullList({
                    sort: '-created',
                });
                console.log(records);
                setFood(records);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const addToCart = (item) => {
        const updatedItem = {
            ...item,
            Variant: selectedVariants[item.id],
            Price: prices[item.id] || item.Price,
        };
        dispatch({ type: 'ADD_ITEM', payload: updatedItem });
        setNotification(true);
        setActualProduct(updatedItem);
        setTimeout(() => {
            setNotification(false);
        }, 3000);
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 grid-flow-row-dense auto-rows-fr md:py-20 pb-40 pt-10 px-10">
            {food.map((item, index) => (
                <div key={index} className="bg-white flex flex-col justify-between h-full p-2">
                <img className="w-full h-40 object-cover" src={`https://kaana.garooinc.com/kaana/api/files/${item.collectionId}/${item.id}/${item.Image}?token=`} alt={item.name} />
                <h3 className="text-black text-base leading-tight font-futura mt-2">{item.Title}</h3>
                <p className="text-black text-xs font-[futura light] leading-none">{item.Description}</p>
                <div className="flex-1 flex flex-col justify-between">
                    {item.Variants ? (
                    <div className='flex flex-col mt-2'>
                        <label className="text-sm font-futura text-black">Variants</label>
                        <select className="bg-white font-futura text-xs" onChange={(e) => selectVariant(e, item.id)}>
                        {Object.entries(item.Variants).map(([key, value]) => (
                            <option key={key} value={value}>{`${key} - £${value}`}</option>
                        ))}
                        </select>
                    </div>
                    ) : <div className="h-10"></div>}
                    <div className='w-full h-[1px] bg-black mt-2'></div>
                    <div className='flex gap-2 justify-between items-center'>
                    <p className="text-lightgray text-xs font-light leading-none font-futura">£{prices[item.id] || item.Price}</p>
                    <button className="quaternary_button" onClick={() => addToCart(item)}>Add to cart</button>
                    </div>
                </div>
                </div>
            ))}
  {notification && <CartNotification productName={actualProduct.Title} productImage={`https://kaana.garooinc.com/kaana/api/files/${actualProduct.collectionId}/${actualProduct.id}/${actualProduct.Image}?token=`} productVariant={actualProduct.Variant} />}
</div>

    );
};

export default Menu
