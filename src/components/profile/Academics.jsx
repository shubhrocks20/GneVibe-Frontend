import React from "react";
import { FaGraduationCap } from "react-icons/fa";

const AcademicDetails = ({ acadamics }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
        <FaGraduationCap className="h-6 w-6 text-purple-500 mr-2" />
        Academic Details
      </h2>
      <div className="bg-gray-700 rounded-lg p-4">
        <p className="text-gray-300">
          <strong>Branch:</strong> {acadamics.branch}
        </p>
        <p className="text-gray-300">
          <strong>URN:</strong> {acadamics.urn}
        </p>
        <p className="text-gray-300">
          <strong>Year of Admission:</strong> {acadamics.yearOfAdmission}
        </p>
      </div>
    </>
  );
};

export default AcademicDetails;
