import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaSpinner, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaBriefcase, FaCode, FaCertificate, FaUserCheck, FaProjectDiagram } from 'react-icons/fa';

export default function CV() {
  const [cvLoading, setCvLoading] = useState('loading');
  const [cvData, setCvData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          cvUserRes,
          skillsRes,
          certificatesRes,
          refereesRes,
          educationRes,
          experienceRes,
          projectsRes
        ] = await Promise.all([
          axios.get(import.meta.env.VITE_BACKEND_URL + `/api/cvuser/test2`),
          axios.get(import.meta.env.VITE_BACKEND_URL + `/api/skills/test1`),
          axios.get(import.meta.env.VITE_BACKEND_URL + `/api/certificates/test1`),
          axios.get(import.meta.env.VITE_BACKEND_URL + `/api/referees/12345`),
          axios.get(import.meta.env.VITE_BACKEND_URL + `/api/education/12345`),
          axios.get(import.meta.env.VITE_BACKEND_URL + `/api/experience/test1`),
          axios.get(import.meta.env.VITE_BACKEND_URL + `/api/projects/test1`)
        ]);

        // Extract relevant data
        const user = cvUserRes.data;
        const skills = skillsRes.data.skills || [];
        const certificates = certificatesRes.data.certificates || [];
        const referees = refereesRes.data.referees || [];
        const education = educationRes.data.details || [];
        const experience = experienceRes.data.experiences || [];
        const projects = projectsRes.data.projects || [];

        // Set the CV data
        setCvData({
          user,
          skills,
          certificates,
          referees,
          education,
          experience,
          projects
        });
        setCvLoading('loaded');
      } catch (error) {
        console.error('Error fetching CV data:', error);
        setCvLoading('error');
      }
    };

    fetchData();
  }, []);

  if (cvLoading === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (cvLoading === 'error') {
    return <div className="text-red-500 text-center">Failed to load CV data.</div>;
  }

  const { user, skills, certificates, referees, education, experience, projects } = cvData;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-4">{`${user.firstName} ${user.lastName}`}</h1>
        <p className="text-xl font-semibold mb-6">{user.shortBio}</p>

        {/* Contact Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold flex items-center mb-2">
            <FaUser className="mr-2 text-blue-500" /> Contact Information
          </h2>
          <ul className="list-disc pl-6">
            <li><FaEnvelope className="inline mr-2 text-blue-500" /> Email: {user.email}</li>
            <li><FaPhone className="inline mr-2 text-blue-500" /> Phone: {user.phone}</li>
            <li><FaUser className="inline mr-2 text-blue-500" /> Address: {user.Address}</li>
            <li><a href={user.linkedinURL} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              <FaUserCheck className="inline mr-2 text-blue-500" /> LinkedIn
            </a></li>
            <li><a href={user.githubURL} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              <FaCode className="inline mr-2 text-blue-500" /> GitHub
            </a></li>
          </ul>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold flex items-center mb-2">
            <FaCode className="mr-2 text-blue-500" /> Skills
          </h2>
          <ul className="list-disc pl-6">
            {skills.map((skill, index) => (
              <li key={index}>
                <strong>{skill.category}:</strong> {skill.items}
              </li>
            ))}
          </ul>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold flex items-center mb-2">
            <FaBriefcase className="mr-2 text-blue-500" /> Experience
          </h2>
          <ul className="pl-6">
            {experience.map((exp, index) => (
              <li key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                <p className="text-gray-600">
                  {exp.company} | {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                </p>
                <ul className="list-disc pl-6">
                  {exp.description.split('\n').map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold flex items-center mb-2">
            <FaGraduationCap className="mr-2 text-blue-500" /> Education
          </h2>
          <ul className="pl-6">
            {education.map((edu, index) => (
              <li key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                <p className="text-gray-600">
                  {edu.school} | {new Date(edu.startDate).toLocaleDateString()} - {new Date(edu.endDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">{edu.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Certificates */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold flex items-center mb-2">
            <FaCertificate className="mr-2 text-blue-500" /> Certificates
          </h2>
          <ul className="list-disc pl-6">
            {certificates.map((certificate, index) => (
              <li key={index}>
                <a href={certificate.Link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {certificate.certificateName} - {certificate.instituteName}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold flex items-center mb-2">
            <FaProjectDiagram className="mr-2 text-blue-500" /> Projects
          </h2>
          <ul className="pl-6">
            {projects.map((project, index) => (
              <li key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-gray-600">
                  Tech Stack: {project.techStack.join(', ')}
                </p>
                <p className="text-gray-600">{project.description}</p>
                <div className="mt-2">
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-blue-500 mr-4">
                    Live Demo
                  </a>
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    GitHub Repository
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}