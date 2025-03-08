import React from "react";

interface ProgressCircleProps {
    progress: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 650) * circumference;

    return (
        <div className="relative w-12 h-8 flex items-center justify-center">
            <svg width="100" height="70" viewBox="0 0 70 70">
                <path
                    d="M 10,50 A 25,25 0 0,1 60,50"
                    fill="transparent"
                    stroke="gray"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.3"
                />

                <path
                    d="M 10,50 A 25,25 0 0,1 60,50"
                    fill="transparent"
                    stroke="var(--f1-red)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>

            <span className="absolute text-white top-4 text-xs font-bold">
                {progress}
            </span>
        </div>
    );
};

export default ProgressCircle;
