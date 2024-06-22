import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import database from '../firebaseConfig';

import JobList from '../components/JobList';
import Loader from '../components/Loader';

export default function JobsPage() {
  const [Jobs, setJobs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const dbRef = ref(database, '/Jobs');

      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();

        setJobs(data);
        console.log(data);
        setLoading(false);
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }

    // This is the code that was replaced by the Firebase Realtime Database code
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

  return (
    <section className="bg-blue-50 px-4 py-5">
      {loading ? (
        <Loader loading={loading} />
      ) : error ? (
        <div className="container-xl lg:container m-auto">
          <h1 className="text-xl font-bold text-indigo-500 mb-6 text-center ">
            An error occurred: {error}
          </h1>
        </div>
      ) : Jobs ? (
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            Browse Jobs
          </h2>

          <JobList Jobs={Jobs} />
        </div>
      ) : (
        <div className="container-xl lg:container m-auto">
          <h1 className="text-xl font-bold text-indigo-500 text-center">
            No Jobs Found
          </h1>
        </div>
      )}
    </section>
  );
}
