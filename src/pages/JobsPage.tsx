import JobList from '../components/JobList';

import Jobs from '../assets/data/Jobs.json';

export default function JobsPage() {
  return (
    <section className="bg-blue-50 px-4 py-5">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Browse Jobs
        </h2>

        <JobList Jobs={Jobs} />
      </div>
    </section>
  );
}
