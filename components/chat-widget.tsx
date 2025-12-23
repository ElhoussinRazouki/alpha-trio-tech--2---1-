"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Calendar, User, Bot } from "lucide-react";

const config = {
  primaryColor: "#0056D6",
  secondaryColor: "#FFFFFF",
  companyName: "AlphaTrio Tech",
  welcomeMessage:
    "Hi! Welcome to AlphaTrio Tech. How can our AI solutions help you today?",
  contactEmail: "contact@alphatriotech.com",
};

const knowledgeBase = {
  automation:
    "Nous nous spécialisons dans l'automatisation des processus métier pour rationaliser vos opérations. Nos solutions incluent l'optimisation des flux de travail, l'automatisation des documents, le traitement des données et des outils d'automatisation personnalisés. Nous aidons les entreprises à réduire les tâches manuelles jusqu'à 80% et à augmenter considérablement l'efficacité.",
  ai: "AlphaTrio Tech propose des solutions IA complètes incluant l'implémentation d'apprentissage automatique, le traitement du langage naturel, la vision par ordinateur, l'analyse prédictive et l'automatisation intelligente. Nous aidons les entreprises à exploiter l'IA pour prendre des décisions basées sur les données et améliorer l'expérience client.",
  services:
    "Nos services principaux incluent : 🤖 Solutions et Implémentation IA, ⚙️ Automatisation des Processus Métier, 💼 Conseil et Stratégie IT, 🔧 Développement Logiciel Sur Mesure, 📊 Analyse et Intelligence des Données, et 🛠️ Support Technique et Maintenance. Nous transformons les entreprises grâce à des solutions technologiques avancées.",
  consulting:
    "Nous fournissons des conseils d'experts et un support continu pour toutes nos solutions. Notre équipe offre une planification stratégique, des conseils d'implémentation, de la formation et un support technique 24/7. Souhaitez-vous planifier une consultation gratuite pour discuter de vos besoins spécifiques ?",
  contact:
    "Vous pouvez nous contacter à contact@alphatriotech.com ou planifier une consultation directement via ce chat. Nous répondons généralement dans les 2 heures pendant les heures ouvrables.",
  default:
    "Je ne suis pas sûr de cette question spécifique, mais vous pouvez nous contacter à contact@alphatriotech.com pour des informations détaillées. Notre équipe d'experts sera ravie de vous aider.",
};

function getAIResponse(message: string) {
  const msg = message.toLowerCase();

  if (
    msg.includes("automation") ||
    msg.includes("automatisation") ||
    msg.includes("processus")
  ) {
    return knowledgeBase.automation;
  } else if (
    msg.includes("ai") ||
    msg.includes("ia") ||
    msg.includes("intelligence artificielle")
  ) {
    return knowledgeBase.ai;
  } else if (
    msg.includes("service") ||
    msg.includes("que faites-vous") ||
    msg.includes("offrez")
  ) {
    return knowledgeBase.services;
  } else if (
    msg.includes("conseil") ||
    msg.includes("support") ||
    msg.includes("aide")
  ) {
    return knowledgeBase.consulting;
  } else if (
    msg.includes("contact") ||
    msg.includes("joindre") ||
    msg.includes("téléphone")
  ) {
    return knowledgeBase.contact;
  } else if (
    msg.includes("bonjour") ||
    msg.includes("salut") ||
    msg.includes("hello")
  ) {
    return "Bonjour ! Ravi de vous rencontrer. Je suis là pour vous aider à découvrir les solutions IA et services d'automatisation d'AlphaTrio Tech. Quels défis spécifiques cherchez-vous à résoudre avec la technologie ?";
  }

  return knowledgeBase.default;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: "bot" | "user" }[]>([
    { text: config.welcomeMessage, sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (text: string = inputValue) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    setMessages((prev) => [...prev, { text: trimmedText, sender: "user" }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = getAIResponse(trimmedText);
    setIsTyping(false);
    setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
  };

  const handleSchedule = () => {
    sendMessage("J'aimerais planifier une consultation");
    setTimeout(() => {
       setMessages(prev => [...prev, {
           text: "Excellent ! Je serais ravi de vous aider à planifier une consultation avec nos experts en solutions IA. Veuillez fournir votre adresse e-mail, et notre équipe vous contactera dans les 24 heures pour organiser un moment convenable. Quelle est la meilleure adresse e-mail pour vous joindre ?",
           sender: "bot"
       }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] font-sans">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={toggleChat}
            className="w-[60px] h-[60px] rounded-full bg-[#0056D6] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300"
            style={{ animation: "pulse 2s infinite" }}
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="absolute bottom-20 right-0 w-[350px] max-sm:w-[300px] h-[500px] max-sm:h-[450px] bg-white dark:bg-slate-900 border-2 border-[#0056D6] rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0056D6] text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{config.companyName} AI</h3>
                <p className="text-xs opacity-90">Expert en Solutions IA</p>
              </div>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
                    msg.sender === "bot"
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 self-start"
                      : "bg-[#0056D6] text-white self-end"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl self-start flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <button
                onClick={handleSchedule}
                className="text-[10px] font-medium border border-[#0056D6] text-[#0056D6] dark:text-blue-400 dark:border-blue-400 px-3 py-1.5 rounded-full hover:bg-[#0056D6] hover:text-white transition-colors flex items-center gap-1"
              >
                <Calendar size={12} />
                Planifier une Consultation
              </button>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Posez une question..."
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 text-sm outline-none focus:border-[#0056D6] transition-colors dark:text-white"
              />
              <button
                onClick={() => sendMessage()}
                className="w-10 h-10 bg-[#0056D6] text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(0, 86, 214, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(0, 86, 214, 0);
          }
        }
      `}</style>
    </div>
  );
}
