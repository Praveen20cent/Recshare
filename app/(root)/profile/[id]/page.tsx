import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { dummyCards } from "@/constants";
import { JSX } from "react";


const page = async({params}: ParamsWithSearch ) => {
    const { id } = await params;
  return (
    <div className="wrapper page">
        
        <Header title="Praveen K" subHeader="kpraveen2954@gmail.com" userImg="/assets/images/dummy.jpg"/>
        <section className="video-grid">
        {dummyCards.map((card: JSX.IntrinsicAttributes & VideoCardProps) => (
        <VideoCard key={card.id} {...card} />
      ))}
        </section>
        
        </div>
  )
}

export default page