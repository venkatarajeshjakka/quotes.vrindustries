import { Plus } from "lucide-react";
import Link from "next/link";

export default function ClientPage() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen p-8">
      <header className="flex bg-white p-4">
        <div className="flex items-center justify-between w-3/4">
          <div className="">
            <h1 className="text-2xl font-bold text-gray-900">
              Client Management
            </h1>
            <p className="text-gray-600">
              Manage your client contacts and company information
            </p>
          </div>
          <div>
            <Link
              href="/client/add"
              className="flex items-center bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
