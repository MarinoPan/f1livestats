const SegmentsSectors: React.FC<{ segment: number[] }> = ({ segment }) => {
    const segments: Record<number, string> = {
        0: "white",
        2048: "yellow",
        2049: "green",
        2050: "black",
        2051: "purple",
        2052: "red",
        2064: "blue",
        2068: "white",
    };

    return (
        <div className="flex space-x-1">
            {segment.map((seg, index) => (
                <div
                    key={index}
                    style={{ backgroundColor: segments[seg] || "gray" }}
                    className="w-2 h-1 rounded-md"
                ></div>
            ))}
        </div>
    );
};

export default SegmentsSectors;
