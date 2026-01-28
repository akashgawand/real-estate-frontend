"use client";

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
      <p className="text-gray-600">
        Settings page - Additional admin features like section management, trust
        partners, before/after, ROI config, hero content, and CTA can be added
        here.
      </p>
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
        <ul className="list-disc list-inside text-blue-800 space-y-1">
          <li>Section Management (reorder/toggle visibility)</li>
          <li>Trust Partners CRUD</li>
          <li>Before/After Management</li>
          <li>ROI Configuration</li>
          <li>Hero Content Editor</li>
          <li>CTA Section Editor</li>
          <li>Image Upload to AWS R2</li>
        </ul>
      </div>
    </div>
  );
}
