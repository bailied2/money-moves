import React from "react";

import JobCard from "../components/JobCard";

const Test = () => (
  <div>
    <h1>Testing Page</h1>
    <JobCard 
      title="Test Job"
      description="This is a job"
      wage="100.00"
      pay_frequency="Weekly"
      pay_day="Friday"
      icon_class=""
      is_trustee=""
    />
  </div>
);

export default Test;
