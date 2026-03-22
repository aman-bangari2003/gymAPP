import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Target, Edit2, Check, X, Camera, Activity } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    goal: user?.goal || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-[fadeIn_0.5s_ease-out]">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100 relative group/card hover:shadow-2xl transition-all duration-500">
        <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        </div>
        
        <div className="px-8 pb-10 relative">
          <div className="relative flex justify-between items-end -mt-16 mb-8">
            <div className="relative group/avatar cursor-pointer">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-blue-50 flex items-center justify-center text-blue-600 text-5xl font-bold shadow-lg overflow-hidden group-hover/avatar:shadow-blue-500/30 transition-shadow">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-2.5 rounded-full shadow-md text-gray-500 hover:text-blue-600 transition-colors border border-gray-100 group-hover/avatar:-translate-y-1">
                <Camera className="h-5 w-5" />
              </button>
            </div>
            
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center px-5 py-2.5 bg-gray-50 text-gray-700 rounded-xl font-semibold hover:bg-white hover:shadow-md hover:text-blue-600 transition-all border border-gray-200 shadow-sm active:scale-95"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>

          <div className="mt-2">
            {!isEditing ? (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{user?.name}</h1>
                  <p className="text-gray-500 flex items-center mt-1 font-medium">
                    <Mail className="h-4 w-4 mr-1.5" />
                    {user?.email}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                   <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-3xl border border-blue-100/60 hover:shadow-md transition-shadow">
                     <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-4 flex items-center">
                       <Target className="h-4 w-4 mr-2 text-blue-600" />
                       Fitness Goal
                     </h3>
                     <p className="text-2xl font-bold text-gray-900">{user?.goal || 'Not set'}</p>
                     <p className="text-sm text-blue-600 font-medium mt-2 hover:text-blue-800 cursor-pointer transition-colors w-max">Update target →</p>
                   </div>
                   
                   <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 rounded-3xl border border-emerald-100/60 hover:shadow-md transition-shadow">
                     <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-4 flex items-center">
                       <Activity className="h-4 w-4 mr-2 text-emerald-600" />
                       Current Status
                     </h3>
                     <p className="text-2xl font-bold text-gray-900">Active Member</p>
                     <p className="text-sm text-emerald-600 font-medium mt-2 hover:text-emerald-800 cursor-pointer transition-colors w-max">View stats →</p>
                   </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-2 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-11 sm:text-sm border-gray-300 rounded-xl py-3.5 border focus:bg-white bg-white/80 transition-all font-medium text-gray-900 shadow-sm hover:border-gray-400"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="goal" className="block text-sm font-bold text-gray-700">
                      Primary Fitness Goal
                    </label>
                    <div className="mt-2 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Target className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="goal"
                        name="goal"
                        value={formData.goal}
                        onChange={(e) => setFormData({...formData, goal: e.target.value})}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-11 sm:text-sm border-gray-300 rounded-xl py-3.5 border focus:bg-white bg-white/80 transition-all font-medium text-gray-900 shadow-sm hover:border-gray-400"
                      >
                        <option>Build Muscle</option>
                        <option>Lose Weight</option>
                        <option>Improve Endurance</option>
                        <option>Stay Active</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ name: user?.name, goal: user?.goal });
                    }}
                    className="inline-flex justify-center items-center py-3 px-6 border border-gray-200 rounded-xl shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-95"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center items-center py-3 px-6 border border-transparent rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-95"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
