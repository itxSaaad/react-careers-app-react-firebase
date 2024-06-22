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
  Jobs: Record<string, Job>;
}

import JobListCard from './JobListCard';

export default function JobList({ Jobs }: JobListProps) {
  // console.log(Jobs);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(Jobs).map(([id, Job]) => (
        <JobListCard key={id} Job={Job} id={id} />
      ))}
    </div>
  );
}
