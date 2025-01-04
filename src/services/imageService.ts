import { RunwareService, GenerateImageParams } from "@/lib/runware";

// Note: In production, this should be handled securely through environment variables
const TEMP_API_KEY = ""; // User needs to provide their Runware API key

export const generateMedicalImage = async (prompt: string) => {
  if (!TEMP_API_KEY) {
    console.error("Please provide a Runware API key");
    return null;
  }

  const runware = new RunwareService(TEMP_API_KEY);
  
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