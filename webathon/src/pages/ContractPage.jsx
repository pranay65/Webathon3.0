import { useState } from "react";
import { Check, FileText, AlertCircle, Award } from "lucide-react";
import Navbar from "../Components/Navbar";

const ContractPage = () => {
  const [contract, setContract] = useState({
    project: "AI Resume Builder",
    buyer: "Sai Charan",
    seller: "John Doe",
    amount: 1000,
    terms:
      "Seller will deliver a complete AI-based resume builder within 10 days. Buyer is entitled to 2 revisions post-delivery.",
    buyerSigned: false,
    sellerSigned: false,
    status: "Awaiting Signatures",
  });

  const [buyerName, setBuyerName] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSign = (role) => {
    const updated = { ...contract };

    if (role === "buyer" && !updated.buyerSigned) {
      updated.buyerSigned = true;
    }

    if (role === "seller" && !updated.sellerSigned) {
      updated.sellerSigned = true;
    }

    if (
      updated.buyerSigned &&
      updated.sellerSigned &&
      updated.status !== "Active"
    ) {
      updated.status = "Active";
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }

    setContract(updated);
  };

  const getStatusColor = () => {
    switch (contract.status) {
      case "Active":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Awaiting Signatures":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = () => {
    switch (contract.status) {
      case "Active":
        return <Award className="w-5 h-5" />;
      case "Awaiting Signatures":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-gray-800 z-50">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl mt-16">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <FileText className="text-indigo-600 w-8 h-8" />
            <h1 className="text-3xl font-bold text-gray-900">
              Freelance Contract
            </h1>
          </div>

          <div
            className={`flex items-center justify-between p-4 mb-6 rounded-lg border ${getStatusColor()}`}
          >
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span className="font-medium">Status: {contract.status}</span>
            </div>
            <div className="text-right">
              <span className="font-bold">${contract.amount}</span>
              <span className="text-gray-500 text-sm ml-1">USD</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
              <h3 className="text-lg font-medium mb-2 text-gray-700">
                Project Details
              </h3>
              <p className="mb-2">
                <span className="font-medium text-gray-500">Project:</span>{" "}
                {contract.project}
              </p>
              <p>
                <span className="font-medium text-gray-500">Buyer:</span>{" "}
                {contract.buyer}
              </p>
              <p>
                <span className="font-medium text-gray-500">Seller:</span>{" "}
                {contract.seller}
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition-colors">
              <h3 className="text-lg font-medium mb-2 text-indigo-700">
                Contract Terms
              </h3>
              <p className="text-gray-700">{contract.terms}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div
              className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                contract.buyerSigned
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Buyer Signature</h3>
                {contract.buyerSigned && (
                  <Check className="text-green-500 w-6 h-6" />
                )}
              </div>

              <input
                type="text"
                className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all"
                placeholder="Enter Buyer's Full Name"
                value={buyerName}
                disabled={contract.buyerSigned}
                onChange={(e) => setBuyerName(e.target.value)}
              />

              <button
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  contract.buyerSigned
                    ? "bg-green-100 text-green-700 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                }`}
                onClick={() => handleSign("buyer")}
                disabled={contract.buyerSigned || buyerName.trim() === ""}
              >
                {contract.buyerSigned ? "Signed ✓" : "Sign as Buyer"}
              </button>
            </div>

            <div
              className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                contract.sellerSigned
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Seller Signature</h3>
                {contract.sellerSigned && (
                  <Check className="text-green-500 w-6 h-6" />
                )}
              </div>

              <input
                type="text"
                className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all"
                placeholder="Enter Seller's Full Name"
                value={sellerName}
                disabled={contract.sellerSigned}
                onChange={(e) => setSellerName(e.target.value)}
              />

              <button
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  contract.sellerSigned
                    ? "bg-green-100 text-green-700 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                }`}
                onClick={() => handleSign("seller")}
                disabled={contract.sellerSigned || sellerName.trim() === ""}
              >
                {contract.sellerSigned ? "Signed ✓" : "Sign as Seller"}
              </button>
            </div>
          </div>

          {showSuccess && (
            <div className="p-4 bg-green-100 text-green-800 rounded-lg border border-green-200 flex items-center gap-2 animate-pulse">
              <Check className="w-5 h-5" />
              <span>
                Contract successfully activated! Both parties have signed.
              </span>
            </div>
          )}

          {contract.status === "Active" && !showSuccess && (
            <div className="p-4 bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-200 flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>
                Contract is active and legally binding as of{" "}
                {new Date().toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContractPage;
