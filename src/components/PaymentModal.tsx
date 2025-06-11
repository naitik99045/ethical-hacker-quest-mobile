
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, CreditCard, Smartphone, Wallet, Building, Copy, ExternalLink, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleTitle: string;
  price: number;
  onPaymentSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  moduleTitle,
  price,
  onPaymentSuccess
}) => {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'initiated' | 'verifying' | 'completed'>('pending');
  const [transactionId, setTransactionId] = useState('');
  const { toast } = useToast();

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Pay using UPI ID or scan QR' },
    { id: 'paytm', name: 'Paytm', icon: Wallet, description: 'Paytm Wallet' },
    { id: 'phonepe', name: 'PhonePe', icon: Smartphone, description: 'PhonePe App' },
    { id: 'googlepay', name: 'Google Pay', icon: Smartphone, description: 'Google Pay' },
    { id: 'rupay', name: 'RuPay', icon: CreditCard, description: 'RuPay Card' },
    { id: 'netbanking', name: 'Net Banking', icon: Building, description: 'Internet Banking' }
  ];

  const merchantUpiId = '7020645145@fam';
  const merchantName = 'Kali Academy';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "UPI ID copied to clipboard",
    });
  };

  const handlePayment = async () => {
    if (selectedMethod === 'upi') {
      if (!upiId.trim()) {
        toast({
          title: "UPI ID Required",
          description: "Please enter your UPI ID to proceed",
          variant: "destructive"
        });
        return;
      }

      if (!upiId.includes('@')) {
        toast({
          title: "Invalid UPI ID",
          description: "Please enter a valid UPI ID (e.g., yourname@upi)",
          variant: "destructive"
        });
        return;
      }
    }

    setIsProcessing(true);
    setPaymentStatus('initiated');
    
    try {
      if (selectedMethod === 'upi') {
        // Generate proper UPI payment URL with all required parameters
        const upiParams = new URLSearchParams({
          pa: merchantUpiId,
          pn: merchantName,
          am: price.toString(),
          cu: 'INR',
          tn: `Payment for ${moduleTitle} - Kali Academy`,
          tr: `KA${Date.now()}`, // Transaction reference
        });
        
        const upiUrl = `upi://pay?${upiParams.toString()}`;
        
        // Try to open UPI app
        const link = document.createElement('a');
        link.href = upiUrl;
        link.click();
        
        toast({
          title: "UPI Payment Initiated",
          description: "Complete the payment in your UPI app and enter transaction ID below",
        });

        setPaymentStatus('verifying');
      } else {
        // For other payment methods, redirect to respective payment pages
        const paymentUrls = {
          paytm: 'https://paytm.com',
          phonepe: 'https://www.phonepe.com',
          googlepay: 'https://pay.google.com',
          rupay: 'https://www.rupay.co.in',
          netbanking: '#' // This would typically redirect to bank selection
        };

        const url = paymentUrls[selectedMethod as keyof typeof paymentUrls];
        if (url && url !== '#') {
          window.open(url, '_blank');
        }

        toast({
          title: "Redirecting...",
          description: `Opening ${paymentMethods.find(m => m.id === selectedMethod)?.name} payment gateway`,
        });

        setPaymentStatus('verifying');
      }
      
    } catch (error) {
      setIsProcessing(false);
      setPaymentStatus('pending');
      toast({
        title: "Payment Failed",
        description: "Could not initiate payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleTransactionVerification = () => {
    if (!transactionId.trim()) {
      toast({
        title: "Transaction ID Required",
        description: "Please enter your transaction ID to verify payment",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // In a real application, this would call your backend to verify the transaction
    // For now, we'll simulate verification
    setTimeout(() => {
      setPaymentStatus('completed');
      setIsProcessing(false);
      
      toast({
        title: "Payment Verified!",
        description: `${moduleTitle} has been unlocked`,
      });

      setTimeout(() => {
        onPaymentSuccess();
        onClose();
        setPaymentStatus('pending');
        setTransactionId('');
        setUpiId('');
      }, 2000);
    }, 2000);
  };

  const handleManualVerification = () => {
    toast({
      title: "Manual Verification",
      description: "Your payment is being verified manually. You'll receive access within 24 hours.",
    });
    
    setTimeout(() => {
      onClose();
      setPaymentStatus('pending');
      setTransactionId('');
      setUpiId('');
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-green-500/30 glow-green">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-green-400 terminal-font">Premium Module</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-green-400 hover:bg-green-400/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="text-green-300">
            Unlock "{moduleTitle}"
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {paymentStatus === 'completed' ? (
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
              <div>
                <h3 className="text-lg font-bold text-green-400 terminal-font">Payment Successful!</h3>
                <p className="text-green-300">Module will be unlocked shortly...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 terminal-font">₹{price}</div>
                <p className="text-sm text-green-300">One-time payment</p>
              </div>

              {paymentStatus === 'pending' && (
                <>
                  <div className="space-y-2">
                    <Label className="text-green-400 terminal-font">Select Payment Method</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {paymentMethods.map((method) => {
                        const IconComponent = method.icon;
                        return (
                          <Button
                            key={method.id}
                            variant={selectedMethod === method.id ? "default" : "outline"}
                            onClick={() => setSelectedMethod(method.id)}
                            className={`flex flex-col h-16 ${
                              selectedMethod === method.id
                                ? "bg-green-600 hover:bg-green-700 text-black"
                                : "border-green-500 text-green-400 hover:bg-green-400/10"
                            }`}
                          >
                            <IconComponent className="h-4 w-4" />
                            <span className="text-xs">{method.name}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {selectedMethod === 'upi' && (
                    <div className="space-y-3">
                      <div className="bg-green-400/10 border border-green-500/30 p-3 rounded">
                        <Label className="text-green-400 text-sm">Pay to UPI ID:</Label>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-green-300 font-mono">{merchantUpiId}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(merchantUpiId)}
                            className="border-green-500 text-green-400 hover:bg-green-400/10"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="upi-id" className="text-green-400">Your UPI ID</Label>
                        <Input
                          id="upi-id"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="border-green-500/30 text-green-300"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {(paymentStatus === 'initiated' || paymentStatus === 'verifying') && (
                <div className="space-y-4">
                  <div className="bg-yellow-400/10 border border-yellow-500/30 p-4 rounded text-center">
                    <h3 className="text-yellow-400 font-bold mb-2">Payment Instructions</h3>
                    <div className="text-sm text-yellow-300 space-y-2">
                      <p>1. Complete payment in your UPI app</p>
                      <p>2. Note down the transaction ID</p>
                      <p>3. Enter transaction ID below to verify</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transaction-id" className="text-green-400">Transaction ID</Label>
                    <Input
                      id="transaction-id"
                      placeholder="Enter transaction ID from your UPI app"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="border-green-500/30 text-green-300"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleTransactionVerification}
                      disabled={isProcessing}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-black font-bold"
                    >
                      {isProcessing ? 'Verifying...' : 'Verify Payment'}
                    </Button>
                    <Button
                      onClick={handleManualVerification}
                      variant="outline"
                      className="border-yellow-500 text-yellow-400 hover:bg-yellow-400/10"
                    >
                      Manual Verify
                    </Button>
                  </div>
                </div>
              )}

              {paymentStatus === 'pending' && (
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700 text-black font-bold"
                >
                  {isProcessing ? 'Processing...' : `Pay ₹${price}`}
                </Button>
              )}

              <div className="space-y-2">
                <Badge variant="outline" className="text-green-400 border-green-500 w-full justify-center">
                  🔒 Secure Payment • Manual Verification Available
                </Badge>
              </div>

              <p className="text-xs text-green-300 text-center">
                By proceeding, you agree to our Terms of Service and Privacy Policy
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentModal;
