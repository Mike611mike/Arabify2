
import React from 'react';
import { useSentences } from '@/context/SentencesContext';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Calendar, Gamepad2, Award, Star, BookOpen, Brain, Activity, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data for learning activity over days
const generateActivityData = (days = 14) => {
  const result = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
    
    // Generate a pseudo-random but consistent value based on date
    const hash = date.getDate() * (date.getMonth() + 1);
    const reviews = Math.max(0, Math.floor(Math.sin(hash) * 5 + 6));
    
    result.push({
      date: formattedDate,
      reviews: reviews
    });
  }
  
  return result;
};

// Colors for pie chart
const COLORS = ['#13BC8C', '#3B82F6', '#EF4444', '#F59E0B'];

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <div className={`bg-spotify-light bg-opacity-40 rounded-lg p-3 flex items-center`}>
    <div className={`rounded-full p-2 mr-3 text-white`} style={{ backgroundColor: color }}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-spotify-text">{title}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  </div>
);

const ProgressDashboard: React.FC = () => {
  const { sentences, stats } = useSentences();
  
  // Generate activity data
  const activityData = generateActivityData(14);
  
  // Data for pie chart
  const learningStatusData = [
    { name: 'Mastered', value: stats.mastered },
    { name: 'In Progress', value: sentences.length - stats.mastered }
  ];
  
  // Time spent data (mock)
  const timeSpentData = [
    { name: 'Reading', value: 35 },
    { name: 'Listening', value: 25 },
    { name: 'Games', value: 20 },
    { name: 'Quizzes', value: 20 }
  ];
  
  return (
    <div className="space-y-6 pb-6">
      <h1 className="text-2xl font-bold mb-4">Learning Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard 
          title="Total Sentences" 
          value={sentences.length} 
          icon={<BookOpen size={18} />} 
          color="#3B82F6" 
        />
        <StatCard 
          title="Mastered" 
          value={stats.mastered} 
          icon={<Star size={18} />} 
          color="#F59E0B" 
        />
        <StatCard 
          title="Games Played" 
          value={12} 
          icon={<Gamepad2 size={18} />} 
          color="#8B5CF6" 
        />
        <StatCard 
          title="Streak" 
          value="5 days" 
          icon={<Activity size={18} />} 
          color="#EC4899" 
        />
      </div>
      
      {/* Overall Progress */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold flex items-center">
            <Award className="mr-2 text-spotify-orange" size={20} />
            Overall Progress
          </h2>
          <span className="text-sm font-medium">{stats.percentage}%</span>
        </div>
        <Progress value={stats.percentage} className="h-2 mb-2" />
        <p className="text-xs text-spotify-text mt-1">
          {stats.mastered} of {sentences.length} sentences mastered
        </p>
      </div>
      
      {/* Learning Activity Chart */}
      <div className="glass-card rounded-xl p-4">
        <h2 className="text-lg font-semibold flex items-center mb-3">
          <Calendar className="mr-2 text-spotify-green" size={20} />
          Learning Activity
        </h2>
        <div className="h-[200px] w-full">
          <ChartContainer 
            config={{ 
              reviews: { 
                theme: { 
                  light: '#13BC8C', 
                  dark: '#13BC8C' 
                },
                label: 'Reviews'
              }
            }}
          >
            <LineChart data={activityData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="reviews" stroke="var(--color-reviews)" activeDot={{ r: 8 }} />
            </LineChart>
          </ChartContainer>
        </div>
      </div>
      
      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Learning Status */}
        <div className="glass-card rounded-xl p-4">
          <h2 className="text-lg font-semibold flex items-center mb-3">
            <Brain className="mr-2 text-spotify-purple" size={20} />
            Learning Status
          </h2>
          <div className="h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={learningStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {learningStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Time Spent */}
        <div className="glass-card rounded-xl p-4">
          <h2 className="text-lg font-semibold flex items-center mb-3">
            <Clock className="mr-2 text-spotify-blue" size={20} />
            Time Distribution
          </h2>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeSpentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#13BC8C" label={{ position: 'top' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
