import Link from "next/link";
import React from "react";
import Logo from "./Logo";

const navigationLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Schedule", href: "/schedule" },
    { name: "Standing", href: "/standing" },
];

function Header() {
    return (
        <nav className="flex flex-row gap-6 bg-f1-bgLight px-6 py-3 border-b-2 border-b-f1-border place-content-between">
            <div className="flex gap-6">
                {navigationLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-white text-xs opacity-70 hover:opacity-100"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
            <Logo />
        </nav>
    );
}

export default Header;
