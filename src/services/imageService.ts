import { RunwareService, GenerateImageParams } from "@/lib/runware";
import { useState, useEffect } from "react";

let globalApiKey = "";

// Create a custom hook to manage the API key
export const useRunwareApiKey = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const storedKey = localStorage.getItem("runware_api_key");
    if (storedKey) {
      globalApiKey = storedKey;
      setApiKey(storedKey);
    }
  }, []);

  const updateApiKey = (newKey: string) => {
    globalApiKey = newKey;
    localStorage.setItem("runware_api_key", newKey);
    setApiKey(newKey);
  };

  return { apiKey, updateApiKey };
};

export const generateMedicalImage = async (prompt: string) => {
  if (!globalApiKey) {
    console.error("Please provide a Runware API key");
    return null;
  }

  const runware = new RunwareService(globalApiKey);
  
  const params: GenerateImageParams = {
    positivePrompt: prompt,
    model: "runware:100@1",
    numberResults: 1,
    outputFormat: "WEBP",
    CFGScale: 7.5,
    strength: 0.9
  };

  try {
    const result = await runware.generateImage(params);
    return result.imageURL;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};