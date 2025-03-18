
import { Bot, CheckCircle, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <CheckCircle className="h-6 w-6 text-movesync-blue" />,
    title: "Everything in One Place",
    desc: "No more juggling between different websites and services. Access all your relocation tools from a single dashboard."
  },
  {
    icon: <Bot className="h-6 w-6 text-movesync-blue" />,
    title: "AI-Powered Recommendations",
    desc: "Get personalized property, job, and service recommendations based on your preferences and needs."
  },
  {
    icon: <Globe className="h-6 w-6 text-movesync-blue" />,
    title: "Real-Time Visa Updates",
    desc: "Stay informed about your visa application status and receive alerts for important deadlines and requirements."
  }
];

const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 px-4">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="h-12 w-12 rounded-full bg-movesync-blue/10 flex items-center justify-center mb-4">
            {feature.icon}
          </div>
          <h3 className="font-semibold text-lg mb-3 text-gray-900">{feature.title}</h3>
          <p className="text-movesync-gray-dark leading-relaxed">
            {feature.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureCards;
