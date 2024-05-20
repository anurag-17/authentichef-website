"use client";
import React from "react";
import Footer from "../footer";
import Navbar from "../navbar";

const PrivacyPolicy = () => {
  return (
    <>
      <section>
        <Navbar />
        <div className="2xl:w-[1600px] xl:w-[1100px] lg:w-[850px]  md:w-[700px]  mx-auto 2xl:py-[150px] xl:py-[120px] py-[70px] mnavbar">
          <div>
            <h1 className="third_head mb-7 2xl:mb-10">Privacy Policy</h1>

            <p className="privacyText mb-7 2xl:mb-10">
              Authentic chef is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              personal data when you use the Authentic chef Website. We will only
              use the data that we collect about you in accordance with the
              applicable privacy laws including but not limited to the EU
              General Data Protection Regulation 2016/679 (GDPR) and UK Data
              Protection Act 2018.
            </p>

            {/* <h2>Log Files</h2> */}

            <p className="privacyText mb-7 2xl:mb-10">
              For the purpose of this Privacy Policy, Authentic chef is a
              processor of your personal data (Data Processor) under GDPR and UK
              Data Protection Act. You are the controller (Data Controller)
              under GDPR and UK Data Protection Act at all times.
            </p>

            {/* Add more sections as needed */}

            {/* <h2>Contact Us</h2> */}

            <p className="privacyText mb-7 2xl:mb-10">
              We reserve the right to update and modify this Privacy Policy at
              any time and for any reason. You are encouraged to periodically
              review this Privacy Policy to stay informed of updates. IF YOU DO
              NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, YOU ARE ADVISED
              NOT TO CONTINUE USING THE WEBSITE ANY LONGER.
            </p>

            <h3 className="font-semibold mb-2 privacyText">
              1. TYPES OF PERSONAL DATA WE COLLECT
            </h3>

            <p className="privacyText mb-7 2xl:mb-10">
              While it is perfectly possible to visit and browse the
              Authentic chef Website without disclosing any personal information,
              if you choose to actively engage with us by registering an
              account, you will be asked to provide certain personally
              identifiable information, commonly known as personal data.
              Personal data is basically any information about an individual
              from which that individual can be identified whether directly or
              indirectly. It does not include data where the identity has been
              removed (anonymous data).
            </p>
            <p className="privacyText mb-7 2xl:mb-10">
              The personal data we collect from you depends on precisely what
              details you volunteer to us as you interact with the Website but
              may include, without limitation:
            </p>

            <ul>
              <li className="privacyText mb-7 2xl:mb-10">
                <span className="font-semibold"> Identity Data </span>
                which includes your first name, last name, photograph, and any
                details included in any identification documents you provide to
                us (applicable only when you choose to register as a Chef).
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                <span className="font-semibold"> Contact Data </span>
                which includes your e-mail address, phone number, billing
                address and delivery address.
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                <span className="font-semibold"> Financial Data</span> which,
                where you provide them, includes your bank account and payment
                card details.
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                <span className="font-semibold"> Transaction Data</span> which
                includes details about payments to and from you and other
                details or services you have purchased from us or whilst using
                the Website.
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                <span className="font-semibold"> Technical Data </span>
                which includes your IP address, your login data, operating
                system and browser type and version.
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                <span className="font-semibold"> Profile Data</span> which
                includes your username and password, prior order history,
                dietary preferences, allergen information, and any other
                personal data contained in content that you upload to the
                Website.
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                <span className="font-semibold"> Location Data </span>
                which includes data about where you access the Website from.
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                <span className="font-semibold"> Usage Data </span>which
                includes information about how you use the Website.
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                {" "}
                <span className="font-semibold">
                  Marketing and Communications Data
                </span>
                which includes your preferences in receiving marketing from us
                and our third parties including information about the kind of
                adverts that we believe you are most likely to be interested in.
              </li>
            </ul>
            <p className="privacyText mb-7 2xl:mb-10">
              We also collect, use and share
              <span className="font-semibold">Aggregated Data</span> such as
              statistical or demographic data for any purpose. Aggregated Data
              may be derived from your personal data but is not considered
              personal data in law as this data does not directly or indirectly
              reveal your identity. For example, we may aggregate your Usage
              Data to calculate the percentage of users accessing a specific
              Website feature or purchasing a specific service. However, if we
              combine or connect Aggregated Data with your personal data so that
              it can directly or indirectly identify you, we treat the combined
              data as personal data which will be used in accordance with this
              Privacy Policy.
            </p>
            <p className="privacyText mb-7 2xl:mb-10">
              We are also working closely with third parties (including, for
              example, business partners, sub-contractors in technical, payment
              and delivery services, accountants, marketing agencies,
              advertising networks, analytics providers, search information
              providers, credit reference agencies) and may receive information
              about you from them.
            </p>
            <p className="privacyText mb-7 2xl:mb-10">
              We do not collect any Special Categories of Personal Data about
              you (this includes details about your race or ethnicity, religious
              or philosophical beliefs, sex life, sexual orientation, political
              opinions, trade union membership, information about your health
              and genetic and biometric data). Nor do we collect any information
              about criminal convictions and illegal.
            </p>
            <p className="privacyText mb-7 2xl:mb-10">
              No part of our Website is directed towards children below 13 years
              of age and we do not knowingly collect personal data from anyone
              under the age of 13. If we learn we have collected or received
              personal data from a child under 13 years without verification of
              parental consent, we will promptly delete that personal data from
              our database. If you believe we might have any personal data from
              or about a child under 13 years, please email us at
              support@authentic chef.com
            </p>
            <h3 className="font-semibold mb-2 privacyText">
              2. HOW WE USE YOUR PERSONAL DATA
            </h3>
            <p className="privacyText mb-7 2xl:mb-10">
              Having accurate information about you permits us to provide you
              with a smooth, efficient, and customize service. In this section,
              we set out the purposes for which we use your personal data. If
              you are in a country in the European Economic Area (EEA) or in the
              United Kingdom, in compliance with our obligations under
              applicable laws (the EU General Data Protection Regulation 2016
              and the UK Data Protection Act 2018), we also identify the legal
              basis that we rely on to process such information.
            </p>
            <div className="2xl:my-10 m">
            <div className="overflow-x-auto">
              <table className="table border text-[#000000]">
                {/* head */}
                <thead className="text-[#000000] 2xl:text-[25px] ">
                  <tr className="privacyText">
                    <th className="font-semibold py-5">Purpose</th>
                    <th className="font-semibold py-5">Details </th>
                    <th className="font-semibold py-5">Legal Basis</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr className="privacyText">
                    <td className="py-5 w-3/12">Providing our services</td>
                    <td className="py-5 w-6/12">
                      We will need your personal data to administer our services
                      effectively and carry out our obligations arising from any
                      contracts entered into between you and us. This may
                      include passing your data to third parties such as our
                      business partners, contractors, agents or advisors (e.g.
                      legal, financial, business or other advisors).
                    </td>
                    <td>
                      Contract performance, Legitimate interests (to enable us
                      to perform our obligations and provide our services to
                      you)
                    </td>
                  </tr>

                  <tr className="privacyText">
                    <td className="py-5 w-3/12">Improving our services</td>
                    <td className="py-5 w-6/12">
                      We may collect your personal data for improving our
                      services for purposes of internal training, quality
                      control, research and development. We may also aggregate
                      and/or anonymize your personal data for such purposes.
                    </td>
                    <td className="py-5 w-3/12">
                      Legitimate interests (to allow us to improve our services)
                    </td>
                  </tr>

                  <tr className="privacyText">
                    <td className="py-5 w-3/12">Obtaining feedback</td>
                    <td className="py-5 w-6/12">
                      We may occasionally contact you to request feedback on our
                      products and services, as a part of our continuous
                      research and development practices.
                    </td>
                    <td className="py-5 w-3/12">
                      Legitimate interests (to enable us to gather feedback and
                      improve products and services)
                    </td>
                  </tr>
                  <tr className="privacyText">
                    <td className="py-5 w-3/12">Ensuring relevance</td>
                    <td className="py-5 w-6/12">
                      We may use your personal data to analysis how you use our
                      Website, and to ensure that the products and services that
                      we offer are tailored to your needs and interests. We may
                      also aggregate and/or anonymize your personal data for
                      such purposes.
                    </td>
                    <td className="py-5 w-3/12">
                      Legitimate interests (to allow us to provide you with the
                      content and services on the Website)
                    </td>
                  </tr>
                  <tr className="privacyText">
                    <td className="py-5 w-3/12">Marketing</td>
                    <td className="py-5 w-6/12">
                      We may contact you to provide the latest updates and
                      offers on our products and services, where you have
                      opted-in for such communication. Where required by law, we
                      will ask for your consent at the time we collect your data
                      to conduct any of these types of marketing. We will
                      provide an option to unsubscribe or opt-out of further
                      communication on any electronic marketing communication
                      sent to you or you may opt out by contacting us.
                    </td>
                    <td className="py-5 w-3/12">
                      Consent, Legitimate interest (to keep you updated with
                      news in relation to our products and services)
                    </td>
                  </tr>
                  <tr className="privacyText">
                    <td className="py-5 w-3/12">Informing you of changes</td>
                    <td className="py-5 w-6/12">
                      We may use your personal data to notify you about changes
                      to our services and products.
                    </td>
                    <td className="py-5 w-3/12">
                      Legitimate interests (to notify you about changes to our
                      service); Contract performance
                    </td>
                  </tr>
                  <tr className="privacyText">
                    <td className="py-5 w-3/12">Reorganize our business</td>
                    <td className="py-5 w-6/12">
                      In the event that we are (i) subject to negotiations for
                      the sale of our business or part thereof to a third party,
                      (ii) is sold to a third party or (iii) undergo a
                      re-organization, we may need to transfer some or all of
                      your personal data to the relevant third party (or its
                      advisors) as part of any due diligence process for the
                      purpose of analysis any proposed sale or re-organization.
                      We may also need to transfer your personal data to that
                      re-organized entity or third party after the sale or
                      reorganization for them to use for the same purposes as
                      set out in this Privacy Policy.
                    </td>
                    <td className="py-5 w-3/12">
                      Legitimate interests (in order to allow us to change our
                      business)
                    </td>
                  </tr>
                  <tr className="privacyText">
                    <td className="py-5 w-3/12">
                      Ensuring legal or regulatory compliance
                    </td>
                    <td className="py-5 w-6/12">
                      We may process your personal data to comply with our
                      regulatory requirements or dialogue with its regulators as
                      applicable which may include disclosing your personal data
                      to third parties, the court service and/or regulators or
                      law enforcement agencies in connection with enquiries,
                      proceedings or investigations by such parties anywhere in
                      the world or where compelled to do so. Where permitted, we
                      will direct any such request to you or notify you before
                      responding unless to do so would prejudice the prevention
                      or detection of a crime.
                    </td>
                    <td className="py-5 w-3/12">
                      Legal obligations, Legal claims, Legitimate interests (to
                      cooperate with law enforcement and regulatory authorities)
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>

            <h3 className="font-semibold mb-2 privacyText">
              3. HOW WE SHARE YOUR PERSONAL DATA
            </h3>
            <p className="privacyText mb-7 2xl:mb-10">
              We may share certain personal data that we have collected about
              you in certain situations as follows:
            </p>
            <h4 className="font-semibold mb-2 privacyText privacyText">
              a. Third-Party Service Providers
            </h4>
            <p className="privacyText mb-7 2xl:mb-10">
              We may share your information with third parties that perform
              services for us or on our behalf, including payment processing,
              data analysis, email delivery, hosting services, customer service,
              and marketing assistance.
            </p>
            <h4 className="font-semibold mb-2 privacyText privacyText">
              b. Third-Party Advertisers
            </h4>
            <p className="privacyText mb-7 2xl:mb-10">
              We may use third-party advertising companies to serve ads when you
              visit the Website. These companies may use information about your
              visits to our Website and other websites that are contained in web
              cookies in order to provide advertisements about goods and
              services that may be of interest to you.
            </p>
            <h4 className="font-semibold mb-2 privacyText privacyText">
              c. Marketing Communications
            </h4>
            <p className="privacyText mb-7 2xl:mb-10">
              With your informed consent (opt-in) we may share your information
              with third parties for marketing purposes, as permitted by law.
            </p>
            <h4 className="font-semibold mb-2 privacyText privacyText">
              d. By Law or to Protect Rights
            </h4>
            <p className="privacyText mb-7 2xl:mb-10">
              If we believe the release of information about you is necessary to
              respond to legal process, to investigate or remedy potential
              violations of our policies, or to protect the rights, property,
              and safety of others, we may share your information as permitted
              or required by any applicable law, rule, or regulation. This
              includes exchanging information with other entities for fraud
              protection and credit risk reduction.
            </p>
            <p className="privacyText mb-7 2xl:mb-10">
              We do not sell any personal data under any circumstances
              whatsoever. We disclose only that personal data that is necessary
              for the third party to deliver their specific service and we take
              all reasonable measures to ensure they keep your information fully
              secure and not use it for any purpose other than the one under
              which it was disclosed. All third parties are carefully screened
              so we can ensure that there are adequate controls in place in
              accordance with applicable laws.
            </p>
            <h3 className="font-semibold mb-2 privacyText">
              4. USE OF COOKIES
            </h3>
            <p className="privacyText mb-7 2xl:mb-10">
              Please go through our Cookies Policy to know more about our usage
              of cookies and other tracking technologies in the Website.
            </p>
            <h3 className="font-semibold mb-2 privacyText">
              5. PERSONAL DATA STORAGE AND SECURITY
            </h3>
            <p className="privacyText mb-7 2xl:mb-10">
              The personal data which we hold will be held securely in
              accordance with our internal security policy and the appropriate
              data protection laws as and where applicable. Authentic chef has
              implemented generally accepted standards of technology and
              operational security in order to protect personal data from loss,
              misuse, or unauthorized alteration or destruction. Unfortunately,
              no method of transmission over the Internet, or method of
              electronic storage, is 100% secure. Whilst we strive to use all
              reasonable efforts to protect your personal data, we cannot
              guarantee its absolute security. We will notify you promptly in
              the event of any breach of your personal data which might expose
              you to serious risk. We will never collect sensitive information
              about you without your explicit and informed consent.
            </p>
            <h3 className="font-semibold mb-2 privacyText">
              6. PERSONAL DATA RETENTION AND TRANSFER
            </h3>
            <p className="privacyText mb-7 2xl:mb-10">
              Our retention periods for personal data are based on business
              needs and legal requirements. We will keep your information for as
              long as is necessary for the processing purpose(s) for which they
              were collected and any other permitted linked purpose. We may also
              further retain information in an anonymous or aggregated form
              where that information would not identify you personally. We will
              cease to retain your personal data, or remove the means by which
              the information can be associated with you, as soon as it is
              reasonable to assume that such retention no longer serves the
              purpose for which it was collected, and is no longer necessary for
              legal or business purposes. When we no longer have a purpose for
              retaining your personal data, we will destroy it and take
              commercially reasonable measures to make sure that the information
              is irrecoverable. All third parties are
              carefully screened before transfer of any personal data, so we can
              ensure that there are adequate controls in place and, where
              relevant, that such third parties are fully compliant with the
              applicable laws. In case any of any international transfer of
              personal data, Authentic chef takes all reasonable steps to ensure
              that your personal data continues to receive a standard of
              protection that is at least comparable to that provided under the
              applicable laws.
            </p>
            <h3 className="font-semibold mb-2 privacyText">YOUR RIGHTS</h3>
            <p className="privacyText mb-7 2xl:mb-10">
              Under the applicable privacy laws including GDPR, you possess a
              number of rights in relation to your personal data. These rights
              include
            </p>
            <ul>
              <li className="privacyText mb-7 2xl:mb-10">
                {" "}
                <span className="font-semibold">Request information</span> about
                your personal data. You have the right to be informed about how
                and why your personal data is being collected or processed by
                us.
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                <span className="font-semibold">Request access</span> to your
                personal data (commonly known as a data subject access request).
                This enables you to receive a copy of the personal data we hold
                about you and to check that we are lawfully processing it.
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                <span className="font-semibold">Request correction</span> of the
                personal data that we hold about you. This enables you to have
                any incomplete or inaccurate data we hold about you corrected,
                though we may need to verify the accuracy of the new data you
                provide to us.
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                <span className="font-semibold">Request erasure</span> of your
                personal data. This enables you to ask us to delete or remove
                personal data where there is no good reason for us continuing to
                process it. You also have the right to ask us to delete or
                remove your personal data where you have successfully exercised
                your right to object to processing (see below), where we may
                have processed your information unlawfully or where we are
                required to erase your personal data to comply with local law.
                Note, however, that we may not always be able to comply with
                your request of erasure for specific legal reasons which will be
                notified to you, if applicable, at the time of your request.
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                {" "}
                <span className="font-semibold">Object to processing</span> of
                your personal data where we are relying on a legitimate interest
                (or those of a third party) and there is something about your
                situation which makes you want to object to processing on this
                ground as you feel it impacts on your fundamental rights and
                freedoms. You also have the right to object where we are
                processing your personal data for direct marketing purposes. In
                some cases, we may demonstrate that we have compelling
                legitimate grounds to process your information which override
                your rights and freedoms.
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                {" "}
                <span className="font-semibold">
                  Request restriction of processing
                </span>{" "}
                of your personal data. This enables you to ask us to suspend the
                processing of your personal data in the following scenarios: (a)
                if you want us to establish the data accuracy; (b) where our use
                of the data is unlawful but you do not want us to erase it; (c)
                where you need us to hold the data even if we no longer require
                it as you need it to establish, exercise or defend legal claims;
                or (d) you have objected to our use of your data but we need to
                verify whether we have overriding legitimate grounds to use it.
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                <span className="font-semibold">Request transfer</span> of your
                personal data to you or to a third party. We will provide to
                you, or a third party you have chosen, your personal data in a
                structured, commonly used, machine-readable format. Note that
                this right only applies to automated information which you
                initially provided consent for us to use or where we used the
                information to perform a contract with you.
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                {" "}
                <span className="font-semibold">
                  Withdraw consent at any time
                </span>{" "}
                where we are relying on consent to process your personal data.
                However, this will not affect the lawfulness of any processing
                carried out before you withdraw your consent. If you withdraw
                your consent, we may not be able to provide certain products or
                services to you. We will advise you if this is the case at the
                time you withdraw your consent.
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                We are committed to upholding these rights at all times. If you
                wish to exercise any of these rights, please send us a request
                that (a) provides sufficient detail to allow us to verify that
                you are the person about whom we have collected personal data,
                and (b) describes your request in sufficient detail to allow us
                to understand, evaluate, and respond to it not later than 45
                days. Please note we cannot respond to requests that do not
                adequately meet the above criteria.
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                If you have any further questions, comments or requests
                regarding this Privacy Policy, please contact us at
                support@authentic chef.com.
              </li>
              <li className="privacyText mb-7 2xl:mb-10">
                This Privacy Policy was last updated in April 2024.
              </li>
            </ul>

            <h3 className="font-semibold my-5 2xl:my-10 2xl:text-[35px]">
              COOKIES POLICY
            </h3>

            <p className="privacyText mb-7 2xl:mb-10">
              This Cookies Policy explains how Authentic chef uses cookies and
              similar technologies on their Website to collect certain
              information about you. This document explains what these
              technologies are and why we use them, as well as your rights to
              control our use of them. Authentic chef reserves the right to update
              and modify this Cookies Policy at any time and for any reason. You
              are encouraged to periodically review this document to stay
              informed of updates.
            </p>

            <h3 className="font-semibold mb-2 privacyText">
              1. WHAT ARE COOKIES
            </h3>
            <p className="privacyText mb-7 2xl:mb-10">
              Cookies are text files containing small amounts of information
              which are downloaded to your computer or mobile device when you
              visit a website. Cookies are widely used to make websites function
              more efficiently, help you navigate between the different pages of
              the website, or remember information about you, such as your
              language preference or login information.
            </p>

            <p className="privacyText mb-7 2xl:mb-10">
              Cookies are broadly of two types: first-party cookies and
              third-party cookies. First-party cookies are set directly by us.
              Third-party cookies are set from a domain different than the
              domain of the website you are visiting, or in other words, are
              served by a third party on our behalf. Third-party cookies are
              typically used for web analytics, performance, and marketing
              activities.
            </p>

            <p className="privacyText mb-7 2xl:mb-10">
              Authentic chef uses cookies and other tracking technologies for the
              following purposes:
            </p>

            <p className="privacyText mb-7 2xl:mb-10">
              Assisting you in navigation of our Website;
            </p>

            <p className="privacyText mb-7 2xl:mb-10">
              Assisting you in submitting your order, inquiry, or feedback;
            </p>

            <p className="privacyText mb-7 2xl:mb-10">
              Analyzing your use of our Website;
            </p>

            <p className="privacyText mb-7 2xl:mb-10">
              Assisting you with our promotional and marketing efforts
              (including behavioral advertising).
            </p>

            <p className="privacyText mb-7 2xl:mb-10">
              Cookies can be programmed to remain on your computer or mobile
              device for various periods of time. Session cookies are temporary
              cookies that exist only while your browser is open and are deleted
              automatically when you close your browser. Persistent cookies are
              more permanent in nature and remain on your device even after the
              browser is closed (for example, to remember your user preferences
              when you return to the site). These cookies do not collect or
              store any personally identifiable information. You can refuse the
              use of cookies or you can opt-out of each cookie category (except
              strictly necessary cookies) by clicking on the “cookie settings”
              button.
            </p>

            <h3 className="font-semibold mb-2 privacyText">
              2. THE TYPES OF COOKIES WE USE
            </h3>
            <p className="privacyText mb-7 2xl:mb-10">
              Below is a list of the main cookies we use on our Website and a
              brief explanation of their use. A complete list of all the cookies
              used by Authentic chef appears in Appendix 1.
            </p>

            <p className="privacyText mb-7 2xl:mb-10">
              Strictly necessary cookies: These cookies are essential in order
              to enable you to move around our Website and use its features.
              Without these cookies, services you have asked for (such as
              navigating between pages) cannot be provided.
            </p>

            <p className="privacyText mb-7 2xl:mb-10">
              Performance Cookies: These cookies collect information about how
              you use our Website, such as which pages users visit most often
              and if they receive error messages from web pages. They are used
              to improve how the website works. We use Google Analytics and
              similar analytical tools, which use performance cookies to provide
              us with information on how the Website is performing and how you
              use it.
            </p>

            <p className="privacyText mb-7 2xl:mb-10">
              Targeting Cookies: These cookies may be set through our Website by
              our advertising partners to record information about your visit,
              build a profile of your interests, and show you relevant
              advertisements on other websites. They record the pages you have
              visited, the links you have followed, the number of times you have
              seen a particular advertisement, the advertisements you have
              clicked on, etc. If you do not allow these cookies, you will
              experience less targeted advertising. These cookies do not
              directly store personal information but are based on uniquely
              identifying your browser and internet device.
            </p>

            <h3 className="font-semibold mb-2 privacyText">
              3. OTHER TRACKING TECHNOLOGIES
            </h3>
            <p className="privacyText mb-7 2xl:mb-10">
              In addition to the different types of cookies mentioned above, we
              may use other similar technologies from time to time, like web
              beacons (sometimes called tracking pixels or clear gifs).
              These are tiny graphics files that contain a unique identifier
              that enable us to recognize when someone has visited our Website
              or opened an e-mail including them. This allows us, for example,
              to monitor the traffic patterns of users from one page within the
              Website to another, to deliver or communicate with cookies, to
              understand whether you have come to the Website from an online
              advertisement displayed on a third-party website, to improve
              Website performance, and to measure the success of e-mail
              marketing campaigns. In many instances, these technologies rely on
              cookies to function properly, and declining cookies will impair
              their functioning.
            </p>

            <h3 className="font-semibold mb-2 privacyText">
              4. HOW TO CONTROL OR DELETE COOKIES
            </h3>
            <p className="privacyText mb-7 2xl:mb-10">
              If you do not want to receive cookies, you can modify your browser
              so that it notifies you when cookies are sent to it, or you can
              refuse cookies altogether. You can also delete cookies that have
              already been set. However, please note that we may still use
              certain information collected from cookies prior to your
              deletion/disabled preference being set. We will stop using the
              deleted/disabled cookie to collect any further information.
            </p>

            <p className="privacyText mb-7 2xl:mb-10">
              If you wish to restrict or block web browser cookies that are set
              on your device, you can do this through your browser settings; the
              Help function within your browser should tell you how.
              Alternatively, you may wish to visit www.aboutcookies.org or
              www.allaboutcookies.org (link is external), which contains
              comprehensive information on how to do this on a wide variety of
              desktop browsers.{" "}
            </p>

            <p className="privacyText mb-7 2xl:mb-10">
              This Cookies Policy does not cover third party websites. Please
              note that this Cookies Policy does not apply to, and Authentic chef
              is not responsible for, the privacy practices of third party
              websites which may be linked to or accessible through our Website.
            </p>
            <p className="privacyText mb-7 2xl:mb-10">
              If you have any further questions, comments or requests regarding
              this Cookies Policy, please email us at support@authentic chef.com.
            </p>

            <h3 className="privacyText font-semibold mb-2 privacyText">
              APPENDIX 1 - FULL LIST OF AUTHENTIc CHEF WEBSITE COOKIES
            </h3>

            <div className="2xl:my-10 my-5">
              <table className="table border text-[#000000]">
                {/* head */}
                <thead className="text-[#000000] 2xl:text-[25px] ">
                  <tr className="privacyText">
                    <th className="font-semibold py-5">Cookie Name</th>
                    <th className="font-semibold py-5">Category </th>
                    <th className="font-semibold py-5">
                      Description and Purpose
                    </th>
                    <th className="font-semibold py-5">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="privacyText">
                    <td className="py-5 w-2/12">[insert name of cookie]</td>
                    <td className="py-5 w-3/12">
                      insert category - such as Strictly necessary cookie or
                      Functional cookie
                    </td>
                    <td className="py-5 w-5/12">
                      [insert brief description - such as This cookie is used
                      to track landing pages.]
                    </td>
                    <td className="py-5 w-2/12">
                      [insert the expiry period of the cookie - such as 7
                      Days]
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="privacyText mb-7 2xl:mb-10">
              This Cookies Policy was last updated in April 2024
            </p>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default PrivacyPolicy;
