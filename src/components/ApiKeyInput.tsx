import { useRunwareApiKey } from "@/services/imageService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const ApiKeyInput = () => {
  const { apiKey, updateApiKey } = useRunwareApiKey();
  const [inputValue, setInputValue] = useState(apiKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateApiKey(inputValue);
    toast.success("API key saved successfully!");
  };

  if (apiKey) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="password"
          placeholder="Enter Runware API Key"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-64"
        />
        <Button type="submit">Save Key</Button>
      </form>
      <p className="text-xs text-gray-500 mt-2">
        Get your API key from{" "}
        <a
          href="https://runware.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Runware.ai
        </a>
      </p>
    </div>
  );
};