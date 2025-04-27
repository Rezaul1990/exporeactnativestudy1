import { combinedData } from "./combinedData";

export interface CombinedDataState {
    combinedData: combinedData | null;
    setCombinedData: (data: combinedData) => void;
    resetCombinedData: () => void;  // Add function to reset combined data
  }