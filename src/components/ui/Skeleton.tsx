import React from "react";
interface SkeletonProps {
    width?: string;
    height?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
    width = "100%",
    height = "1rem",
}) => {
    return (
        <div
            className="bg-f1-darkGray animate-pulse"
            style={{
                width,
                height,
                borderRadius: "0.25rem",
            }}
        ></div>
    );
};

export default Skeleton;
