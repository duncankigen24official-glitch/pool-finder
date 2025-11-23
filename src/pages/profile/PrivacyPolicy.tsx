import PageLayout from "@/components/layout/PageLayout";
import { ScrollArea } from "@/components/ui/scroll-area";

const PrivacyPolicy = () => {
  return (
    <PageLayout title="Privacy Policy" showBackButton>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="px-4 py-6 space-y-4">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We collect information you provide directly, including name, email, phone number, profile photo, vehicle information, and location data necessary for connecting travelers. We also collect usage data to improve our services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your information is used to facilitate ride connections, ensure platform safety, improve our services, and communicate important updates. We use location data only when you're using the app.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">3. Information Sharing</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We share limited information with other users to facilitate rides (name, photo, rating). We don't sell your personal information. We may share data with essential service providers (hosting, SMS) and comply with legal requirements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">4. Data Security</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your data. However, no
              method of transmission over the internet is 100% secure. We continuously work to
              improve our security practices.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">5. Location Data</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We collect location data to match riders and drivers, provide navigation, and
              improve service quality. You can control location permissions through your device
              settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">6. Your Rights</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You have the right to access, correct, or delete your personal information. You can
              opt-out of marketing communications. Contact us to exercise these rights.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">7. Cookies and Tracking</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies and similar technologies to improve user experience, analyze usage
              patterns, and remember your preferences. You can control cookie settings through
              your browser.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">8. Changes to Privacy Policy</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We may update this privacy policy periodically. We'll notify you of significant
              changes through the app or email. Continued use after changes indicates acceptance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">9. Contact Us</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you have questions about this privacy policy or how we handle your data, please
              contact our support team through the Help & Support section.
            </p>
          </section>
        </div>
      </ScrollArea>
    </PageLayout>
  );
};

export default PrivacyPolicy;
