import React, {useState} from "react";
import {DocumentUpload} from "./components/documentUpload/index";
import MatchingTable from "./components/matchingtable/index";
import {ThreeDots} from 'react-loader-spinner'

const App = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    return (<div className=" w-[100%] bg-gray-50 p-6">
        <div className="max-[100%] mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">3-Way Document Matching</h1>
            <div className="mb-8">
                <DocumentUpload setData={setData} setLoading={setLoading}/>
            </div>
            {loading ? <div className="flex justify-center items-center"><ThreeDots/></div> :
                <MatchingTable sampleData={data}/>}
        </div>
    </div>);
};

export default App;