import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (weight && height) {
      const weightInKg = parseFloat(weight);
      const heightInM = parseFloat(height) / 100;
      const calculatedBMI = weightInKg / (heightInM * heightInM);
      setBmi(parseFloat(calculatedBMI.toFixed(1)));

      // Determine BMI category
      if (calculatedBMI < 18.5) setCategory("Underweight");
      else if (calculatedBMI < 25) setCategory("Normal weight");
      else if (calculatedBMI < 30) setCategory("Overweight");
      else setCategory("Obese");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kilograms"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in centimeters"
          />
        </div>
        <Button onClick={calculateBMI} className="w-full">Calculate BMI</Button>
        {bmi !== null && (
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-[#F2FCE2]">
              <p className="text-lg font-semibold text-[#0EA5E9]">Your BMI:</p>
              <p className="text-md font-medium text-[#1A1F2C]">{bmi}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-[#D3E4FD]">
              <p className="text-lg font-semibold text-[#0EA5E9]">Category:</p>
              <p className="text-md font-medium text-[#1A1F2C]">{category}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}