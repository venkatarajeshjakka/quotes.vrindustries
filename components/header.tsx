import { Command } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

export function Header() {
  return (
    <header className="print:hidden border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 ml-8 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex aspect-square size-8 items-center justify-center rounded-lg shadow-md">
              <Command className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-blue-900 dark:text-blue-100">VR Industries</span>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2 mr-6">
           <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}