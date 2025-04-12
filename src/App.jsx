import React, { useState } from "react";
import axios from "axios";
import { DocumentUpload } from "./components/documentUpload/index";
import MatchingTable from "./components/matchingtable/index";
import { ThreeDots } from 'react-loader-spinner'

const App = () => {

  const [matchingResult, setMatchingResult] = useState(null);
 const [data, setData]= useState(null);
 const [loading,setLoading]= useState(false);

  const getRowColor = (status) => {
    switch (status) {
      case "match":
        return "bg-green-100";
      case "partial":
        return "bg-yellow-100";
      case "mismatch":
        return "bg-red-100";
      default:
        return "";
    }
  };

 const sampleData = {
    "matchedCount": 2,
    "totalCount": 3,
    "items": [
      {
        "itemCode": "A1001",
        "po": {
          "quantity": 100,
          "unitPrice": 50.00,
          "totalAmount": 5000.00
        },
        "invoice": {
          "quantity": 100,
          "unitPrice": 50.00,
          "totalAmount": 5000.00
        },
        "grn": {
          "quantity": 100,
          "unitPrice": 50.00,
          "totalAmount": 5000.00
        },
        "status": "match"
      },
      {
        "itemCode": "A1002",
        "po": {
          "quantity": 200,
          "unitPrice": 2.50,
          "totalAmount": 500.00
        },
        "invoice": {
          "quantity": 200,
          "unitPrice": 2.55,
          "totalAmount": 510.00
        },
        "grn": {
          "quantity": 190,
          "unitPrice": 2.50,
          "totalAmount": 475.00
        },
        "status": "mismatch"
      },
      {
        "itemCode": "A1003",
        "po": {
          "quantity": 50,
          "unitPrice": 3.00,
          "totalAmount": 150.00
        },
        "invoice": {
          "quantity": 50,
          "unitPrice": 3.00,
          "totalAmount": 150.00
        },
        "grn": {
          "quantity": 50,
          "unitPrice": 3.00,
          "totalAmount": 150.00
        },
        "status": "match"
      }
    ]
  }

// if(loading){
//   return (
//     <>
//     <div className="flex w-[100vw] h-[100vh] justify-center items-center">
//     <ThreeDots/>
//     </div>
      
//     </>
//   )
// }
  return (
    <div className=" w-[100%] bg-gray-50 p-6">
      <div className="max-[100%] mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">3-Way Document Matching</h1>


        <div className="mb-8">
          <DocumentUpload setData={setData} setLoading={setLoading}/>
        </div>
{loading ? <>
  <div className="flex justify-center items-center">
    <ThreeDots/>
    </div>
</>:
<>
<MatchingTable sampleData={data}/>
</>}
    

      </div>
    </div>
  );
};

export default App;