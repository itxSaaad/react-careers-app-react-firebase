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

import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '../firebaseConfig';

import JobList from './JobList';
import Loader from './Loader';

export default function RecentJobsSection() {
  const [Jobs, setJobs] = useState<Record<string, Job> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const dbRef = ref(database, '/Jobs');

      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();

        setJobs(data);
        // console.log(data);
        setLoading(false);
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }

    // const fetchJobs = async () => {
    //   try {
    //     const response = await axios.get(
    //       'https://react-careers-app-react-default-rtdb.firebaseio.com/Jobs.json'
    //     );
    //     setJobs(response.data);
    //   } catch (err: unknown) {
    //     if (err instanceof Error) {
    //       setError(err.message);
    //     } else {
    //       setError('An unknown error occurred');
    //     }
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchJobs();
  }, []);

  const recentJobs: Record<string, Job> = Jobs
    ? Object.fromEntries(
        Object.entries(Jobs)
          .filter(([, job]) => job)
          .slice(0, 3)
      )
    : {};

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
      ) : Jobs ? (
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            Recent Jobs
          </h2>

          <JobList Jobs={recentJobs} />
        </div>
      ) : (
        <div className="container-xl lg:container m-auto">
          <h1 className="text-xl font-bold text-indigo-500 text-center">
            No Jobs Found
          </h1>
        </div>
      )}
    </main>
  );
}
