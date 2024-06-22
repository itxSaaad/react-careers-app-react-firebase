interface Company {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
}

interface Job {
  id: string;
  title: string;
  type: string;
  description: string;
  location: string;
  salary: string;
  company: Company;
}

import axios from 'axios';
import { useEffect, useState } from 'react';

import JobList from './JobList';
import Loader from './Loader';

export default function RecentJobsSection() {
  const [Jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/Jobs');
        setJobs(response.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const recentJobs = Jobs.slice(0, 3);
  return (
    <main className="bg-blue-50 px-4 py-10">
      {loading ? (
        <div className="container-xl lg:container m-auto">
          <Loader loading={loading} />
        </div>
      ) : error ? (
        <div className="container-xl lg:container m-auto">
          <h1 className="text-xl font-bold text-indigo-500 text-center">
            An error occurred: {error}
          </h1>
        </div>
      ) : (
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            Recent Jobs
          </h2>

          <JobList Jobs={recentJobs} />
        </div>
      )}
    </main>
  );
}
