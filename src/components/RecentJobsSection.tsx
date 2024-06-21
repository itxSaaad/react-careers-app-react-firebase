import JobList from './JobList';

import Jobs from '../assets/data/Jobs.json';

export default function RecentJobsSection() {
  const recentJobs = Jobs.slice(0, 3);
  return (
    <main className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Recent Jobs
        </h2>

        <JobList Jobs={recentJobs} />
      </div>
    </main>
  );
}
