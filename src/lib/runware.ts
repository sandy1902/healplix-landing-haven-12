export interface GenerateImageParams {
  positivePrompt: string;
  model?: string;
  numberResults?: number;
  outputFormat?: string;
  CFGScale?: number;
  scheduler?: string;
  strength?: number;
  promptWeighting?: "compel" | "sdEmbeds";
  seed?: number | null;
  lora?: string[];
}

export interface GeneratedImage {
  imageURL: string;
  positivePrompt: string;
  seed: number;
  NSFWContent: boolean;
}

export class RunwareService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateImage(params: GenerateImageParams): Promise<GeneratedImage> {
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          taskType: "authentication",
          apiKey: this.apiKey
        },
        {
          taskType: "imageInference",
          taskUUID: crypto.randomUUID(),
          model: params.model || "runware:100@1",
          width: 1024,
          height: 1024,
          numberResults: params.numberResults || 1,
          outputFormat: params.outputFormat || "WEBP",
          steps: 4,
          CFGScale: params.CFGScale || 1,
          scheduler: params.scheduler || "FlowMatchEulerDiscreteScheduler",
          strength: params.strength || 0.8,
          lora: params.lora || [],
          ...params,
        }
      ])
    });

    const data = await response.json();
    
    if (data.error || data.errors) {
      throw new Error(data.errorMessage || data.errors?.[0]?.message || "Failed to generate image");
    }

    const result = data.data[1];
    return {
      imageURL: result.imageURL,
      positivePrompt: result.positivePrompt,
      seed: result.seed,
      NSFWContent: result.NSFWContent
    };
  }
}