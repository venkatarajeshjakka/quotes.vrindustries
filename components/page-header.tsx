import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export function PageHeader({
  title,
  description,
  addText,
  addHref,
}: {
  title: string;
  description: string;
  addText: string;
  addHref: string;
}) {
  return (
    <header className="flex bg-white mt-4">
      <div className="flex items-center justify-between w-3/4">
        <div className="">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
        <div>
          <Link
            href={addHref}
            className="flex items-center bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            {addText}
          </Link>
        </div>
      </div>
    </header>
  );
}
