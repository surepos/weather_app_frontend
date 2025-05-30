'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import me from '@/public/images/me.jpg';

function Profile() {
  const [showName, setShowName] = useState(false);

  return (
    <div className="fixed bottom-10 right-10 text-amber-50">
      <AnimatePresence>
        {showName && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 mt-2 p-5 rounded-lg bg-dark-secondary border border-neutral-700 shadow-lg md:w-100 w-70 text-white">
            <p className="mb-1 text-[10px] md:text-sm tracking-wide text-gray-300">
              Crafted by <strong className="text-white">Sura</strong>
            </p>
            <p className="text-[10px] md:text-sm text-gray-400 leading-relaxed">
              <strong className="text-white">PM Accelerator</strong> helps
              aspiring and current product managers grow their careers through
              mentorship, resources, and hands-on experience.
            </p>
            <p className="mt-2 text-[10px] md:text-sm text-blue-400 hover:underline">
              <a
                href="https://www.linkedin.com/school/pmaccelerator/"
                target="_blank"
                rel="noopener noreferrer">
                ↗ Visit us on LinkedIn
              </a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="md:w-16 md:h-16 w-10 h-10 cursor-pointer"
        onClick={() => setShowName(!showName)}>
        <Image src={me} alt="Me" className="rounded-full" />
      </div>
    </div>
  );
}

export default Profile;
