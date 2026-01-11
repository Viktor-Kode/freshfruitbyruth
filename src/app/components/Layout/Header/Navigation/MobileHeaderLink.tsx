'use client'
import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { useI18n } from '@/i18n/client';

interface MobileHeaderLinkProps {
  item: HeaderItem;
  onLinkClick?: () => void;
}

const MobileHeaderLink: React.FC<MobileHeaderLinkProps> = ({ item, onLinkClick }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const { t } = useI18n();

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.submenu) {
      handleToggle()
      return
    }
    if (item.href.startsWith('/#')) {
      e.preventDefault()
      const targetId = item.href.substring(2)
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // Close mobile menu after scrolling
        if (onLinkClick) {
          // Small delay to allow smooth scroll to start
          setTimeout(() => {
            onLinkClick()
          }, 300)
        }
      }
    } else {
      // For regular links (not hash links), close immediately
      if (onLinkClick) {
        onLinkClick()
      }
    }
  };

  return (
    <div className="relative w-full">
      <Link
        href={item.href}
        onClick={handleClick}
        className="flex items-center justify-between w-full py-2 text-muted focus:outline-hidden"
      >
        {t(item.label)}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </Link>
      {submenuOpen && item.submenu && (
        <div className="bg-white p-2 w-full">
          {item.submenu.map((subItem, index) => {
            const handleSubmenuClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
              if (subItem.href.startsWith('/#')) {
                e.preventDefault()
                const targetId = subItem.href.substring(2)
                const element = document.getElementById(targetId)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  // Close mobile menu after scrolling
                  if (onLinkClick) {
                    setTimeout(() => {
                      onLinkClick()
                    }, 300)
                  }
                }
              } else {
                // For regular links, close immediately
                if (onLinkClick) {
                  onLinkClick()
                }
              }
            }
            
            return (
              <Link
                key={index}
                href={subItem.href}
                onClick={handleSubmenuClick}
                className="block py-2 text-gray-500 hover:bg-gray-200"
              >
                {subItem.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
