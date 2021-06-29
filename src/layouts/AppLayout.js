import React, { useEffect, useContext } from "react"

import AnalysisWrapper from "./AnalysisWrapper"
import AnalysisContext from '../AnalysisContext';
import { API_URL } from "config"

const AppLayout = () => {
  const { analysis, setAnalysis } = useContext(AnalysisContext);

  // useEffect(() => {
  //   const analysisId = '900065f2-12d9-4cee-874d-e246f1e4a67f';
  //   const url = `${API_URL}/analyses/${analysisId}/`;

  //   fetch(url)
  //     .then((res) => res.json())
  //     .then(
  //       (response) => {
  //         setAnalysis(response)
  //       },
  //       (error) => {
  //         console.log(error)
  //       }
  //     )
  // }, []);

  return (
    <div
      className="c-default-layout h-100"
      style={{ width: 320, marginTop: 30, marginLeft: 20 }}
    >
      <div className="c-wrapper h-100">
        <div className="row h-100" style={{ minHeight: "100vh" }}>
          <div className="col-12">
            <AnalysisWrapper />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
