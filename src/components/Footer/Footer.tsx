import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t mt-12">
  <div className="max-w-7xl mx-auto px-4 py-8 sm:flex sm:justify-between sm:items-center">
    {/* Site Info */}
    <div className="mb-4 sm:mb-0">
      <h2 className="text-lg font-semibold">MyLibrary</h2>
      <p className="text-sm text-gray-500">© {new Date().getFullYear()} MyLibrary. All rights reserved.</p>
    </div>

    {/* Credits or Links */}
    <div className="text-sm text-gray-500 space-x-4">
      <a href="#" className="hover:text-gray-700 transition">Privacy Policy</a>
      <a href="#" className="hover:text-gray-700 transition">Terms of Use</a>
      <span>Built by AlfazUlIslam</span>
    </div>
  </div>
</footer>

  )
}
export default Footer