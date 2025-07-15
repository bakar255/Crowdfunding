import Image from "next/image";
import {  getContract } from '../utils/contract'; 
import { Geist, Geist_Mono } from "next/font/google";
import CampaignApp from "../utils/CampaignApp";
import { ethers } from "ethers";
import { CampaignList } from "./MainCampaign"



export default function Home() {

  return (
    <div className="bg-[#15161a] ">
      <main className="flex flex-col ">
       <CampaignApp />
         <div className="">
         </div>
      </main>
      <footer className=" justify-center">
        <CampaignList/>

      </footer>
    </div>
  );
}
