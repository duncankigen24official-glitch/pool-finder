import PageLayout from "@/components/layout/PageLayout";
import { ScrollArea } from "@/components/ui/scroll-area";

const TermsCondition = () => {
  return (
    <PageLayout title="Terms & Condition" showBackButton>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="px-4 py-6 space-y-4">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              By accessing and using this carpooling service, you accept and agree to be bound by
              the terms and provision of this agreement. If you do not agree to these terms,
              please do not use this service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">2. User Responsibilities</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Users are responsible for maintaining the confidentiality of their account
              information and for all activities that occur under their account. You agree to
              provide accurate, current, and complete information during registration.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">3. Ride Sharing Guidelines</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All users must respect each other and follow safety guidelines. Drivers must have
              valid licenses and insurance. Passengers must arrive on time and respect the
              driver's vehicle.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">4. Cancellation Policy</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Users may cancel rides according to the cancellation policy. We encourage users to respect each other's time by providing reasonable notice when cancelling. Multiple late cancellations may result in account restrictions to ensure platform reliability for all users.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">5. Safety and Community Standards</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We prioritize safety and mutual respect. This platform helps connect travelers going the same direction. Users must not engage in harassment, discrimination, or illegal activities. Any violation may result in immediate account suspension and legal action.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">6. Limitation of Liability</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The platform is not responsible for any incidents that occur during rides. Users
              participate at their own risk. We recommend users verify insurance coverage.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">7. Changes to Terms</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of the
              service after changes constitutes acceptance of the modified terms.
            </p>
          </section>
        </div>
      </ScrollArea>
    </PageLayout>
  );
};

export default TermsCondition;
