import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getContract } from '@/utils/contract';

export default function CampaignSection() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const contract = await getContract();
        const count = await contract.nextOrderId();
        
        const campaignsData = [];
        for (let i = 0; i < count; i++) {
          const campaign = await contract.showCampaign(i);
          campaignsData.push({
            id: i,
            goal: campaign.goal,
            creator: campaign.creator,
            balance: ethers.formatEther(campaign.balance),
            isActive: campaign.isActive,
            deadline: new Date(Number(campaign.deadlineDuration) * 1000)
          });
        }
        
        setCampaigns(campaignsData);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Failed to load campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <div className="text-center py-8">Loading campaigns...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <section className="py-6 p-10">
      <div className="p-10 w-full min-h-screen rounded-xl bg-white">
        <h1 className="text-2xl text-black text-center mb-8">Campaigns</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {campaigns.map((campaign) => (
            <div key={campaign.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-500">Campaign Image</span>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-black">{campaign.goal}</h3>
                
                <div className="space-y-2 text-sm">
                  
                  
                  <p>
                    <span className="font-semibold text-black">Balance:</span> 
                    <span className="text-gray-600 ml-2">{campaign.balance} ETH</span>
                  </p>
                  
                  <p>
                    <span className="font-semibold text-black">Status:</span> 
                    <span className={`ml-2 ${campaign.isActive ? 'text-green-500' : 'text-red-500'}`}>
                      {campaign.isActive ? 'Active' : 'Ended'}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold text-black">Deadline:</span> 
                    <span className="text-gray-600 ml-2">
                      {campaign.deadline.toLocaleDateString()}
                    </span>
                      </p>
                    </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}