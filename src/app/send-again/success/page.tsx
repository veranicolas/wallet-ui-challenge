'use client';
import { useState, Suspense } from 'react';
import UserAvatar from '@/components/UserAvatar';
import { useWalletStore } from '@/stores/walletStore';
import { formatCurrency } from '@/utils';
import dayjs from 'dayjs';
import { useSearchParams, useRouter } from 'next/navigation';
import { pdf } from '@react-pdf/renderer';
import { TransactionPDF } from '@/components/PDF';
import { LoaderCircle } from 'lucide-react';
import { User } from '@/types';

import './styles.css';

function SuccessPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('transactionId');
  const [isSharing, setIsSharing] = useState(false);

  const { transactions } = useWalletStore();
  const transaction = transactions.find(tx => tx.id === transactionId);

  const sendTo = transaction?.recipient;

  const navigateHome = () => {
    router.push('/');
  }

  // pdf generation and sharing logic
  const shareTransactionPDF = async () => {
    if (!transaction) return;
    
    setIsSharing(true);
    try {
      const pdfDoc = <TransactionPDF transaction={transaction} recipient={sendTo as User} />;
      const pdfBlob = await pdf(pdfDoc).toBlob();
      
      const fileName = `transaction_${transaction.reference?.replace('#', '')}_${dayjs(transaction.date).format('YYYY-MM-DD')}.pdf`;

      // We check if web share API is supported
      if (navigator.share && navigator.canShare) {
        const file = new File([pdfBlob], fileName, { type: 'application/pdf' });
        
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'Transaction Receipt',
            text: `Transaction receipt for ${formatCurrency(transaction.amount)}`,
            files: [file],
          });
        } else {
          // fallback download the file
          downloadPDF(pdfBlob, fileName);
        }
      } else {
        // fallback download the file
        downloadPDF(pdfBlob, fileName);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  const downloadPDF = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const receiptDetails = [
    { label: 'Payment', value: formatCurrency(transaction?.amount as number) },
    { label: 'Notes', value: transaction?.notes || 'N/A' },
    { label: 'Date', value: dayjs(transaction?.date).format('MMMM D, YYYY') },
    { label: 'Time', value: dayjs(transaction?.date).format('h:mm A') },
    { label: 'Reference Number', value: transaction?.reference },
  ]


  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderCircle className="animate-spin text-white w-20 h-20" />
      </div>
    )
  }

  return (
    <div className="success-page">
      <div className="receipt-container">
        <div className="flex flex-col items-center">
          <h1 className="text-[18px] text-[#03B961] font-bold">Transaction Successful</h1>
          <p className="text-[16px] text-gray-600">Your transaction was successful</p>
          <p className="text-[40px] text-gray-900 font-bold mt-[28px]">{formatCurrency(transaction?.amount as number)}</p>
        </div>
        {
          sendTo && (
            <div className="flex flex-col items-center mt-6">
              <p className="text-[18px] text-black font-bold">Send to</p>
              <div className="flex flex-row items-center gap-10 mt-2">
                <UserAvatar user={sendTo} size="xl" className="mx-auto my-4" />
                <p className="text-[16px] text-gray-500 font-regular flex flex-col justify-start items-start">
                  <span className="text-left">{sendTo.name.first}</span>
                  <span className="text-left">{sendTo.name.last}</span>
                </p>
              </div>
            </div>
          )
        }
        <div className="flex flex-col items-left text-left mt-4 mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Transaction Details</h2>
          {receiptDetails.map((detail, index) => (
            <div className="flex flex-row justify-between mb-2" key={index}>
              <span className="text-[#999999] text-[16px]">{detail.label}</span>
              <span className="text-gray-900 font-bold text-[16px]">{detail.value}</span>
            </div>
          ))}
        </div>
      </div>
      <button 
        onClick={shareTransactionPDF}
        disabled={isSharing}
        className="w-full text-[20px] cursor-pointer bg-[#0FD08B] border-white border-2 text-white py-4 rounded-[1000px] mt-[5vh] mb-4 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSharing ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Generating PDF...</span>
          </div>
        ) : (
          'Share PDF'
        )}
      </button>
      <button className="w-full text-[20px] bg-white text-[#0FD08B] py-4 rounded-[1000px] mt-2 mb-4 font-bold cursor-pointer" onClick={navigateHome}>
        Back to Home
      </button>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessPageContent />
    </Suspense>
  );
}
