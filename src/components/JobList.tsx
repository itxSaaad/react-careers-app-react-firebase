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
  Jobs: Job[];
}

import JobListCard from './JobListCard';

export default function JobList({ Jobs }: JobListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Jobs.map((job, index) => (
        <JobListCard key={job.id} Job={job} index={index} />
      ))}
    </div>
  );
}
