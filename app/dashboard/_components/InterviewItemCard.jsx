"use client";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Calendar, Briefcase, History } from 'lucide-react';

const InterviewItemCard = ({ interview }) => {
    const router = useRouter();

    const onStart = () => {
        router.push("/dashboard/interview/" + interview?.mockId);
    };

    const onFeedback = () => {
        router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    return (
        <div className='relative group p-5 rounded-2xl border border-white/10 bg-gray-900/40 backdrop-blur-sm hover:border-white/20 transition-all duration-300'>

            {/* Job Position Title */}
            <div className='flex items-start justify-between mb-4'>
                <div className='space-y-1'>
                    <h2 className='font-bold text-xl text-white group-hover:text-blue-400 transition-colors'>
                        {interview?.jobPos}
                    </h2>
                    <div className='flex items-center gap-2 text-sm text-gray-400'>
                        <Briefcase className='w-3.5 h-3.5' />
                        <span>{interview?.jobExperience} Years of Experience</span>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-2 text-[11px] text-gray-500 border-t border-white/5 pt-4 mt-4 uppercase tracking-wider font-semibold'>
                <Calendar className='w-3 h-3' />
                <span>Created: {interview?.createdAt ? formatDate(interview.createdAt) : 'N/A'}</span>
            </div>

            {/* Buttons */}
            <div className='flex items-center mt-6 gap-3'>
                <Button
                    onClick={onFeedback}
                    size="sm"
                    variant='outline'
                    className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white cursor-pointer transition-all rounded-lg"
                >
                    <History className='w-4 h-4 mr-2' />
                    Feedback
                </Button>

                <Button
                    onClick={onStart}
                    size="sm"
                    className="flex-1 bg-white text-black hover:bg-gray-200 cursor-pointer font-bold transition-all rounded-lg shadow-lg shadow-white/5"
                >
                    Start
                </Button>
            </div>

        </div>
    );
}

export default InterviewItemCard;
