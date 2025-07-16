import Image from "next/image";
import {  getContract } from '../utils/contract'; 
import { Geist, Geist_Mono } from "next/font/google";
import  { createCampaign } from "../utils/CampaignApp";
import { ethers } from "ethers";



export default function Home() {


  return (
    <div className="">
      <p className="text-white-500">TEXT WHITE</p>
      <main className="flex flex-col ">
         <div className="">
                <button className="bg-amber-500"></button>
                <createCampaign/>
         </div>
      </main>
      <footer className=" justify-center">
      </footer>
    </div>
  );
}
