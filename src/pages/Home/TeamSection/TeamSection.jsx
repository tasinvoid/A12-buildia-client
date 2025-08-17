import React, { useState } from "react";

const teamMembers = [
  {
    id: 1,
    name: "Jane Doe",
    title: "Building Manager",
    bio: "Jane is dedicated to ensuring a seamless experience for all residents. With over 10 years in property management, she handles all operational aspects with a focus on community satisfaction.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    phoneNumber: "+1-555-123-4567",
    email: "jane.doe@buildia.com",
  },
  {
    id: 2,
    name: "John Smith",
    title: "Head of Maintenance",
    bio: "John leads our maintenance team, providing quick and reliable service for all repair requests. His expertise ensures that all building systems are running smoothly.",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    phoneNumber: "+1-555-987-6543",
    email: "john.smith@buildia.com",
  },
  {
    id: 3,
    name: "Emily Davis",
    title: "Concierge",
    bio: "As the first point of contact, Emily is here to assist with everything from package deliveries to visitor access, making sure residents feel welcomed and supported.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    phoneNumber: "+1-555-456-7890",
    email: "emily.davis@buildia.com",
  },
];

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [copyStatus, setCopyStatus] = useState("");

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus(""), 2000);
    });
  };

  return (
    <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg shadow-xl p-8 my-8 max-w-6xl mx-auto text-center">
           {" "}
      <div className="mb-10">
               {" "}
        <h2 className="text-4xl font-extrabold text-gray-100">
                    Meet Our Team        {" "}
        </h2>
               {" "}
        <p className="mt-4 text-gray-400 text-lg">
                    Dedicated to providing you with the best living experience.
                 {" "}
        </p>
             {" "}
      </div>
           {" "}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
               {" "}
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="group relative flex flex-col items-center bg-gray-900 rounded-lg p-6 border border-gray-700 transition-all duration-300 hover:border-indigo-500 text-center"
          >
                       {" "}
            <div className="relative flex flex-col items-center transition-opacity duration-300 group-hover:opacity-0 group-hover:h-0 overflow-hidden">
                           {" "}
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-indigo-500 group-hover:border-indigo-400 transition-colors duration-300">
                               {" "}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                             {" "}
              </div>
                           {" "}
              <h3 className="text-2xl font-bold text-gray-100 transition-colors duration-300">
                                {member.name}             {" "}
              </h3>
                           {" "}
              <p className="text-sm font-semibold text-gray-400 mt-1 mb-4 transition-colors duration-300">
                                {member.title}             {" "}
              </p>
                         {" "}
            </div>
                       {" "}
            <div className="absolute top-0 left-0 w-full h-full p-6 flex flex-col justify-center items-center text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                           {" "}
              <h3 className="text-2xl font-bold text-gray-100 mb-2">
                                {member.name}             {" "}
              </h3>
                           {" "}
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                                {member.bio}             {" "}
              </p>
                           {" "}
              <button
                onClick={() => setSelectedMember(member)}
                className="bg-indigo-600 text-gray-100 font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                                Contact              {" "}
              </button>
                         {" "}
            </div>
                     {" "}
          </div>
        ))}
             {" "}
      </div>
           {" "}
      {selectedMember && (
        <div className="fixed inset-0 bg-gray-950 bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                   {" "}
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-2xl border border-gray-700 text-left">
                       {" "}
            <div className="flex justify-between items-center mb-4">
                           {" "}
              <h3 className="text-2xl font-bold text-gray-100">
                                Contact {selectedMember.name}             {" "}
              </h3>
                           {" "}
              <button
                onClick={() => {
                  setSelectedMember(null);
                  setCopyStatus("");
                }}
                className="text-gray-400 hover:text-gray-100 transition-colors"
              >
                               {" "}
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                                   {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                                 {" "}
                </svg>
                             {" "}
              </button>
                         {" "}
            </div>
                       {" "}
            <div className="space-y-4">
                           {" "}
              <div>
                               {" "}
                <p className="text-gray-400 text-sm">Phone Number:</p>         
                     {" "}
                <div className="flex items-center mt-1">
                                   {" "}
                  <span className="text-gray-100 font-medium">
                    {selectedMember.phoneNumber}
                  </span>
                                   {" "}
                  <button
                    onClick={() => handleCopy(selectedMember.phoneNumber)}
                    className="ml-2 bg-indigo-600 text-gray-100 px-2 py-1 rounded-lg text-xs hover:bg-indigo-700 transition-colors"
                  >
                                       {" "}
                    {copyStatus === "Copied!" ? copyStatus : "Copy"}           
                         {" "}
                  </button>
                                 {" "}
                </div>
                             {" "}
              </div>
                           {" "}
              <div>
                                <p className="text-gray-400 text-sm">Email:</p> 
                             {" "}
                <div className="flex items-center mt-1">
                                   {" "}
                  <span className="text-gray-100 font-medium">
                    {selectedMember.email}
                  </span>
                                   {" "}
                  <button
                    onClick={() => handleCopy(selectedMember.email)}
                    className="ml-2 bg-indigo-600 text-gray-100 px-2 py-1 rounded-lg text-xs hover:bg-indigo-700 transition-colors"
                  >
                                       {" "}
                    {copyStatus === "Copied!" ? copyStatus : "Copy"}           
                         {" "}
                  </button>
                                 {" "}
                </div>
                             {" "}
              </div>
                         {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </div>
      )}
         {" "}
    </div>
  );
};

export default TeamSection;
