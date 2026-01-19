// Components
import Box from '@/components/common/box';
import Heading from '@/components/common/heading';

// Type
import { JSX } from 'react';

const TermsConditions = (): JSX.Element => {
  return (
    <Box className="space-y-3">
      <Heading text="Terms and Conditions" width="medium" size="31" />

      <p className="font-normal text-neutral-grey-80">Last updated: 1/19/2026</p>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
        <p className="font-normal text-neutral-grey-80">
          By accessing and using I&apos;m Accomplished, you agree to be bound by these Terms and
          Conditions. If you do not agree with any part of these terms, you may not use our service.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
        <p className="font-normal text-neutral-grey-80">
          I&apos;m Accomplished is a digital platform designed to help users track, record, and
          celebrate their accomplishments. Our service is designed for students, professionals,
          parents, job seekers, business owners, and anyone looking to document their achievements
          and progress.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
        <p className="font-normal text-neutral-grey-80 mb-3">When you create an account with us:</p>
        <ul className="list-disc pl-6 font-normal text-neutral-grey-80 space-y-2">
          <li>You must provide accurate, complete, and current information</li>
          <li>
            You are responsible for maintaining the confidentiality of your account credentials
          </li>
          <li>You are responsible for all activities that occur under your account</li>
          <li>You must notify us immediately of any unauthorized use of your account</li>
          <li>
            You must be at least 13 years old to use our service (with parental consent if under 18)
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>
        <p className="font-normal text-neutral-grey-80 mb-3">
          You agree not to use I&apos;m Accomplished to:
        </p>
        <ul className="list-disc pl-6 font-normal text-neutral-grey-80 space-y-2">
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe upon the rights of others</li>
          <li>Upload malicious code, viruses, or harmful content</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Harass, abuse, or harm other users</li>
          <li>Use the service for any unauthorized commercial purposes</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">User Content</h2>
        <p className="font-normal text-neutral-grey-80">
          You retain ownership of all accomplishments, records, and content you input into I&apos;m
          Accomplished. By using our service, you grant us a license to store, process, and display
          your content solely for the purpose of providing our services to you. We will not share
          your personal accomplishments with third parties without your explicit consent.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
        <p className="font-normal text-neutral-grey-80">
          The I&apos;m Accomplished platform, including its design, features, functionality, and
          content (excluding user-generated content), is owned by us and protected by copyright,
          trademark, and other intellectual property laws. You may not copy, modify, distribute, or
          create derivative works without our explicit written permission.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
        <p className="font-normal text-neutral-grey-80">
          We strive to maintain continuous service availability, but we do not guarantee
          uninterrupted access. We reserve the right to modify, suspend, or discontinue any aspect
          of the service at any time, with or without notice. We are not liable for any
          modification, suspension, or discontinuation of the service.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
        <p className="font-normal text-neutral-grey-80">
          I&apos;m Accomplished is provided &quot;as is&quot; without warranties of any kind. We are
          not liable for any indirect, incidental, special, consequential, or punitive damages
          arising from your use of the service. Our total liability shall not exceed the amount paid
          by you, if any, for accessing the service.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Termination</h2>
        <p className="font-normal text-neutral-grey-80">
          We reserve the right to terminate or suspend your account and access to the service at our
          sole discretion, without notice, for conduct that we believe violates these Terms or is
          harmful to other users, us, or third parties, or for any other reason.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Data Export and Account Deletion</h2>
        <p className="font-normal text-neutral-grey-80">
          You may request to export your accomplishment data or delete your account at any time.
          Upon account deletion, your personal data will be permanently removed from our systems,
          subject to legal retention requirements.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Modifications to Terms</h2>
        <p className="font-normal text-neutral-grey-80">
          We reserve the right to modify these Terms and Conditions at any time. We will notify
          users of any material changes by posting the updated terms on this page and updating the
          &quot;Last updated&quot; date. Your continued use of the service after changes constitutes
          acceptance of the modified terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
        <p className="font-normal text-neutral-grey-80">
          These Terms shall be governed by and construed in accordance with applicable laws, without
          regard to conflict of law provisions. Any disputes arising from these terms shall be
          resolved through binding arbitration or in the courts of appropriate jurisdiction.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <p className="font-normal text-neutral-grey-80">
          If you have any questions about these Terms and Conditions, please contact us through the
          contact form on our website or reach out to our support team.
        </p>
      </section>
    </Box>
  );
};

export default TermsConditions;
