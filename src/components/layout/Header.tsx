import Logo from "@components/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navigationLinks = [
    { name: "Dashboard", href: "/" },
    { name: "Schedule", href: "/schedule" },
    { name: "Standing", href: "/standing" },
];

function Header() {
    const pathname = usePathname();
    const isActive = (href: string) => {
        return pathname === href;
    };
    const isActiveClass = (href: string) => {
        return isActive(href)
            ? "text-f1-primary"
            : "text-white opacity-70 hover:opacity-100";
    };
    return (
        <nav className="flex flex-row gap-6 bg-f1-bgLight px-6 py-3 border-b-2 border-b-f1-border place-content-between">
            <div className="flex gap-6">
                {navigationLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`font-semibold text-xs ${isActiveClass(
                            link.href
                        )}`}
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
