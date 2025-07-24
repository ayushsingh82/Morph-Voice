import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {publicClient, walletClient} from './config'
import { wagmiAbi } from './abi';
import {useAccount} from 'wagmi'
import html2pdf from 'html2pdf.js';

const CreateInvoice = () => {

  const {address} = useAccount()

 const [formData, setFormData] = useState({
   recipient:'',
   amount:'',
 })

 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const [success, setSuccess] = useState('');

 const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })
 }

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess('');

  try{
   
    const { recipient } = formData;
    const amount = products.reduce((total, product) => total + (Number(product.price) * Number(product.quantity) || 0), 0);

    console.log(recipient, amount);

    const {request} = await publicClient.simulateContract({
      address: '0x52d336d5fB92A28a95fE22A089eb4c99209263D6',
      abi: wagmiAbi,
      functionName: 'createInvoice',
      args: [ recipient, amount],
      account:address
    })  

    const hash = await walletClient.writeContract(request);
    await publicClient.waitForTransactionReceipt({hash});

    setSuccess('Form submitted successfully!');

  } catch (err) {
    console.error('Error submitting form:', err);
    setError('Failed to submit the form. Please try again.');
  } finally {
    setLoading(false);
  }
 }

  const [sellerInfo, setSellerInfo] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    tin: '',
    email: '',
    country: '',
    city: '',
    region: '',
    postalCode: ''
  });

  const [clientInfo, setClientInfo] = useState({
    walletAddress: '',
    firstName: '',
    lastName: '',
    companyName: '',
    tin: '',
    email: '',
    country: '',
    city: '',
    region: '',
    postalCode: ''
  });

  const [selectedChain, setSelectedChain] = useState('bnb');

  const [products, setProducts] = useState([
    {
      name: '',
      quantity: 1,
      price: '',
      description: ''
    }
  ]);

  const chains = [
    {
      id: 'bnb',
      name: 'BNB Chain',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
          <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#F3BA2F"/>
          <path d="M12.116 14.404L16 10.52L19.886 14.406L22.146 12.146L16 6L9.856 12.144L12.116 14.404Z" fill="white"/>
          <path d="M16 21.48L12.116 17.596L9.856 19.856L16 26L22.146 19.854L19.886 17.594L16 21.48Z" fill="white"/>
          <path d="M16 18.194L18.194 16L16 13.806L13.806 16L16 18.194Z" fill="white"/>
        </svg>
      )
    }
  ];

  const handleSellerChange = (e) => {
    setSellerInfo({
      ...sellerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleClientChange = (e) => {
    setClientInfo({
      ...clientInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const addProduct = () => {
    setProducts([...products, {
      name: '',
      quantity: 1,
      price: '',
      description: ''
    }]);
  };

  const removeProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      return total + (Number(product.price) * Number(product.quantity) || 0);
    }, 0).toFixed(2);
  };

  const connectWallet = async () => {
    // Implement wallet connection logic here
    alert('Wallet connection will be implemented');
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('invoice-preview');
    const opt = {
      margin: 1,
      filename: `invoice-${Date.now()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const handleEmailSend = () => {
    try {
      const subject = `Invoice from ${sellerInfo.firstName} ${sellerInfo.lastName}`;
      const body = `
Dear ${clientInfo.firstName} ${clientInfo.lastName},

Please find attached the invoice for the amount of $${calculateTotal()}.

Invoice Details:
${products.map(product => 
  `- ${product.name}: ${product.quantity} x $${product.price} = $${(product.quantity * product.price).toFixed(2)}`
).join('\n')}

Total Amount: $${calculateTotal()}

Best regards,
${sellerInfo.firstName} ${sellerInfo.lastName}
${sellerInfo.companyName}
    `;

      // Create the mailto link
      const mailtoLink = `mailto:${clientInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = mailtoLink;
      
      // Trigger click event
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to open email client. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl mt-[40px] font-bold text-center mb-10 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Create New Invoice
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Input Forms */}
          <div className="space-y-8">
            {/* Seller Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-semibold mb-4 text-emerald-700">Your Information</h2>
              
              {/* Connected Wallet Address Display */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Wallet Address
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={address || 'Please connect your wallet'}
                    disabled
                    className="input-field bg-gray-50 cursor-not-allowed flex-1"
                  />
                  {address && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(address);
                        alert('Address copied to clipboard!');
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copy address"
                    >
                      📋
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="input-field"
                  onChange={handleSellerChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="input-field"
                  onChange={handleSellerChange}
                />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  className="input-field md:col-span-2"
                  onChange={handleSellerChange}
                />
                <input
                  type="text"
                  name="tin"
                  placeholder="Tax Identification Number (TIN)"
                  className="input-field md:col-span-2"
                  onChange={handleSellerChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input-field md:col-span-2"
                  onChange={handleSellerChange}
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="input-field"
                  onChange={handleSellerChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="input-field"
                  onChange={handleSellerChange}
                />
                <input
                  type="text"
                  name="region"
                  placeholder="Region"
                  className="input-field"
                  onChange={handleSellerChange}
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  className="input-field"
                  onChange={handleSellerChange}
                />
              </div>
            </motion.div>

            {/* Client Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-semibold mb-4 text-emerald-700">Client Information</h2>
              
              {/* Chain Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blockchain Network
                </label>
                <div className="p-3 rounded-xl border-2 border-emerald-500 bg-emerald-50">
                  <div className="flex items-center gap-3">
                    {chains[0].icon}
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{chains[0].name}</p>
                      <p className="text-xs text-gray-500">Selected</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <input
                type="text"
                name="recipient"
                id="recipient"
                placeholder="Client Wallet Address"
                className="input-field mb-4"
                onChange={handleChange}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="input-field"
                  onChange={handleClientChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="input-field"
                  onChange={handleClientChange}
                />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  className="input-field md:col-span-2"
                  onChange={handleClientChange}
                />
                <input
                  type="text"
                  name="tin"
                  placeholder="Tax Identification Number (TIN)"
                  className="input-field md:col-span-2"
                  onChange={handleClientChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input-field md:col-span-2"
                  onChange={handleClientChange}
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="input-field"
                  onChange={handleClientChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="input-field"
                  onChange={handleClientChange}
                />
                <input
                  type="text"
                  name="region"
                  placeholder="Region"
                  className="input-field"
                  onChange={handleClientChange}
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  className="input-field"
                  onChange={handleClientChange}
                />
              </div>
            </motion.div>

            {/* Product Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-semibold mb-4 text-emerald-700">Product Information</h2>
              
              <div className="space-y-6">
                {products.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-700">Item #{index + 1}</h3>
                      {index > 0 && (
                        <button
                          onClick={() => removeProduct(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Product Name"
                        value={product.name}
                        onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                        className="input-field"
                      />
                      
                      <input
                        type="text"
                        placeholder="Description"
                        value={product.description}
                        onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                        className="input-field"
                      />
                      
                      <div className="flex gap-4">
                        <input
                          type="number"
                          placeholder="Quantity"
                          value={product.quantity}
                          min="1"
                          onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                          className="input-field"
                        />
                        
                        <input
                          type="number"
                          placeholder="Price per unit"
                          value={product.price}
                          onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                          className="input-field"
                        />
                      </div>
                      
                      <div className="flex items-center justify-end md:col-span-2">
                        <p className="text-gray-600">
                          Subtotal: <span className="font-semibold">${(product.price * product.quantity || 0).toFixed(2)}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addProduct}
                  className="w-full px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Another Item
                </motion.button>

                <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-700">Total Amount:</span>
                    <span className="text-2xl font-bold text-emerald-600"
                    onClick={handleChange}>${calculateTotal()}</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={loading || !address}
                    className={`w-full px-6 py-3 flex items-center justify-center gap-2 rounded-lg font-semibold text-white shadow-md transition-all ${
                      loading || !address
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Create Invoice
                      </>
                    )}
                  </motion.button>

                  {error && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
                      {success}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-md sticky top-6 h-fit"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-emerald-700">Preview</h2>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                  Download PDF
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEmailSend}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  disabled={!clientInfo.email}
                  title={!clientInfo.email ? "Please enter client's email first" : "Send via email"}
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                    />
                  </svg>
                  Send via Email
                </motion.button>
              </div>
            </div>

            {/* Preview Content - Add id for PDF generation */}
            <div id="invoice-preview" className="bg-white p-8 rounded-lg">
              {/* Invoice Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">INVOICE</h1>
                <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
              </div>

              {/* Seller Preview */}
              <div className="mb-8">
                <h3 className="font-semibold text-emerald-600 mb-2">From:</h3>
                <div className="space-y-1 text-gray-600">
                  <p>{sellerInfo.firstName} {sellerInfo.lastName}</p>
                  <p>{sellerInfo.companyName}</p>
                  <p>TIN: {sellerInfo.tin}</p>
                  <p>{sellerInfo.email}</p>
                  <p>{sellerInfo.city}, {sellerInfo.region}</p>
                  <p>{sellerInfo.country}, {sellerInfo.postalCode}</p>
                </div>
              </div>

              {/* Client Preview */}
              <div className="mb-8">
                <h3 className="font-semibold text-emerald-600 mb-2">To:</h3>
                <div className="space-y-1 text-gray-600">
                  <p>{clientInfo.firstName} {clientInfo.lastName}</p>
                  <p>{clientInfo.companyName}</p>
                  <p>TIN: {clientInfo.tin}</p>
                  <p>{clientInfo.email}</p>
                  <p>{clientInfo.city}, {clientInfo.region}</p>
                  <p>{clientInfo.country}, {clientInfo.postalCode}</p>
                </div>
              </div>

              {/* Products Table */}
              <div className="mt-8">
                <h3 className="font-semibold text-emerald-600 mb-4">Products:</h3>
                <table className="w-full mb-4">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="py-2">Item</th>
                      <th className="py-2">Description</th>
                      <th className="py-2">Qty</th>
                      <th className="py-2">Price</th>
                      <th className="py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{product.name || 'Product Name'}</td>
                        <td className="py-2">{product.description || 'Description'}</td>
                        <td className="py-2">{product.quantity}</td>
                        <td className="py-2">${product.price || '0.00'}</td>
                        <td className="py-2 text-right">
                          ${(product.price * product.quantity || 0).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Total Amount */}
                <div className="flex justify-end border-t pt-4">
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      Total Amount: <span className="text-emerald-600">${calculateTotal()}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default CreateInvoice; 