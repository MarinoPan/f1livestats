import { ReactNode } from "react";

const Card: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <section className="">{children}</section>;
};

export default Card;
