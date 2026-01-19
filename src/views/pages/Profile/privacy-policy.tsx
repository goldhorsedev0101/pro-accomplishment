// Components
import Box from '@/components/common/box';
import Heading from '@/components/common/heading';

// Type
import { JSX } from 'react';

const PrivacyPolicy = (): JSX.Element => {
  return (
    <Box className="space-y-3">
      <Heading text="Privacy Policy" width="medium" size="31" />

      <p className="font-normal text-neutral-grey-80">Last updated: 1/19/2026</p>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="font-normal text-neutral-grey-80">
          Welcome to I&apos;m Accomplished. We respect your privacy and are committed to protecting
          your personal data. This privacy policy will inform you about how we look after your
          personal data when you use our app and tell you about your privacy rights and how the law
          protects you.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p className="font-normal text-neutral-grey-80 mb-3">
          We collect and process the following types of information:
        </p>
        <ul className="list-disc pl-6 font-normal text-neutral-grey-80 space-y-2">
          <li>Personal identification information (name, email address)</li>
          <li>Accomplishment records and tracking data you choose to input</li>
          <li>Usage data and analytics to improve our services</li>
          <li>Device and browser information for optimization purposes</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="font-normal text-neutral-grey-80 mb-3">
          We use your personal data for the following purposes:
        </p>
        <ul className="list-disc pl-6 font-normal text-neutral-grey-80 space-y-2">
          <li>To provide and maintain our accomplishment tracking services</li>
          <li>To manage your account and provide customer support</li>
          <li>To improve and personalize your experience</li>
          <li>To communicate with you about updates, features, and promotions</li>
          <li>To analyze usage patterns and enhance our app functionality</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
        <p className="font-normal text-neutral-grey-80">
          We implement appropriate technical and organizational security measures to protect your
          personal data against unauthorized access, alteration, disclosure, or destruction. Your
          accomplishment records are stored securely and are only accessible by you.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Data Sharing and Disclosure</h2>
        <p className="font-normal text-neutral-grey-80">
          We do not sell, trade, or rent your personal information to third parties. We may share
          your data only in the following circumstances: with your explicit consent, to comply with
          legal obligations, or to protect the rights and safety of I&apos;m Accomplished and its
          users.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <p className="font-normal text-neutral-grey-80 mb-3">You have the right to:</p>
        <ul className="list-disc pl-6 font-normal text-neutral-grey-80 space-y-2">
          <li>Access your personal data</li>
          <li>Correct inaccurate or incomplete data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Export your data in a portable format</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
        <p className="font-normal text-neutral-grey-80">
          We use cookies and similar tracking technologies to enhance your experience, analyze
          usage, and improve our services. You can control cookie preferences through your browser
          settings.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Children&apos;s Privacy</h2>
        <p className="font-normal text-neutral-grey-80">
          Our service is intended for users of all ages, including students. If you are under 18,
          please ensure you have parental consent before using I&apos;m Accomplished. We do not
          knowingly collect data from children under 13 without parental consent.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
        <p className="font-normal text-neutral-grey-80">
          We may update this privacy policy from time to time. We will notify you of any changes by
          posting the new policy on this page and updating the &quot;Last updated&quot; date.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="font-normal text-neutral-grey-80">
          If you have any questions about this privacy policy or our data practices, please contact
          us through the contact form on our website or reach out to our support team.
        </p>
      </section>
    </Box>
  );
};

export default PrivacyPolicy;
