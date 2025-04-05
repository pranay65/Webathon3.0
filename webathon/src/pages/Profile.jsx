// import { useEffect, useState } from "react";
// import axios from "axios";

// function Profile() {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("http://localhost:5400/user/type", {
//           headers: {
//             Authorization: `Bearer ${window.localStorage.getItem("token")}`,
//           },
//         });

//         const userD = response.data.dbUser;

//         setUserData(userD);

//         console.log(userData);
//       } catch (err) {
//         console.error("Failed to fetch user data:", err);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (!userData) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <p className="text-gray-600 text-lg font-medium">Loading profile...</p>
//       </div>
//     );
//   }

//   const isBuyer = userData.userType === "buyer";

//   console.log(isBuyer);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 p-6">
//       <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
//         <h1 className="text-3xl font-bold mb-6 text-indigo-700">
//           {isBuyer ? "Client Profile" : "Freelancer Profile"}
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">Name</h2>
//             <p className="text-gray-600">{userData.name}</p>
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">Email</h2>
//             <p className="text-gray-600">{userData.email}</p>
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">
//               Location
//             </h2>
//             <p className="text-gray-600">
//               {userData.location || "Not provided"}
//             </p>
//           </div>
//         </div>

//         {isBuyer && (
//           <div>
//             <h2 className="text-2xl font-bold text-indigo-600 mb-4">
//               Projects Overview
//             </h2>
//             <p className="text-gray-700 mb-4">
//               {userData.description || "No description provided."}
//             </p>
//             <div className="space-y-4">
//               {(userData.projects || []).map((project, index) => (
//                 <div
//                   key={index}
//                   className="border border-indigo-200 p-4 rounded-xl shadow-sm bg-indigo-50"
//                 >
//                   <h3 className="font-semibold text-lg text-indigo-800">
//                     {project.title}
//                   </h3>
//                   <p className="text-gray-600">{project.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {!isBuyer && (
//           <div className="space-y-10">
//             <div>
//               <h2 className="text-2xl font-bold text-indigo-600 mb-4">
//                 Skills
//               </h2>
//               <div className="flex flex-wrap gap-3">
//                 {(userData.skills || []).map((skill, index) => (
//                   <span
//                     key={index}
//                     className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h2 className="text-2xl font-bold text-indigo-600 mb-4">
//                 Portfolio
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {(userData.portfolio || []).map((item, index) => (
//                   <div
//                     key={index}
//                     className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition"
//                   >
//                     <h3 className="text-lg font-semibold text-indigo-700">
//                       {item.title}
//                     </h3>
//                     <p className="text-gray-600 text-sm">{item.description}</p>
//                     {item.link && (
//                       <a
//                         href={item.link}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-sm text-blue-500 hover:underline mt-2 inline-block"
//                       >
//                         View Project
//                       </a>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h2 className="text-2xl font-bold text-indigo-600 mb-4">
//                 Experience
//               </h2>
//               <ul className="space-y-3">
//                 {(userData.experience || []).map((exp, index) => (
//                   <li
//                     key={index}
//                     className="border-l-4 border-indigo-400 pl-4 py-2 bg-indigo-50 rounded"
//                   >
//                     <p className="font-semibold text-indigo-800">{exp.role}</p>
//                     <p className="text-gray-600 text-sm">{exp.company}</p>
//                     <p className="text-gray-500 text-xs">{exp.duration}</p>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Profile;

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5400/user/type", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });

        const userD = response.data.dbUser;
        setUserData(userD);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUser();
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg font-medium">Loading profile...</p>
      </div>
    );
  }

  const isBuyer = userData.userType === "buyer";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 p-6 pt-32">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-indigo-700">
            {isBuyer ? "Client Profile" : "Freelancer Profile"}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Name</h2>
              <p className="text-gray-600">{userData.name}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                User Type
              </h2>
              <p className="text-gray-600 capitalize">{userData.userType}</p>
            </div>
          </div>

          {isBuyer && (
            <div>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                Projects Overview
              </h2>
              <p className="text-gray-700 mb-4">
                {userData.description || "No description provided."}
              </p>
              <div className="space-y-4">
                {(userData.projects || []).map((project, index) => (
                  <div
                    key={index}
                    className="border border-indigo-200 p-4 rounded-xl shadow-sm bg-indigo-50"
                  >
                    <h3 className="font-semibold text-lg text-indigo-800">
                      {project.title}
                    </h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isBuyer && (
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-3">
                  {(userData.skills || []).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                  Certifications
                </h2>
                <ul className="list-disc pl-6 text-gray-700">
                  {(userData.certifications || []).map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                  Portfolio
                </h2>
                {!userData.portfolio || userData.portfolio.length === 0 ? (
                  <p className="text-gray-500">No portfolio added yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {userData.portfolio.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition"
                      >
                        <h3 className="text-lg font-semibold text-indigo-700">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-blue-500 hover:underline mt-2 inline-block"
                          >
                            View Project
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
