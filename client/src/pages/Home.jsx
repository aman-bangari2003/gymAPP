import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Activity, Flame, TrendingUp, Calendar, ChevronRight, Dumbbell } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const cards = [
    {
      title: 'Workout Plans',
      icon: Activity,
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      value: '3 Active',
      desc: 'Next: Upper Body Power',
      accentColor: 'text-indigo-600',
    },
    {
      title: 'Calories Tracker',
      icon: Flame,
      color: 'bg-gradient-to-br from-orange-400 to-orange-500',
      value: '1,850 kcal',
      desc: 'Remaining: 650 kcal',
      accentColor: 'text-orange-500',
    },
    {
      title: 'Progress Overview',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-emerald-400 to-emerald-500',
      value: '+2.4 kg',
      desc: 'Muscle mass gained',
      accentColor: 'text-emerald-500',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back, {user?.name}! 👋</h1>
        <p className="mt-2 text-lg text-gray-500">Here's what your fitness journey looks like today.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white group overflow-hidden rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-2xl p-4 shadow-lg ${card.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-400 truncate uppercase tracking-wider">{card.title}</dt>
                      <dd className="mt-2 text-3xl font-bold text-gray-900">{card.value}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50/50 px-6 py-4 flex items-center justify-between group-hover:bg-gray-50 transition-colors border-t border-gray-50">
                <div className={`text-sm font-medium ${card.accentColor}`}>
                  {card.desc}
                </div>
                <ChevronRight className={`h-4 w-4 ${card.accentColor} opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-lg leading-6 font-bold text-gray-900">Upcoming Schedule</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-bold transition-colors">View all</button>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { day: 'Today', workout: 'Chest & Triceps Focus', time: '17:00 PM', duration: '60 min' },
              { day: 'Tomorrow', workout: 'Back & Biceps Power', time: '18:00 PM', duration: '45 min' },
              { day: 'Friday', workout: 'Leg Day & Core', time: '07:00 AM', duration: '90 min' },
            ].map((item, index) => (
               <div key={index} className="px-6 py-5 flex items-center hover:bg-gray-50/80 transition-colors group cursor-pointer">
                 <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-100 transition-all">
                   <Calendar className="h-6 w-6 text-blue-600" />
                 </div>
                 <div className="ml-5 flex-1">
                   <h4 className="text-base font-bold text-gray-900">{item.workout}</h4>
                   <p className="text-sm text-gray-500 mt-0.5">{item.day} at {item.time} • <span className="font-medium text-gray-400">{item.duration}</span></p>
                 </div>
                 <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
               </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-lg border border-blue-500 overflow-hidden text-white flex flex-col justify-between p-8 relative">
           <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10 filter blur-xl">
             <Dumbbell className="h-48 w-48 text-white" />
           </div>
           
           <div className="relative z-10">
             <h3 className="text-2xl font-bold mb-2">Ready to crush it?</h3>
             <p className="text-blue-100 opacity-90 leading-relaxed mb-6">
               You are exactly 5 workouts away from your monthly goal. Keep up the amazing momentum!
             </p>
             
             <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-sm font-medium text-white shadow-sm">Monthly Goal</span>
                 <span className="text-sm font-bold">85%</span>
               </div>
               <div className="w-full bg-black/20 rounded-full h-2">
                 <div className="bg-white h-2 rounded-full w-[85%]"></div>
               </div>
             </div>
           </div>
           
           <button className="relative z-10 mt-8 w-full bg-white text-blue-600 py-3.5 px-4 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-sm active:scale-95">
             Start Today's Workout
           </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
