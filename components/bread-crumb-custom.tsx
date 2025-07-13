import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import Link from "next/link";

const BreadcrumbWithCustomSeperator = ({
  prePageText,
  prePageHref,
  currentPage,
}: {
  prePageText: string;
  prePageHref: string;
  currentPage: string;
}) => (
  <nav className="w-full mb-4" aria-label="Breadcrumb">
    <Breadcrumb>
      <BreadcrumbList className="flex items-center gap-2 text-sm md:text-base">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href="/"
              className="text-blue-600 hover:underline font-semibold"
            >
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon className="w-4 h-4 text-gray-400 mx-1" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href={prePageHref}
              className="text-blue-600 hover:underline font-semibold"
            >
              {prePageText}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon className="w-4 h-4 text-gray-400 mx-1" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-gray-700 font-medium tracking-wide">
            {currentPage}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </nav>
);

export { BreadcrumbWithCustomSeperator };
