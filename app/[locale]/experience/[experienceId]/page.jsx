"use client";
import React, { useState, useEffect } from 'react'
import PocketBase from 'pocketbase'
import { IoIosArrowDropleft } from "react-icons/io"
import { useRouter } from "next/navigation"
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import FooterItem from '@/components/FooterItem/FooterItem'

const ExperiencePage = ({params}) => {
    const [experience, setExperience] = useState('')
    const router = useRouter()

    const pb = new PocketBase('https://kaana.garooinc.com/kaana')
    pb.autoCancellation(false)

    const current = params.experienceId
    console.log(current)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const record = await pb.collection('Experiences').getOne(current)
                setExperience(record);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData()
    }, [params.postId])

    const handleTitle = ({title}) => {
        const words = title.split(' ')
        const lastWord = words.pop()
        const firstPart = words.join(' ')
        return { firstPart, lastWord }
    }


  return (
    <div className="page md:bg-white bg-secondary">
        {
            console.log(experience.title)
        }
        <div className='flex flex-col justify-center items-center w-full relative'>
            <HeaderItem v={"v4"} nav={'/experiences'} />
            <div className='flex flex-col justify-center items-center w-full'>
                <div className='md:flex flex-col md:flex-row justify-center w-full items-stretch'>
                    <div className='md:w-1/2'>
                        <img className="w-full object-cover" src={`https://kaana.garooinc.com/kaana/api/files/${experience.collectionId}/${experience.id}/${experience.image}?token=`} alt={experience.name} />
                    </div>
                    <div className='p-10 bg-secondary md:min-h-full md:w-1/2 flex flex-col justify-center'>
                        <h1 className="text-2xl md:text-4xl text-start text-primary font-tiempos italic">{experience.title}</h1>
                        <div className="text-black md:px-0 gap-4 flex flex-col experiences" dangerouslySetInnerHTML={{ __html: experience.description }}></div>
                    </div>
                </div>
            </div>
        </div>
        <div className='md:flex hidden justify-center items-center'>
            <FooterItem />
        </div>
    </div>

  )
}

export default ExperiencePage