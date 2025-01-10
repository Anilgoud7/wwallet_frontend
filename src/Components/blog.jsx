import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="bg-gray-50"
      style={{
        width: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        padding: '20mm',
        boxShadow: '0 0 5px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        textAlign: 'justify',
      }}
    >
      {/* Navigation */}
      <nav className="bg-white border-b mb-6">
        <div className="max-w-full px-6 py-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Content Container */}
      <div className="max-w-full border border-gray-200 rounded-lg">
        <article className="px-6 py-12">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              The Unorganized Workforce in India
            </h1>
            <p className="text-gray-500 mb-8">Jan 1, 2025 • 10 min read</p>
            <p className="text-xl text-gray-700 leading-relaxed p-6 border border-gray-300 rounded-lg bg-gray-100">
              India, a rapidly developing nation, boasts a massive workforce, a significant portion of which belongs to the unorganized sector. 
              These workers contribute immensely to the economy yet remain vulnerable due to the lack of formal recognition, benefits, and protections. 
              This article explores the unorganized workforce in India, shedding light on their contribution, challenges, and potential solutions.
            </p>
          </header>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
              Statistics of the Unorganized Workforce
            </h2>
            <p className="mb-6">
              The scale of India's unorganized workforce is staggering. Approximately 450 million people are part of the workforce, 
              with nearly 90% (around 405 million) employed in the unorganized sector. This sector contributes to around 50% of 
              India's GDP, forming the backbone of crucial sectors like agriculture, construction, textiles, and domestic work.
            </p>
            <p className="mb-6">
              The demographic makeup is diverse, with a large portion consisting of migrants, daily wage laborers, and contract workers. 
              Women make up a significant percentage, especially in sectors like domestic work and handicrafts. This workforce's 
              contribution is immense, yet they remain among the most vulnerable segments of society.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
              Sector-Wise Contribution
            </h2>
            <p className="mb-4">
              The agriculture sector employs 54% of the unorganized workforce, primarily consisting of farmers and farm laborers. 
              Despite being the largest employer, it remains highly vulnerable due to seasonal dependency and fluctuating incomes. 
              The unpredictable nature of agricultural work often leaves these workers financially insecure.
            </p>
            <p className="mb-4">
              Construction accounts for 12% of the workforce, including daily wage laborers, masons, and electricians. While it's 
              one of the fastest-growing sectors, it notably lacks formal contracts and adequate safety measures, leaving workers 
              exposed to various risks and uncertainties.
            </p>
            <p className="mb-4">
              The manufacturing and handicrafts sector, employing 10% of the workforce, includes workers in small-scale industries, 
              artisans, and weavers. These workers frequently face exploitation and irregular payment issues, despite their 
              significant contribution to India's cultural and economic fabric.
            </p>
            <p className="mb-6">
              The services sector, comprising 24% of the workforce, includes domestic workers, drivers, security personnel, and 
              delivery workers. Most operate without formal agreements, social security, or fixed wages, making them particularly 
              vulnerable to economic instability.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
              Problems of Not Recording Work Payments
            </h2>
            <p className="mb-4">
              The lack of proper payment records creates significant challenges for workers. Without documented transactions, 
              workers often face delays or complete denial of payments, leaving them without legal recourse to claim their 
              rightful wages. This absence of financial documentation also excludes them from formal banking systems and credit facilities.
            </p>
            <p className="mb-4">
              Social security remains a distant dream for most unorganized workers. Without formal employment records, they 
              cannot access benefits like health insurance, pension, or maternity leave. This exclusion from government welfare 
              schemes further compounds their vulnerability.
            </p>
            <p className="mb-6">
              The absence of payment records also enables widespread exploitation and wage theft. Employers can easily underpay 
              workers or withhold wages without consequence, perpetuating cycles of poverty and economic instability among 
              worker families.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
              Benefits of Channelizing Work Payments
            </h2>
            <p className="mb-4">
              Formalizing payment channels could significantly improve workers' lives through economic empowerment. Regular, 
              recorded payments would provide financial security and enable access to credit and savings schemes, helping 
              workers build more stable financial futures.
            </p>
            <p className="mb-4">
              Proper payment documentation would unlock access to social security benefits and welfare schemes. Workers could 
              finally avail themselves of health insurance, pensions, and other social protections, creating a crucial safety 
              net during emergencies or periods of unemployment.
            </p>
            <p className="mb-4">
              Digital payment records would increase transparency and reduce exploitation. With verifiable payment histories, 
              workers would have legal recourse against wage theft and underpayment, while employers would be more accountable 
              for their payment practices.
            </p>
            <p className="mb-6">
              Ultimately, channelizing payments would contribute to the broader formalization of India's economy. This 
              transformation would enable better workforce planning, more effective policymaking, and more equitable resource 
              allocation, benefiting both workers and the nation as a whole.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Blog;
