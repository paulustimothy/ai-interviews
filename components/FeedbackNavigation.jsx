"use client";

import React, { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";

const FeedbackNavigation = ({ feedbacks }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < feedbacks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentFeedback = feedbacks[currentIndex];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`p-2 ${
            currentIndex === 0
              ? "text-gray-400"
              : "text-primary-200 hover:text-primary-300"
          }`}
        >
          ← Previous
        </button>
        <span className="text-sm">
          Attempt {currentIndex + 1} of {feedbacks.length}
        </span>
        <button
          onClick={handleNext}
          disabled={currentIndex === feedbacks.length - 1}
          className={`p-2 ${
            currentIndex === feedbacks.length - 1
              ? "text-gray-400"
              : "text-primary-200 hover:text-primary-300"
          }`}
        >
          Next →
        </button>
      </div>

      {/* Feedback Content */}
      <div className="flex flex-row justify-center">
        <div className="flex flex-row gap-5">
          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" width={22} height={22} alt="star" />
            <p>
              Overall Impression:{" "}
              <span className="text-primary-200 font-bold">
                {currentFeedback?.totalScore}
              </span>
              /100
            </p>
          </div>

          <div className="flex flex-row gap-2">
            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
            <p>
              {currentFeedback?.createdAt
                ? dayjs(currentFeedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      <p>{currentFeedback?.finalAssessment}</p>

      <div className="flex flex-col gap-4 mt-4">
        <h2>Breakdown of the Interview:</h2>
        {currentFeedback?.categoryScores?.map((category, idx) => (
          <div key={idx}>
            <p className="font-bold">
              {idx + 1}. {category.name} ({category.score}/100)
            </p>
            <p>{category.comment}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <h3>Strengths</h3>
        <ul>
          {currentFeedback?.strengths?.map((strength, idx) => (
            <li key={idx}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <h3>Areas for Improvement</h3>
        <ul>
          {currentFeedback?.areasForImprovement?.map((area, idx) => (
            <li key={idx}>{area}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeedbackNavigation;
