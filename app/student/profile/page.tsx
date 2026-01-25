'use client'; // MUST be first line

import StudentSidebar from '../components/StudentSidebar';
import { useState, useEffect } from 'react';
import { User, Mail, BookOpen, Edit2, Save, Camera } from 'lucide-react';

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'ABC Shrestha',
    email: 'shraddha@example.com',
    phone: '+977 9841XXXXXX',
  });

  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    const saved = localStorage.getItem('studentProfile');
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile(parsed);
      setFormData(parsed);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('studentProfile', JSON.stringify(formData));
    setProfile(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main content */}
      <div className="flex-1 ml-64 p-6 md:p-8 lg:p-10 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
        <p className="text-gray-600 mb-8">
          Manage your personal information and account settings
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-8 text-white relative">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-lg">
                  {formData.profilePicture ? (
                    <img
                      src={formData.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-5xl font-bold">
                      {formData.fullName.charAt(0)}
                    </div>
                  )}
                </div>

                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100">
                    <Camera className="w-5 h-5 text-indigo-600" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePictureUpload}
                    />
                  </label>
                )}
              </div>

              {/* Basic Info */}
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold">
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="bg-white/20 border border-white/40 rounded px-3 py-1 text-white placeholder-white/70 focus:outline-none focus:border-white"
                    />
                  ) : (
                    profile.fullName
                  )}
                </h2>
                <p className="text-indigo-200 mt-1 flex items-center justify-center sm:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/20 border border-white/40 rounded px-3 py-1 text-white placeholder-white/70 focus:outline-none focus:border-white"
                    />
                  ) : (
                    profile.email
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Main Profile Info */}
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>

              <button
                onClick={() => {
                  if (isEditing) handleSave();
                  else setIsEditing(true);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isEditing
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                }`}
              >
                {isEditing ? (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 className="w-5 h-5" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{profile.phone}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
