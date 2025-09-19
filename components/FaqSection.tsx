import React, { useState } from 'react';

const faqs = [
  {
    question: "How does the free AI image generator work?",
    answer: "Our AI image generator uses advanced machine learning models to interpret your text prompts and create corresponding images. The AI has been trained on vast datasets to understand the relationship between descriptions and visual elements, allowing it to generate original images that match your specifications."
  },
  {
    question: "What are tokens and how do they work?",
    answer: "Tokens are credits used to generate images. Each image generation costs 50 tokens, regardless of the settings you choose. You receive tokens when you sign up and can earn more through various activities on the platform."
  },
  {
    question: "Can I use the generated images commercially?",
    answer: "Yes, images generated through our platform can be used for commercial purposes. You retain full rights to the images you create, including for business, marketing, and monetization purposes."
  },
  {
    question: "What makes a good prompt?",
    answer: "Effective prompts are descriptive and specific. Include details about the subject, setting, lighting, colors, mood, and artistic style. Avoid ambiguous terms and be clear about what you want to see. The more detail you provide, the better the AI can match your vision."
  }
];

const FaqItem: React.FC<{ faq: { question: string, answer: string }, isOpen: boolean, toggle: () => void }> = ({ faq, isOpen, toggle }) => {
    return (
        <div className="border-b border-slate-700">
            <button
                onClick={toggle}
                className="w-full flex justify-between items-center text-left py-4"
            >
                <span className="font-semibold text-slate-200">{faq.question}</span>
                 <svg
                    className={`w-5 h-5 text-slate-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && (
                <div className="pb-4 text-slate-400">
                    <p>{faq.answer}</p>
                </div>
            )}
        </div>
    );
};

export const FaqSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 border-t border-slate-800">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-white mb-8">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <FaqItem
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            toggle={() => toggleFaq(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
