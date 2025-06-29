import React from 'react'
import Header from '@/components/Header'
import VideoCard from '@/components/VideoCard'
import { dummyCards } from '@/constants'

const Page = () => {
  return (
    <main className="wrapper page">
      <Header title="All videos" subHeader="Public library" />
      <h1 className="text-2xl font-karla">Welcome to Loom clone</h1>
      <section className="video-grid">
         {dummyCards.map((card) => (
        <VideoCard key={card.id} {...card} />
      ))}
      </section>
      
      
    </main>
  )
}

export default Page