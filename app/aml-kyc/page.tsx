import React from "react";

export default function AmlKycPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">AML/KYC POLICY</h1>
        <p className="text-gray-500 mb-10">Last Updated: February, 2022</p>

        <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
          <p>
            This document gives an overview of the standards of the “Know Your Customer” and “Anti-Money Laundering” policies, thereby setting our practices for the prevention of money-laundering activities while dealing with our users.
          </p>
          <p>
            The objective of AML/KYC Policy is to prevent Changelly from being used, intentionally or unintentionally, by criminal elements for money-laundering activities. The Policy also mandates making reasonable efforts to determine the true identity and beneficial ownership of accounts, source of funds, the nature of customer’s business, the reasonableness of operations in the account in relation to the customer’s business, etc., which in turn helps us to manage its risks prudently.
          </p>
          <p>
            We strive to protect our customers from fraudulent and scam activities in the crypto assets sphere. Changelly employs a steadfast approach in the implementation of the latest recommendations and revised guidelines by FATF, European Parliament, and regulators of the financial industry by and large. Our in-compliance policy stance is designed to detect funds proven to be involved in illicit activities as well as to protect the funds of our customers who have fallen victims to hacks, ransomware and malware attacks. The toolkit at work committed to fighting money laundering and its implications is comprised of policy regulations in conjunction with recent developments in software aimed at tracking suspicious transactions in real time.
          </p>
          <p>
            Our AML/KYC Policy, procedures, and internal controls are designed to ensure compliance with all applicable regulations and rules and will be reviewed and updated on a regular basis to ensure appropriate policies, procedures, and internal controls are in place, to account for both changes in regulations and changes in our business.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">Glossary:</h3>
          <ul className="list-none space-y-2">
            <li><strong>AML</strong> - Anti-Money Laundering</li>
            <li><strong>KYC</strong> - Know Your Customer</li>
            <li><strong>CIP</strong> - Customer Identification Program</li>
            <li><strong>PEP</strong> - Politically Exposed Persons</li>
            <li><strong>STR</strong> - Suspicious Transaction Reporting</li>
            <li><strong>SAR</strong> - Suspicious Activity Reporting</li>
          </ul>

          <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">The Policy covers the following matters:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>CUSTOMER IDENTIFICATION PROCEDURE (CIP)</li>
            <li>RECORDKEEPING</li>
            <li>AML COMPLIANCE OFFICER</li>
            <li>MONITORING OF TRANSACTIONS</li>
            <li>RISK MANAGEMENT</li>
            <li>COLLABORATION WITH LAW ENFORCEMENT AGENCIES</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. CUSTOMER IDENTIFICATION PROCEDURE (CIP)</h2>
          <p>CIP applies to transactions that are spotted by our scoring system as suspicious. We will collect certain customer identification information from each customer who passes CIP; utilize risk-based measures to verify the identity of each customer who passes CIP; record customer identification information and the verification methods and results; provide adequate CIP notice to customers that we will seek identification information from to verify their identities.</p>
          
          <h4 className="font-bold mt-4">a. Identification</h4>
          <p>In case a transaction is spotted by our risk scoring system as suspicious, the transaction will be put on hold, and we will collect the following information from the customers, if applicable, from any person, entity, or organization:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>the full name;</li>
            <li>date of birth (for an individual);</li>
            <li>the address, which will be residential and business street address (for an individual) or a principal place of business, local office, or other physical location (for a person other than an individual); and</li>
            <li>for an individual, a valid government-issued identification, evidencing nationality or residence and bearing a photograph or a similar safeguard, such as a driver’s license or passport; and for a person other than an individual, documents showing the existence of the entity, such as certified articles of incorporation, a government-issued business license, a partnership agreement or a trust instrument.</li>
          </ul>
          <p>The customer has an obligation to update all the information if there is any change.</p>

          <h4 className="font-bold mt-4">b. Customers Who Provide Misleading Information</h4>
          <p>After providing the information, the customer must ensure that the information is true, complete, and timely updated. If there are any grounds for believing that any of the information customer provided is incorrect, false, outdated, or incomplete, we reserve the right to send the customer a notice to demand correction and, as the case may be, blacklist the existing account and terminate all or part of the services we provide for the said customer.</p>

          <h4 className="font-bold mt-4">c. Verifying Information</h4>
          <p>Based on the risk, and to the extent reasonable and practicable, we will proceed with the verification to the extent that we have collected all information needed in order to know the true identity of our customers by using risk-based procedures to verify and document the accuracy of the information we get about our customers.</p>
          <p>We have appointed a Third-Party service provider, namely Sum & Substance Ltd, which entirely complies with our Privacy Policy in respect to processing the personal information of our customers. Sum & Substance Ltd will analyze the information we obtain to determine (1) whether the information is sufficient to form a reasonable belief that we know the true identity of the customer (e.g., whether the information is logical or contains inconsistencies); (2) whether the documents provided by the customers are valid and do not appear in the Specially Designated Nationals and Blocked Persons List or any other lists of sanctioned individuals.</p>
          <p>We will verify the information within a reasonable time, depending on the nature of the account and risk level of transactions. We may refuse to complete a transaction before we have verified the information, or in some instances, when we need more time, we may, pending verification, restrict transactions and the associated account under suspicion. If we find suspicious information that indicates possible money laundering, terrorist financing activity, or other suspicious activity, we will, after internal consultation with the firm’s AML Compliance Officer, file a SAR/STR in accordance with applicable laws and regulations.</p>

          <h4 className="font-bold mt-4">d. Lack of Verification</h4>
          <p>When we cannot form a reasonable belief that we know the true identity of a customer, we will do the following: (1) request additional information; (2) not verify an account; (3) blacklist account after attempts to verify the customer’s identity fail; and (4) determine whether it is necessary to file a SAR/STR in accordance with applicable laws and regulations.</p>

          <h4 className="font-bold mt-4">e. Notice to Customers</h4>
          <p>We provide notice to customers that their transactions may be subject to AML/KYC checks. This information is stated in full detail in our Terms of Use, and each customer is obliged to get acquainted with these Terms before initiating transactions.</p>

          <h4 className="font-bold mt-4">f. Reliance on Another Institution for Identity Verification</h4>
          <p>We may, under the following circumstances, rely on the performance of some or all of the elements of our CIP by an exchange, trading platform, crypto wallet (including an affiliate) with respect to any customer that is opening an account or has established an account or similar business relationship with the other company to provide or engage in services, dealings, or other financial transactions:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>when such reliance is reasonable under the circumstances; and</li>
            <li>when the other institution has entered into a contract with our company requiring it to certify annually to us that it has implemented its anti-money-laundering program and that it will fulfill (or its agent will fulfill) specified requirements of the customer identification program</li>
          </ul>

          <h4 className="font-bold mt-4">g. Enhanced Due Diligence</h4>
          <p>We conduct Enhanced Due Diligence in connection will all customers or accounts that are determined as posing potential high risk and are determined to warrant enhanced scrutiny. We have established procedures to decline to do business with or discontinue relationships with any customer when we cannot adequately complete necessary Enhanced Due Diligence or when the information received is deemed to have a significant adverse impact on reputational risk. The following are the indicative list where the risk perception of a customer may be considered higher: (1) customers requesting an exchange of untraceable cryptocurrencies; (2) an ongoing investigation in regards to customers; (3) the trading activity appears to be from higher-risk countries; (4) virtual asset transfers above the threshold set by the FATF guidelines; (5) Politically Exposed Persons.</p>
          <p>Enhanced Due Diligence may be in the nature of keeping the account monitored closely for the recategorization of risk, update of KYC documents, etc</p>
          <p>Enhanced Due Diligence implies checking the source of funds. Among the proofs accepted for verification are the following: exchange accounts with the history of trading, receipts from cryptocurrency sellers, or proofs of mining activity.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. RECORDKEEPING</h2>
          <p>We will document our verification, including all identifying information provided by a customer, the methods used and results of verification, and the resolution of any discrepancies identified in the verification process.</p>
          <p>According to the documentation of Sum Substance, all User data obtained during the KYC procedure is encrypted and stored on GDPR-compliant Amazon servers, which are located in the EU. These are kept at Uptime Institute classified Tier III data centers compliant with TIA-942 and PCI DSS standards. The data centers are protected technically and guarded physically around the clock by specially audited security personnel.</p>
          <p>We will retain records of all identification information for five years after the account has been closed; we will retain records made about verification of the customer’s identity for five years after the record is made.</p>
          <p>The above-mentioned records can be made available to the competent authorities upon request.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. AML COMPLIANCE OFFICER</h2>
          <p>The AML Compliance Officer is the person, duly authorized by Changelly, whose responsibility is to implement and effectively monitor the application and enforcement of the AML/KYC policy as outlined in this document. The AML Compliance Officer is obliged to oversee and conduct effective monitoring of all aspects of Changelly’s anti-money laundering and counter-terrorist financing. Any suspicious behavior or activities should be reported to the AML Compliance Officer.</p>
          <p>Communication with the AML Compliance Officer in regards to this Policy is conducted via compliance@changelly.com.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. MONITORING OF TRANSACTIONS</h2>
          <p>Ongoing monitoring is an essential element of effective KYC procedures. We have an understanding of the normal and reasonable activity of the customer, ensuring that we have the means of identifying transactions that fall outside the regular pattern of activity. However, the extent of monitoring will depend on the risk sensitivity of the account. High-risk accounts have to be subjected to intensified monitoring. In case of sudden swaps of big amounts, these accounts can be flagged by the risk scoring system as low, medium, or high risk.</p>
          <p>We have implemented a Know-Your-Transaction service that is the real-time anti-money-laundering compliance solution for monitoring cryptocurrency transactions. As a result of its targeted approach, it empowered our Changelly compliance team to significantly speed up the detection of transactions with fraudulent funds involved.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. RISK MANAGEMENT</h2>
          <p>We have put in place appropriate procedures to ensure the effective implementation of KYC guidelines. The implementation procedure covers proper management oversight, systems and controls, segregation of duties, training, and other related matters. From time to time, the Changelly compliance team will carry on the necessary quality checks and file audits to ensure that the KYC policies and procedures are adhered to. From time to time, the Changelly compliance team shall update senior management about issues arising during the customer acquisition process.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. COLLABORATION WITH LAW ENFORCEMENT AGENCIES</h2>
          <p>We obtain and hold required and accurate originator information and required beneficiary information on virtual asset transfers and make it available to appropriate authorities on official request.</p>
        </div>
      </div>
    </div>
  );
}
