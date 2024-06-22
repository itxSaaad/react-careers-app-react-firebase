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

import { onValue, ref, remove } from 'firebase/database';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { database } from '../firebaseConfig';

import { toast } from 'react-toastify';
import Loader from '../components/Loader';

export default function JobPage() {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const dbRef = ref(database, `/Jobs/${id}`);

      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();

        setJob(data);
        setLoading(false);
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
    // const fetchJob = async () => {
    //   try {
    //     const response = await axios.get(`/api/Jobs/${id}`);
    //     setJob(response.data);
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

    // fetchJob();
  }, [id]);

  const deleteJobHandler = async () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const dbRef = ref(database, `/Jobs/${id}`);
        await remove(dbRef);
        navigate('/jobs');
        toast.success('Job deleted successfully');
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          toast.error('An error occurred');
        } else {
          setError('An unknown error occurred');
        }
      }

      // try {
      //   await axios.delete(`/api/Jobs/${id}`);
      //   navigate('/jobs');
      //   toast.success('Job deleted successfully');
      // } catch (err: unknown) {
      //   if (err instanceof Error) {
      //     setError(err.message);
      //     toast.error('An error occurred');
      //   } else {
      //     setError('An unknown error occurred');
      //   }
      // }
    }
  };

  return (
    <section className="bg-indigo-50 px-4 py-5">
      {loading ? (
        <Loader loading={loading} />
      ) : error ? (
        <div className="container-xl lg:container m-auto">
          <h1 className="text-xl text-indigo-500 mb-6 text-center ">
            An error occurred: {error}
          </h1>
        </div>
      ) : job ? (
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarkerAlt className="text-orange-700 inline text-lg mb-1 mr-1" />
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>

                <p className="mb-4">{job.salary} / Year</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              {/* <!-- Company Info --> */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl">{job.company.name}</h2>

                <p className="my-2">{job.company.description}</p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactEmail}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactPhone}
                </p>
              </div>

              {/* <!-- Manage --> */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  to={`/edit-job/${id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>
                <button
                  onClick={deleteJobHandler}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      ) : (
        <div className="container-xl lg:container m-auto">
          <h1 className="text-xl text-indigo-500 mb-6 text-center ">
            No Job Found!
          </h1>
        </div>
      )}
    </section>
  );
}
