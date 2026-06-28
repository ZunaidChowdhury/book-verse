"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';
import BookCard from '../cards/BookCard';

const FeaturedBooks = ({ featuredBooks }) => {
  if (!featuredBooks || featuredBooks.length === 0) return null;

  // Stagger animation variants for the grid and card items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };



  return (
    <div className='py-12 tablet:py-30 overflow-hidden bg-theme-background'>
      {/* container */}
      <div className='max-w-358 px-4 mx-auto'>
        <SectionHeading
          title='Featured Books'
          subTitle='FEATURED'
          actionTxtBtn={{ text: 'View All Books', url: '/all-books' }}
          classNames='pb-8 tablet:pb-16'
          dark={true}
        />
        
        {/* Animated Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
        >
          {featuredBooks.map((book) => <BookCard key={book._id} book={book} />)}
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedBooks;