import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function RewardsTab() {
  const { toast } = useToast();
  
  // In a real application, these would come from your backend
  const stats = {
    transactions: [
      { type: 'appointment', amount: 1000, date: '2024-03-15' },
      { type: 'subscription', amount: 2000, date: '2024-03-10' },
    ]
  };

  // Calculate total rewards
  const totalSpent = stats.transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const calculatedRewards = Math.floor(totalSpent * 0.1);

  const handleRedeemPoints = () => {
    toast({
      title: "Reward Points",
      description: `Your reward points (₹${calculatedRewards}) can be redeemed during your next appointment booking.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Available Points</h3>
          <p className="text-2xl font-bold">₹{calculatedRewards}</p>
        </div>
        <Button onClick={handleRedeemPoints}>Redeem Points</Button>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Recent Transactions</h4>
        <div className="space-y-2">
          {stats.transactions.map((transaction, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="capitalize">{transaction.type}</span>
              <span>₹{transaction.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}