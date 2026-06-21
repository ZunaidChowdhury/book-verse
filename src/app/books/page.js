import BookCard from '@/components/cards/BookCard';
import SectionHeading from '@/components/shared/SectionHeading';
import BooksFilterLayout from '@/components/sections/BooksFilterLayout';
import { getBooks } from '@/lib/api/books';
import React from 'react'

const BooksPage = async ({ searchParams }) => {
    const sp = await searchParams;

    // Prepare parameters for API call
    const apiParams = {
        search: sp.search || '',
        genres: sp.genres ? sp.genres.split(',').filter(Boolean) : [],
        availability: sp.availability || 'all',
        minPrice: sp.minPrice || '0',
        maxPrice: sp.maxPrice || '1000',
        sort: sp.sort || 'newest',
        page: sp.page || '1',
        limit: '9',
    };

    const { books, pagination } = await getBooks(apiParams);

    return (
        <div className='py-12 tablet:py-20'>
            <div className='max-w-358 px-4 mx-auto'>
                <SectionHeading
                    title='Discover Your Next Read'
                    description='Filter and search through our collection of amazing books.'
                    classNames='pb-10' />

                {/* Books Filter Layout */}
                <BooksFilterLayout pagination={pagination}>
                    {/* Book Grid */}
                    {
                        books && (
                            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
                                {
                                    books.length > 0 ? (
                                        books.map((book) => (
                                            <BookCard
                                                key={book._id}
                                                book={book}
                                            />
                                        ))
                                    ) : (
                                        <div className='col-span-full text-center py-12'>
                                            <p className='text-text-secondary text-lg'>
                                                No Books found matching your criteria.
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </BooksFilterLayout>
            </div>
        </div >
    )
}

export default BooksPage