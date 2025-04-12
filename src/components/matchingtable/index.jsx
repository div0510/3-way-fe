import React, {useEffect} from "react";
import matched from '../../assets/match.png';
import mismatched from '../../assets/mismatch.png';
import {useState} from "react";

const getRowClass = (status) => {

    switch (status) {
        case "match":
            return "bg-green-300";
        case "partial":
            return "bg-yellow-300";
        case "mismatch":
            return "bg-red-300";
        default:
            return "";
    }
};

const MatchingTable = ({sampleData}) => {
    const [totalMatch, setTotalMatch] = React.useState(0);

    useEffect(() => {
        if (sampleData) {
            sampleData.items?.map((data) => {
                if (data.status == "match") {
                    setTotalMatch((prev) => {
                        return prev + 1
                    })
                }
            })
        }
    }, [])
    return (
        <div className="p-6">
            {sampleData &&
                <div className="w-full mb-4 rounded-lg bg-white shadow-md border border-gray-300 py-4 text-center">
                    <p className="text-xl font-semibold text-gray-800">
                        {totalMatch} out of {sampleData.totalCount} items matched
                    </p>
                </div>
            }

            <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-300">
                <table className="min-w-full table-auto text-sm">
                    <thead className="bg-gray-200 text-gray-700 text-center sticky top-0 z-10">
                    <tr>
                        <th rowSpan="2" className="border px-4 py-2 align-middle">Item Code / Description</th>
                        <th colSpan="3" className="border px-4 py-2">PO</th>
                        <th colSpan="3" className="border px-4 py-2">Invoice</th>
                        <th colSpan="3" className="border px-4 py-2">GRN</th>
                        <th rowSpan="2" className="border px-4 py-2 align-middle">Result</th>
                    </tr>
                    <tr>
                        <th className="border px-4 py-2">Qty</th>
                        <th className="border px-4 py-2">Unit Price</th>
                        <th className="border px-4 py-2">Total</th>
                        <th className="border px-4 py-2">Qty</th>
                        <th className="border px-4 py-2">Unit Price</th>
                        <th className="border px-4 py-2">Total</th>
                        <th className="border px-4 py-2">Qty</th>
                        <th className="border px-4 py-2">Unit Price</th>
                        <th className="border px-4 py-2">Total</th>
                    </tr>
                    </thead>
                    <tbody className="text-center text-gray-800">
                    {sampleData?.items?.map((item, idx) => (
                        <tr key={idx} className={`${getRowClass(item.status)} transition-all`}>
                            <td className="border px-4 py-2 font-medium text-blue-800">{item.itemCode}</td>

                            {/* PO */}
                            <td className="border px-4 py-2">{item.po.quantity}</td>
                            <td className="border px-4 py-2">${item.po.unitPrice.toFixed(2)}</td>
                            <td className="border px-4 py-2">${item.po.totalAmount.toFixed(2)}</td>

                            {/* Invoice */}
                            <td className="border px-4 py-2">{item.invoice.quantity}</td>
                            <td className="border px-4 py-2">${item.invoice.unitPrice.toFixed(2)}</td>
                            <td className="border px-4 py-2">${item.invoice.totalAmount.toFixed(2)}</td>

                            {/* GRN */}
                            <td className="border px-4 py-2">{item.grn.quantity}</td>
                            <td className="border px-4 py-2">${item.grn.unitPrice.toFixed(2)}</td>
                            <td className="border px-4 py-2">${item.grn.totalAmount.toFixed(2)}</td>

                            {/* Status */}
                            <td className="border px-4 py-2">
                                {item.status === "match" || item.status === "partial" ? <p>✅</p> : <p>❌</p>}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MatchingTable;