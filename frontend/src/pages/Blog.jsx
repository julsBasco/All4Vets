import React, { useState } from 'react';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { blogPosts } from '../mock';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Healthcare', 'Benefits', 'Mental Health', 'Career', 'Housing', 'News'];
  
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0B1D39] to-[#1a2f4d] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Veterans Resources & Insights
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Expert guidance, latest news, and valuable resources to help veterans navigate benefits, healthcare, and life transitions.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-[#F3F5F7] py-6 sticky top-[64px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#0B1D39] text-white shadow-md'
                    : 'bg-white text-[#3C4A5B] hover:bg-[#0B1D39] hover:text-white border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-[#BF9B30] hover:bg-[#a88828] text-white font-semibold border-0">
                    {post.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-[#3C4A5B] mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1D39] mb-3 group-hover:text-[#E64A38] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#3C4A5B] mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-[#0B1D39] hover:text-[#E64A38] p-0 font-semibold group/btn"
                  >
                    Read More 
                    <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-[#3C4A5B]">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0B1D39] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
            Need Personalized Support?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Our expert advocates are here to help you navigate your unique situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#E64A38] hover:bg-[#d43e2e] text-white font-bold px-8 py-6 text-lg rounded-full">
              Apply for Aid
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#0B1D39] font-bold px-8 py-6 text-lg rounded-full"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
