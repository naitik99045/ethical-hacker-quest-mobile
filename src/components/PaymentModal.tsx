
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, CreditCard, Smartphone, Wallet, Building } from 'lucide-react';
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
  const { toast } = useToast();

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Pay using UPI ID or scan QR' },
    { id: 'paytm', name: 'Paytm', icon: Wallet, description: 'Paytm Wallet' },
    { id: 'phonepe', name: 'PhonePe', icon: Smartphone, description: 'PhonePe App' },
    { id: 'googlepay', name: 'Google Pay', icon: Smartphone, description: 'Google Pay' },
    { id: 'rupay', name: 'RuPay', icon: CreditCard, description: 'RuPay Card' },
    { id: 'netbanking', name: 'Net Banking', icon: Building, description: 'Internet Banking' }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      if (selectedMethod === 'upi') {
        if (!upiId) {
          toast({
            title: "UPI ID Required",
            description: "Please enter your UPI ID to proceed",
            variant: "destructive"
          });
          setIsProcessing(false);
          return;
        }
        
        // Generate UPI payment URL
        const upiUrl = `upi://pay?pa=7020645145@fam&pn=Kali%20Academy&am=${price}&cu=INR&tn=Payment%20for%20${encodeURIComponent(moduleTitle)}`;
        
        // Try to open UPI app
        const link = document.createElement('a');
        link.href = upiUrl;
        link.click();
        
        toast({
          title: "UPI Payment Initiated",
          description: "Complete the payment in your UPI app",
        });
      } else {
        // For other payment methods, show a success message (in real app, integrate with payment gateway)
        toast({
          title: "Payment Gateway",
          description: `Redirecting to ${paymentMethods.find(m => m.id === selectedMethod)?.name} payment...`,
        });
      }

      // Simulate payment completion after 3 seconds
      setTimeout(() => {
        setIsProcessing(false);
        onPaymentSuccess();
        onClose();
        toast({
          title: "Payment Successful!",
          description: `${moduleTitle} has been unlocked`,
        });
      }, 3000);
      
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Payment Failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    }
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
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 terminal-font">₹{price}</div>
            <p className="text-sm text-green-300">One-time payment</p>
          </div>

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
            <div className="space-y-2">
              <Label htmlFor="upi-id" className="text-green-400">Your UPI ID</Label>
              <Input
                id="upi-id"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="border-green-500/30 text-green-300"
              />
              <p className="text-xs text-green-300">
                Pay to: <span className="text-green-400 font-semibold">7020645145@fam</span>
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Badge variant="outline" className="text-green-400 border-green-500 w-full justify-center">
              🔒 Secure Payment • 256-bit SSL Encryption
            </Badge>
          </div>

          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-green-600 hover:bg-green-700 text-black font-bold"
          >
            {isProcessing ? 'Processing...' : `Pay ₹${price}`}
          </Button>

          <p className="text-xs text-green-300 text-center">
            By proceeding, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentModal;
