import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! 👋 I'm your LMS assistant. I can help you find courses, guide you through enrollment, and answer any questions about our platform. What would you like to know?",
            isBot: true,
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const courseTopics = {
        'programming': ['javascript', 'python', 'java', 'react', 'node', 'web development', 'coding', 'software'],
        'design': ['ui', 'ux', 'graphic', 'photoshop', 'figma', 'web design'],
        'business': ['marketing', 'management', 'finance', 'entrepreneurship', 'sales'],
        'data': ['data science', 'machine learning', 'ai', 'analytics', 'sql'],
        'mobile': ['android', 'ios', 'flutter', 'react native', 'mobile app']
    };

    const getDetailedResponse = (userMessage) => {
        const message = userMessage.toLowerCase();

        // Greeting responses
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return 'Hello! 👋 Welcome to our LMS platform. I\'m here to help you with courses, enrollment, and navigation. What would you like to know?';
        }

        // Course-related queries
        if (message.includes('course') || message.includes('subject') || message.includes('class')) {
            if (message.includes('how many') || message.includes('total')) {
                return 'We have a wide variety of courses across different categories like Programming, Design, Business, and Data Science. You can see all available courses by visiting the "All Courses" section.';
            }
            if (message.includes('free')) {
                return 'We offer both free preview lectures and paid courses. Many courses have free preview videos that you can watch before enrolling.';
            }
            if (message.includes('best') || message.includes('recommend')) {
                return 'Our most popular courses include Web Development, Python Programming, UI/UX Design, and Data Science. Check the ratings and reviews to find the best fit for you!';
            }
            return 'We offer courses in Programming, Design, Business, Data Science, and more. You can browse all courses in the "All Courses" section. What specific topic are you interested in?';
        }

        // Check for specific course topics
        for (const [category, topics] of Object.entries(courseTopics)) {
            if (topics.some(topic => message.includes(topic))) {
                switch (category) {
                    case 'programming':
                        return `Great choice! We have excellent ${topics.find(t => message.includes(t))} courses. Our programming section includes beginner to advanced levels with hands-on projects. Check out our "Programming" category!`;
                    case 'design':
                        return `Perfect! Our design courses cover UI/UX, graphic design, and modern tools like Figma. These courses include practical projects to build your portfolio.`;
                    case 'business':
                        return `Excellent! Our business courses cover entrepreneurship, marketing, and management. These are great for career advancement and starting your own business.`;
                    case 'data':
                        return `Amazing! Data Science and AI are in high demand. Our courses cover Python, machine learning, and real-world data projects.`;
                    case 'mobile':
                        return `Great! Mobile app development is very popular. We have courses on both native and cross-platform development.`;
                }
            }
        }

        // Enrollment queries
        if (message.includes('enroll') || message.includes('join') || message.includes('register')) {
            if (message.includes('how')) {
                return 'To enroll in any course:\n1️⃣ Browse courses and click on one you like\n2️⃣ Review the course details and curriculum\n3️⃣ Click "Enroll Now" button\n4️⃣ You\'ll be enrolled instantly!\n\nMake sure you\'re logged in first.';
            }
            if (message.includes('free')) {
                return 'Yes! We offer direct enrollment for all courses. Just click "Enroll Now" on any course page and you\'ll get instant access to all lectures.';
            }
            return 'Enrollment is simple! Just click on any course card, review the details, and hit "Enroll Now". You\'ll get immediate access to all course content.';
        }

        // Profile and account queries
        if (message.includes('profile') || message.includes('account') || message.includes('settings')) {
            return 'You can manage your profile by:\n👤 Clicking on your profile icon in the navigation\n✏️ Selecting "Edit Profile" to update information\n📚 Viewing "Enrolled Courses" to see your progress\n\nNeed help with a specific profile feature?';
        }

        // Navigation help
        if (message.includes('navigate') || message.includes('find') || message.includes('where')) {
            return 'Here\'s how to navigate our platform:\n🏠 Home - Course overview and featured content\n📚 All Courses - Browse all available courses\n👤 Profile - Your account and enrolled courses\n🎓 Dashboard - For educators to manage courses\n\nWhat specific page are you looking for?';
        }

        // Video/lecture queries
        if (message.includes('video') || message.includes('lecture') || message.includes('watch')) {
            return 'After enrolling in a course:\n▶️ Click "Watch Now" to start immediately\n📱 Or go to "Enrolled Courses" to see all your courses\n🎬 Videos have full controls and you can pause/resume anytime\n\nHaving trouble accessing a video?';
        }

        // Technical support
        if (message.includes('problem') || message.includes('error') || message.includes('not working') || message.includes('issue')) {
            return 'Sorry to hear you\'re having issues! 🛠️\n\nCommon solutions:\n• Refresh the page\n• Clear browser cache\n• Check your internet connection\n• Try logging out and back in\n\nIf problems persist, please describe the specific issue you\'re facing.';
        }

        // Progress and certificates
        if (message.includes('progress') || message.includes('certificate') || message.includes('completion')) {
            return 'Track your learning progress:\n📊 View progress in "Enrolled Courses"\n🏆 Complete all lectures to finish a course\n📜 Certificates are available upon course completion\n\nNeed help checking your current progress?';
        }

        // Pricing and payment
        if (message.includes('price') || message.includes('cost') || message.includes('payment') || message.includes('money')) {
            return 'Our courses offer great value:\n💰 Competitive pricing for quality content\n🆓 Free preview lectures available\n📱 Lifetime access once enrolled\n💳 Simple, direct enrollment process\n\nCheck individual course pages for specific pricing.';
        }

        // General help
        if (message.includes('help') || message.includes('support')) {
            return 'I\'m here to help! 🤝\n\nI can assist with:\n📚 Finding the right courses\n✅ Enrollment process\n👤 Profile management\n🎥 Accessing lectures\n🧭 Platform navigation\n🛠️ Technical issues\n\nWhat specific help do you need?';
        }

        // Thank you responses
        if (message.includes('thank') || message.includes('thanks')) {
            return 'You\'re welcome! 😊 I\'m glad I could help. Feel free to ask if you have any other questions about our LMS platform!';
        }

        // Goodbye responses
        if (message.includes('bye') || message.includes('goodbye') || message.includes('see you')) {
            return 'Goodbye! 👋 Thanks for using our LMS platform. Feel free to come back anytime if you need help. Happy learning!';
        }

        // About platform queries
        if (message.includes('about') || message.includes('what is') || message.includes('platform')) {
            return 'Our LMS (Learning Management System) is a comprehensive platform for online education! 🎓\n\n✨ Features:\n📚 Wide variety of courses\n🎥 High-quality video lectures\n👨‍🏫 Expert instructors\n📱 Mobile-friendly design\n🏆 Progress tracking\n💼 Skills for career growth\n\nStart exploring our courses today!';
        }

        // Default response for unrecognized queries
        return `I understand you're asking about "${userMessage}". Let me help you with that! 🤔\n\nFor specific assistance, try asking about:\n📚 Courses and subjects\n✅ How to enroll\n👤 Profile management\n🎥 Watching lectures\n🛠️ Technical support\n\nWhat would you like to know more about?`;
    };

    const getBotResponse = (userMessage) => {
        return getDetailedResponse(userMessage);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;

        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Simulate bot typing delay (shorter for better UX)
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: getBotResponse(inputMessage),
                isBot: true,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 800 + Math.random() * 700); // Faster response time
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const quickQuestions = [
        "How do I enroll in a course?",
        "What programming courses do you have?",
        "How can I watch lectures?",
        "Tell me about web development courses",
        "How to check my progress?",
        "What design courses are available?"
    ];

    const handleQuickQuestion = (question) => {
        setInputMessage(question);
        setTimeout(() => handleSendMessage(), 100);
    };

    return (
        <>
            {/* Chat Button */}
            <div className="fixed bottom-6 left-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 cursor-pointer"
                >
                    {isOpen ? <FaTimes size={20} /> : <FaRobot size={20} />}
                </button>
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 left-6 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-white rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FaRobot size={18} />
                            <h3 className="font-semibold">LMS Assistant</h3>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs">Online</span>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                            >
                                <div
                                    className={`max-w-xs rounded-lg p-3 ${message.isBot
                                            ? 'bg-white text-gray-800 border border-gray-200'
                                            : 'bg-blue-600 text-white'
                                        }`}
                                >
                                    <div className="flex items-start gap-2">
                                        {message.isBot && (
                                            <FaRobot className="text-blue-600 mt-0.5 flex-shrink-0" size={14} />
                                        )}
                                        {!message.isBot && (
                                            <FaUser className="text-blue-200 mt-0.5 flex-shrink-0" size={14} />
                                        )}
                                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                            {message.text}
                                        </div>
                                    </div>
                                    <div className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-blue-200'}`}>
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white text-gray-800 border border-gray-200 rounded-lg p-3 max-w-xs">
                                    <div className="flex items-center gap-2">
                                        <FaRobot className="text-blue-600" size={14} />
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Questions */}
                    {messages.length <= 1 && (
                        <div className="p-3 bg-gray-100 border-t flex-shrink-0">
                            <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
                            <div className="grid grid-cols-1 gap-1">
                                {quickQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleQuickQuestion(question)}
                                        className="text-left text-xs bg-white hover:bg-blue-50 text-gray-700 p-2 rounded border transition-colors"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-3 border-t bg-white flex-shrink-0">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={inputMessage.trim() === ''}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors cursor-pointer"
                            >
                                <FaPaperPlane size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;