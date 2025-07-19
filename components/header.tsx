
import { Command } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

export function Header() {


  return (
    <header className="print:hidden sticky top-0 z-50 w-full border-b border-border/50 bg-card/95 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white flex aspect-square w-10 h-10 sm:w-12 sm:h-12 items-center justify-center rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Command className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                  VR Industries
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  Enterprise Solutions
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">

            <ModeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <ModeToggle />

          </div>
        </div>
      </div>
    </header>
  )
}