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

interface JobListProps {
  Job: Job;
  id: string;
}

import { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function JobListCard({ Job, id }: JobListProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = Job.description;

  if (!showFullDescription && description.length > 90) {
    description = description.slice(0, 90) + '...';
  }

  return (
    <div key={id} className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{Job.type}</div>
          <h3 className="text-xl font-bold">{Job.title}</h3>
        </div>

        <div className="mb-5">{description}</div>
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-indigo-500 mb-5 hover:underline hover:text-indigo-600"
        >
          {showFullDescription ? 'Less' : 'More'}
        </button>

        <h3 className="text-indigo-500 mb-2">{Job.salary}</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaMapMarkerAlt className="inline text-lg mb-1 mr-1" />
            {Job.location}
          </div>
          <Link
            to={`/jobs/${id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
