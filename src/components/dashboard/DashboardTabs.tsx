import { Clock, History, FileText, Gift, Calculator, Stethoscope, Plus, Minus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AppointmentList from "./AppointmentList";
import MedicalRecords from "./MedicalRecords";
import HealthCalculators from "./calculators/HealthCalculators";
import MedicalHistoryForm from "./MedicalHistoryForm";

export function DashboardTabs() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { toast } = useToast();

  // In a real application, these would come from your backend
  const stats = {
    transactions: [
      { type: 'appointment', amount: 1000, date: '2024-03-15' },
      { type: 'subscription', amount: 2000, date: '2024-03-10' },
    ]
  };

  const handleSectionClick = (section: string) => {
    setOpenSection(openSection === section ? null : section);
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
    <Tabs defaultValue="appointments" orientation="vertical" className="w-full">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-2">
          {/* Appointments Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="appointments" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
                onClick={() => handleSectionClick('appointments')}
              >
                <Clock className="h-5 w-5 mr-3" />
                Appointments
                {openSection === 'appointments' ? (
                  <Minus className="h-4 w-4 ml-auto" />
                ) : (
                  <Plus className="h-4 w-4 ml-auto" />
                )}
              </TabsTrigger>
            </TabsList>
            {openSection === 'appointments' && (
              <TabsContent value="appointments" className="bg-white rounded-lg p-4 shadow-lg mb-2">
                <AppointmentList type="upcoming" />
              </TabsContent>
            )}
          </div>

          {/* History Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="history" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
                onClick={() => handleSectionClick('history')}
              >
                <History className="h-5 w-5 mr-3" />
                History
                {openSection === 'history' ? (
                  <Minus className="h-4 w-4 ml-auto" />
                ) : (
                  <Plus className="h-4 w-4 ml-auto" />
                )}
              </TabsTrigger>
            </TabsList>
            {openSection === 'history' && (
              <TabsContent value="history" className="bg-white rounded-lg p-4 shadow-lg mb-2">
                <AppointmentList type="past" />
              </TabsContent>
            )}
          </div>

          {/* Medical Records Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="records" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
                onClick={() => handleSectionClick('records')}
              >
                <FileText className="h-5 w-5 mr-3" />
                Medical Records
                {openSection === 'records' ? (
                  <Minus className="h-4 w-4 ml-auto" />
                ) : (
                  <Plus className="h-4 w-4 ml-auto" />
                )}
              </TabsTrigger>
            </TabsList>
            {openSection === 'records' && (
              <TabsContent value="records" className="bg-white rounded-lg p-4 shadow-lg mb-2">
                <MedicalRecords />
              </TabsContent>
            )}
          </div>

          {/* Medical History Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="medical-history" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
                onClick={() => handleSectionClick('medical-history')}
              >
                <Stethoscope className="h-5 w-5 mr-3" />
                Medical History
                {openSection === 'medical-history' ? (
                  <Minus className="h-4 w-4 ml-auto" />
                ) : (
                  <Plus className="h-4 w-4 ml-auto" />
                )}
              </TabsTrigger>
            </TabsList>
            {openSection === 'medical-history' && (
              <TabsContent value="medical-history" className="bg-white rounded-lg p-4 shadow-lg mb-2">
                <MedicalHistoryForm />
              </TabsContent>
            )}
          </div>

          {/* Rewards Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="rewards" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
                onClick={() => handleSectionClick('rewards')}
              >
                <Gift className="h-5 w-5 mr-3" />
                Rewards
                {openSection === 'rewards' ? (
                  <Minus className="h-4 w-4 ml-auto" />
                ) : (
                  <Plus className="h-4 w-4 ml-auto" />
                )}
              </TabsTrigger>
            </TabsList>
            {openSection === 'rewards' && (
              <TabsContent value="rewards" className="bg-white rounded-lg p-4 shadow-lg mb-2">
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
              </TabsContent>
            )}
          </div>

          {/* Health Calculators Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="calculators" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
                onClick={() => handleSectionClick('calculators')}
              >
                <Calculator className="h-5 w-5 mr-3" />
                Health Calculators
                {openSection === 'calculators' ? (
                  <Minus className="h-4 w-4 ml-auto" />
                ) : (
                  <Plus className="h-4 w-4 ml-auto" />
                )}
              </TabsTrigger>
            </TabsList>
            {openSection === 'calculators' && (
              <TabsContent value="calculators" className="bg-white rounded-lg p-4 shadow-lg mb-2">
                <HealthCalculators />
              </TabsContent>
            )}
          </div>
        </div>
      </div>
    </Tabs>
  );
}