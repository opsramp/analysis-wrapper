import { createContext } from "react";

const AnalysisContext = createContext({
    analysis: null,
    setAnalysis: () => { }
});

export default AnalysisContext;
