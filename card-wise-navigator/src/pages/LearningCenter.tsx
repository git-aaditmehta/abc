import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LearningCenter = () => {
  const topics = [
    {
      title: "Understanding Credit Card Reports",
      description: "Learn how to read and interpret your credit card statements, identify key information, and use reports to manage your finances effectively.",
      icon: "📊"
    },
    {
      title: "Maximizing Sign-Up Bonuses",
      description: "Discover strategies to optimize and maximize welcome offers, timing applications, and meeting spending requirements to get the most value.",
      icon: "🎁"
    },
    {
      title: "Understanding Your Credit Score",
      description: "Learn what factors impact your credit score, how credit card usage affects it, and strategies to improve and maintain a healthy score.",
      icon: "📈"
    },
    {
      title: "Advanced Card Strategies",
      description: "Explore expert techniques like card combinations, category spending optimization, rotating category maximization, and more.",
      icon: "🧠"
    },
    {
      title: "Avoiding Common Credit Card Pitfalls",
      description: "Identify and avoid fees, interest charges, and debt traps that can undermine the benefits of credit card rewards.",
      icon: "⚠️"
    },
    {
      title: "Travel Hacking Basics",
      description: "Learn how to use credit card points and miles effectively for flights, hotels, and other travel expenses.",
      icon: "✈️"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Credit Card Learning Center</h1>
            <p className="text-xl md:text-2xl max-w-2xl">
              Expand your knowledge about credit cards and develop strategies to maximize benefits while minimizing costs.
            </p>
          </div>
        </section>

        {/* Topics Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Knowledge Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topics.map((topic, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="text-4xl mb-4">{topic.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-blue-700">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                  <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Updated With Credit Card Tips</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest insights, strategies, and offers directly to your inbox.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded flex-grow text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-blue-500 rounded font-semibold hover:bg-blue-400 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LearningCenter; 