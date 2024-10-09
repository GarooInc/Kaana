"use client"
import React, {useState, useEffect} from 'react'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from "next/navigation"
import { CgArrowLongRight } from 'react-icons/cg'
import { TfiClose } from "react-icons/tfi"


const CartItem = ({showCart}) => {
    const { state } = useCart()
    const { dispatch } = useCart()
    const router = useRouter()

    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({
        phone : '',
        family : '',
        room : '',
    })
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onHandleSubmit = async (event) => {
        console.log(form)
        console.log(state.items)

        const items = state.items.map(item => ({
            "itemName" : item.Title,
            "variant" : item.Variant,
            "price" : parseFloat(item.Price),
            "quantity" : item.quantity

        }))

        event.preventDefault()
        const response = await fetch('https://garoo-hotel-orders.koyeb.app/kaana/api/v1/orders',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contact: form.phone,
                family: form.family,
                room: parseInt(form.room, 10),
                items: items
            })
        })

        if(response.ok){
            console.log('Order created')
            setMessage('Order created successfully')
            dispatch({ type: 'LOAD_ITEMS', payload: [] })
            setShowForm(false)
        }
            else {
                setMessage('Error creating order')
                console.log('Error')
            }
        }

        const onHandleClose = () => {
            setShowForm(false)
            router.push('/roomservice')
        }

        const handleCheckout = () => {
            setShowForm(true)
        }





    return (
        <div className="bg-secondary w-80 md:w-[400px] md:p-10 py-10 px-4 h-screen">
            <div className="flex justify-between items-center">
                <img src="/assets/images/room_service/cart.png" alt="logo" className="w-[50px]" />
                <button onClick={() => showCart(false)}><TfiClose className="text-black text-2xl" /></button>
            </div>
            {state.items.length > 0 ? (
                <ul className='py-10 flex flex-col overscroll-y-auto'>
                    {state.items.map((item, index) => (
                        <li key={index} className='px-2 pb-12  gap-2 flex relative'>
                            <button className=" justify-start items-center text-xs inline-flex font-futura bg-transparent text-black px-2 py-1 absolute right-2 border border-black" onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item })}>X</button>
                            <img className="md:w-40 w-32 md:h-32 h-40 object-cover" src={`https://kaana.garooinc.com/kaana/api/files/${item.collectionId}/${item.id}/${item.Image}?token=`} alt={item.name} />
                            <div className='flex flex-col justify-between'>
                                <h3 className="text-black text-base leading-tight font-futura mt-2  w-full gap-4 flex flex-col">{item.Title} <span className='text-secondary'>£{item.Price}</span></h3>
                                {
                                    item.variant && (
                                        <p className='text-gray text-xs font-futura leading-none'>Variant: {item.Variant}</p>
                                    )
                                }
                                <div className="flex justify-between items-center">
                                    <div className="flex justify-between items-center shadow-xl w-full border border-black">
                                            <button className=" shadow justify-start items-center text-xs inline-flex font-futura  text-secondary px-2 py-1" onClick={() => dispatch({ type: 'DECREASE_ITEM', payload: item })}>-</button>
                                            <p className="text-black text-xs font-futura leading-none px-4">{item.quantity}</p>
                                            <button className=" shadow justify-start items-center text-xs inline-flex font-futura text-secondary px-2 py-1" onClick={() => dispatch({ type: 'INCREASE_ITEM', payload: item })}>+</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center font-futura'>Your cart is empty</p>
            )}
            {state.items.length > 0 && (
                <button className="text-primary fixed bottom-4 right-4 font-futura flex gap-2 justify-center items-center" onClick={handleCheckout}>Checkout <CgArrowLongRight className="text-primary text-2xl" /></button>
            )}
            {
                showForm && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-secondary p-6 w-80">
                            <div className="flex justify-end">
                                <button onClick={() => setShowForm(false)}><TfiClose className="text-black text-2xl" /></button>
                            </div>
                            <form className="flex flex-col gap-4 mt-4">
                                <input type="text" placeholder="Phone" className=" input_cart" onChange={handleChange} name="phone" />
                                <input type="text" placeholder="Family" className="input_cart" onChange={handleChange} name="family" />
                                <input type="text" placeholder="Room" className="input_cart" onChange={handleChange} name="room" />
                                <button className="text-quaternary uppercase p-2 font-futura" onClick={(e) => onHandleSubmit(e)}>Submit</button>
                            </form>
                        </div>
                    </div>
                )
            }
            {
                message && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg p-6 w-80 flex flex-col justify-center items-center relative">
                            <button onClick={() => onHandleClose()}><TfiClose className="text-black text-2xl absolute top-2 right-2" /></button>
                            <p className="text-black text-base font-futura leading-tight">{message}</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default CartItem