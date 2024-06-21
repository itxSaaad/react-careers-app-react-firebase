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
  index: number;
}

export default function JobListCard({ Job, index }: JobListProps) {
  return (
    <div key={index} className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{Job.type}</div>
          <h3 className="text-xl font-bold">{Job.title}</h3>
        </div>

        <div className="mb-5">{Job.description}</div>

        <h3 className="text-indigo-500 mb-2">{Job.salary}</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <i className="fa-solid fa-location-dot text-lg"></i>
            {Job.location}
          </div>
          <a
            href={`/jobs/${Job.id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
