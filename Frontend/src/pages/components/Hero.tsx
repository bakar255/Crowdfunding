import CampaignList from "@/utils/Campaign"
import CampaignSection from "./campagneSection"

export default function Hero() {

    return (
        <div className="min-h-screen overflow-auto">
           <section className="py-12">
        <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      <div className="max-w-lg p-6">

        <div className="flex flex-col space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Start raising <span className="bg-amber-500 bg-clip-text text-transparent">funds</span> from here !
          </h1>
          
          <p className="text-xl text-gray-800">
            Launch a campaign from anywhere in the world and start raising money through our blockchain-based system.
          </p>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-[#3a3a3a]">How it works:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <span className="text-[#3a3a3a]">Set your fundraising goal</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <span className="text-[#3a3a3a]">Choose campaign duration</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <span className="text-[#3a3a3a]">Receive donations in crypto</span>
              </li>
            </ul>
                </div>
                </div>
            </div>
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Create New Campaign</h2>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="goal" className="block text-sm font-medium mb-1 text-gray-600">Fundraising Goal (ETH)</label>
            <input  type="number" id="goal"
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              placeholder="0.1"
              step="0.01"
              min="0.01"
              required
            />
          </div>
          
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Campaign Duration</label>
            <select
              id="duration"  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              required>
              <option value="">Select days</option>
              <option value="1">1 Day</option>
              <option value="2">2 Days</option>
              <option value="3">3 Days</option>
            </select>
          </div>
          
          <button
            className="w-full cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200" >     Launch Campaign
          </button>
                </form>
            </div>
            </div>
        </div>
        </section>

        <section className="py-6 p-10">
            <div className=" p-10 w-full min-h-screen z-50 rounded-xl bg-white ">
                <CampaignSection />

         

            </div>
        </section>
            
        </div>
    )
}