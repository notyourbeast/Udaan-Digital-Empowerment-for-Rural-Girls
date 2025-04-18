'use client';

import { useState } from 'react';
import {
  FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes,
  FaLaptop, FaMoneyBillWave, FaHeartbeat, FaGraduationCap,
  FaBrain, FaStar, FaUserGraduate
} from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("digital");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "digital", name: "Digital Literacy", icon: FaLaptop },
    { id: "financial", name: "Financial Skills", icon: FaMoneyBillWave },
    { id: "health", name: "Health & Wellness", icon: FaHeartbeat },
    { id: "entrepreneurship", name: "Entrepreneurship", icon: FaGraduationCap },
    { id: "life-skills", name: "Life Skills", icon: FaBrain },
  ];

  const courses = {/* full JSON here was provided */}; // Use the same object content

  const filteredCourses = courses[selectedCategory]?.filter(course => {
    const q = searchQuery.toLowerCase();
    return course.title.toLowerCase().includes(q) || course.description.toLowerCase().includes(q);
  }) || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Rural Girl Empowerment Platform</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-secondary rounded"><FaUser /></button>
            <button className="p-2 hover:bg-secondary rounded"><FaShoppingCart /></button>
            <button
              className="p-2 hover:bg-secondary rounded md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Empowering Rural Girls Through Education</h2>
          <p className="text-xl text-gray-300">Access quality education and skills training from anywhere</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full p-4 pl-12 rounded-lg bg-secondary text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-secondary text-gray-300"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <category.icon className="inline-block mr-2" />
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Link href={`/course/${course.id}`} key={course.id}>
              <div className="course-card bg-secondary rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="relative pb-[56.25%]">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${course.youtubeId}`}
                    title={course.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-300 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <FaUserGraduate className="mr-1" />
                      <span>{course.students}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
