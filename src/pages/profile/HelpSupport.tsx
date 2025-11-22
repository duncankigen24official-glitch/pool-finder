import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const HelpSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = () => {
    toast.success("Support request submitted successfully");
    setFormData({ name: "", email: "", message: "" });
  };

  const faqs = [
    {
      question: "How do I book a ride?",
      answer: "Navigate to the Find Pool tab, enter your pickup and destination locations, select date and time, then browse available rides and book the one that suits you best.",
    },
    {
      question: "How do I offer a ride?",
      answer: "Go to the Offer Pool tab, enter your trip details including source, destination, date, time, and available seats. After confirmation, your ride will be visible to potential passengers.",
    },
    {
      question: "What is the cancellation policy?",
      answer: "You can cancel a ride up to 2 hours before departure without penalty. Cancellations within 2 hours may incur a cancellation fee. Check the full policy in Terms & Conditions.",
    },
    {
      question: "How does payment work?",
      answer: "Payments are processed through the app's wallet system. You can add funds to your wallet and payments are automatically deducted when you book a ride. Drivers receive payments after ride completion.",
    },
    {
      question: "How do I rate a driver or passenger?",
      answer: "After completing a ride, you'll receive a prompt to rate your experience. You can also access Ride History to rate past trips and leave reviews.",
    },
  ];

  return (
    <PageLayout title="Help & Support" showBackButton>
      <div className="px-4 py-6 space-y-6">
        {/* Contact Options */}
        <div className="grid grid-cols-3 gap-3">
          <button className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
            <Phone className="h-6 w-6 text-primary" />
            <span className="text-xs text-muted-foreground">Call</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
            <Mail className="h-6 w-6 text-primary" />
            <span className="text-xs text-muted-foreground">Email</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
            <MessageCircle className="h-6 w-6 text-primary" />
            <span className="text-xs text-muted-foreground">Chat</span>
          </button>
        </div>

        {/* FAQs */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-4"
              >
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Form */}
        <div className="space-y-4 bg-card border border-border rounded-lg p-4">
          <h2 className="text-lg font-semibold text-foreground">Send us a message</h2>
          
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Describe your issue or question"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="min-h-24 resize-none"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default HelpSupport;
