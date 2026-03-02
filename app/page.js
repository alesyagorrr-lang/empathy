"use client"; // ← обязательно в начале файла

import React, { useState } from "react";
import { motion } from "framer-motion";

// Simple heuristic empathy analyzer
function analyzeEmpathy(text) {
  if (!text) return 0;
  const empathyWords = [
    "понимаю",
    "жаль",
    "сочувствую",
    "поддерживаю",
    "сложно",
    "обнимаю",
    "ты не один",
    "эмпат",
    "переживаю",
    "важно"
  ];

  const toxicWords = [
    "сам виноват",
    "глупо",
    "ерунда",
    "перестань",
    "не ной",
    "бред",
    "плевать"
  ];

  const lower = text.toLowerCase();

  let score = 50;

  empathyWords.forEach(w => {
    if (lower.includes(w)) score += 8;
  });

  toxicWords.forEach(w => {
    if (lower.includes(w)) score -= 10;
  });

  return Math.max(0, Math.min(100, score));
}

function Gauge({ value }) {
  const rotation = -90 + (value / 100) * 180;

  return (
    <div className="relative w-64 h-32">
      <div className="absolute inset-0 rounded-t-full border-8 border-gray-200" />

      <motion.div
        className="absolute bottom-0 left-1/2 w-1 h-24 bg-black origin-bottom"
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 80 }}
        style={{ transformOrigin: "bottom center" }}
      />

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-medium">
        {value}/100
      </div>
    </div>
  );
}

export default function EmpathyLanding() {
  const [text, setText] = useState("");
  const score = analyzeEmpathy(text);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold mb-2">Индекс эмпатии</h1>
        <p className="text-gray-600 mb-6">
          Вставьте текст — мы оценим уровень эмпатии по шкале от 0 до 100.
        </p>

        <textarea
          className="w-full border rounded-xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Например: Понимаю, как тебе тяжело. Ты не один."
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <div className="flex justify-center my-8">
          <Gauge value={score} />
        </div>

        <div className="text-center">
          {score > 75 && (
            <p className="text-green-600 font-medium">Высокая эмпатия 💚</p>
          )}
          {score > 40 && score <= 75 && (
            <p className="text-yellow-600 font-medium">Средняя эмпатия 🙂</p>
          )}
          {score <= 40 && (
            <p className="text-red-600 font-medium">Низкая эмпатия 🧊</p>
          )}
        </div>
      </div>
    </div>
  );
}
