import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "What happens if I don't respond to a lawsuit?",
      answer: "If you don't respond within the required timeframe (typically 20-30 days), the court may enter a default judgment against you. This means the plaintiff automatically wins and can collect the full amount claimed, plus interest and fees. You could face wage garnishment, bank account seizure, or property liens."
    },
    {
      question: "Is this legal service available in my state?",
      answer: "Yes! Our AI system covers all 50 states and incorporates state-specific Rules of Civil Procedure, local court rules, and county-specific requirements. We continuously update our database to ensure compliance with the latest legal requirements in your jurisdiction."
    },
    {
      question: "How accurate are the AI-generated legal documents?",
      answer: "Our AI has a 99% accuracy rate for document formatting and legal compliance. However, we always recommend reviewing documents with a local attorney if your case involves complex issues. Our system is designed to handle standard debt collection, eviction, and contract disputes effectively."
    },
    {
      question: "Can I use these documents in small claims court?",
      answer: "Absolutely! Our system automatically detects the court type and adjusts document formatting accordingly. Small claims courts have different rules than superior courts, and our AI accounts for these differences in each state."
    },
    {
      question: "What if I was improperly served with the lawsuit?",
      answer: "Our AI analyzes service methods and can identify potential service defects. If improper service is detected, we'll generate a Motion to Quash Service or include service-related defenses in your Answer, depending on your state's requirements."
    },
    {
      question: "Do you provide legal advice?",
      answer: "No, we provide document preparation services only. We don't give legal advice or represent you in court. Our AI generates legally compliant documents based on your case information, but you should consult with an attorney for complex legal strategy."
    },
    {
      question: "How long does it take to generate documents?",
      answer: "Most documents are generated within 3-5 minutes after uploading your lawsuit. Complex cases with multiple defendants or claims may take up to 10 minutes. You'll receive email notifications when your documents are ready."
    },
    {
      question: "What types of lawsuits can you handle?",
      answer: "We specialize in debt collection, credit card lawsuits, medical debt, evictions, landlord-tenant disputes, breach of contract, and consumer protection cases. Our system can handle most civil litigation matters but may not be suitable for family law, criminal, or complex commercial cases."
    },
    {
      question: "Can I request a jury trial?",
      answer: "Yes! Our system automatically determines if jury trials are available for your case type and jurisdiction. If eligible, we'll include jury demand forms and instructions for your state's specific requirements."
    },
    {
      question: "What if the plaintiff doesn't have standing to sue?",
      answer: "Our AI analyzes ownership and standing issues, particularly in debt collection cases. If standing problems are detected, we'll include 'Lack of Standing' as an affirmative defense and may suggest a Motion to Dismiss based on your state's requirements."
    },
    {
      question: "Do you handle FDCPA or FCRA violations?",
      answer: "Yes! Our system automatically scans for Fair Debt Collection Practices Act (FDCPA) and Fair Credit Reporting Act (FCRA) violations. We'll include relevant defenses and may suggest counterclaims where appropriate."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied with the quality of your documents or if they don't meet your state's formatting requirements, we'll provide a full refund."
    },
    {
      question: "How do I file the documents with the court?",
      answer: "Each document package includes detailed, court-specific filing instructions. We provide information on whether your court accepts online filing, requires in-person filing, or accepts mail filing, along with applicable fees and deadlines."
    },
    {
      question: "What about statute of limitations defenses?",
      answer: "Our AI automatically calculates statute of limitations periods based on your state's laws and the type of debt or claim. If the statute has expired, we'll prominently include this as an affirmative defense."
    },
    {
      question: "Can I modify the generated documents?",
      answer: "Yes! All documents are provided in both PDF and editable DOCX formats. You can modify them as needed, but we recommend consulting with an attorney before making significant changes to ensure legal compliance."
    },
    {
      question: "Do you store my personal information?",
      answer: "We use bank-level encryption and store your information securely for 1 year so you can access your documents anytime. You can request deletion of your data at any time. We never share your information with third parties."
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Get answers to common questions about lawsuit defense and our AI-powered service.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Legal Questions & Answers</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our legal experts are available 24/7 to help you understand your options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@lawsuitdefense.ai" className="text-blue-600 hover:underline">
              Email Support
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a href="tel:1-800-LAWSUIT" className="text-blue-600 hover:underline">
              Call 1-800-LAWSUIT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;