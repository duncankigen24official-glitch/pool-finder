import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
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
            <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: November 22, 2025</p>
          </div>

          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information you provide directly, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Name, email address, and phone number</li>
                <li>Profile photo and vehicle information</li>
                <li>Location data when using the app</li>
                <li>Communications and support requests</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information is used to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Facilitate ride connections between drivers and passengers</li>
                <li>Ensure platform safety and reliability</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Improve our services and user experience</li>
                <li>Send important updates and notifications</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">3. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We share limited information to facilitate rides:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Profile information (name, photo, rating) with ride participants</li>
                <li>Location data during active rides</li>
                <li>Vehicle information with passengers</li>
                <li>Data with essential service providers (SMS services, hosting)</li>
                <li>Information required by law enforcement or legal processes</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                We do not sell your personal information to third parties.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">4. Location Data</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect location data to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Match riders with nearby drivers</li>
                <li>Provide navigation and route optimization</li>
                <li>Calculate distances and travel times</li>
                <li>Improve service quality and safety</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                You can control location permissions through your device settings. However, this may limit functionality.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your data, including encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure. We continuously work to improve our security practices and respond promptly to potential breaches.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">6. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your information as long as your account is active or as needed to provide services. After account deletion, we may retain certain information for legal compliance, dispute resolution, and to prevent fraud.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">7. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data in a portable format</li>
                <li>Lodge a complaint with data protection authorities</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                Contact us through the app to exercise these rights.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">8. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to improve user experience, analyze usage patterns, and remember preferences. You can control cookie settings through your browser, but this may affect functionality.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">9. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                RideShare is not intended for users under 18 years of age. We do not knowingly collect information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">10. Changes to Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy periodically to reflect changes in our practices or legal requirements. We'll notify you of significant changes through the app or email. Continued use after changes indicates acceptance of the updated policy.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this privacy policy or how we handle your data, please contact our support team through the Help & Support section in the app.
              </p>
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Privacy;
