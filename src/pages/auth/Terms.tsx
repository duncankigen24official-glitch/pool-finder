import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 border-b border-border sticky top-0 bg-background z-10">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
            <p className="text-sm text-muted-foreground">Last updated: November 22, 2025</p>
          </div>

          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using RideShare, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use this service.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">2. User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">3. User Conduct</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree not to use the service to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Violate any laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit harmful or offensive content</li>
                <li>Impersonate another person or entity</li>
                <li>Interfere with the service's operation</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">4. Ride Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                RideShare is a platform that connects drivers and passengers. We are not responsible for the conduct of users or the condition of vehicles. All users must:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Maintain valid licenses and insurance (drivers)</li>
                <li>Arrive on time for scheduled rides</li>
                <li>Respect other users and their property</li>
                <li>Follow all traffic laws and safety guidelines</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">5. Payment and Fees</h2>
              <p className="text-muted-foreground leading-relaxed">
                All payments must be made through the app. RideShare charges a service fee for facilitating connections between users. Prices may vary based on distance, demand, and other factors. Refund policies apply based on cancellation timing.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">6. Cancellation Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Users may cancel rides according to the cancellation policy. Cancellations made less than 2 hours before the scheduled ride time may incur fees. Multiple cancellations may result in account restrictions.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">7. Safety and Verification</h2>
              <p className="text-muted-foreground leading-relaxed">
                We prioritize safety and require verification of government IDs and driving licenses. Users must not engage in harassment, discrimination, or illegal activities. Any violation may result in immediate account suspension and legal action.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                RideShare is a platform service and is not responsible for any incidents, damages, or losses that occur during rides. Users participate at their own risk. We strongly recommend verifying insurance coverage and following all safety guidelines.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">9. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content, trademarks, and intellectual property on RideShare are owned by or licensed to us. You may not use, copy, or distribute any content without our explicit permission.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">10. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the modified terms. We will notify users of significant changes through the app or email.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about these terms, please contact our support team through the Help & Support section in the app.
              </p>
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Terms;
