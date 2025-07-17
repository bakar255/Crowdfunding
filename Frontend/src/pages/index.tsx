import { getContract } from "@/utils/contract";
import  CampaignApp  from "@utils/Campaign";
import { createCampaign } from '@utils/CampaignAction'
import { dataLength, ethers } from "ethers";
import { addListener } from "process";

export default function Home() {
  
  const handleClick = async () => {
  try {
    const txHash = await createCampaign("Help people in Gaza", 3); // "100" au lieu de 100
    console.log("Transaction hash:", txHash);
  } catch (error) {
    alert(`Erreur: ${error.message}`);
  }
};

  return (
    <div className="">
      <nav>

      </nav>
      <main className="flex flex-col ">
         <div className="">
             <button className="bg-gray-600 rounded-lg " onClick={ handleClick}>create Campaign</button>
         </div>
      </main>
      <footer className=" justify-center">
      </footer>
    </div>
  );
}
