'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@heroui/react'
import { Trash2, Plus, Upload, ArrowUpFromLine } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useUploadThing } from '@/lib/uploadthing'

const visibilityOptions = [
    { key: 'visible', label: 'Visible' },
    { key: 'private', label: 'Private' },
]

const availabilityStatuses = [
    { key: 'available', label: 'Available' },
    { key: 'coming-soon', label: 'Coming Soon' },
    { key: 'out-of-stock', label: 'Out of Stock' },
]

// Book Image Uploader Component
function BookImageUploader({ onUploadComplete, onUploadError, onUploadBegin, imagePreview }) {
    const fileInputRef = useRef(null)
    const [isDragOver, setIsDragOver] = useState(false)

    const { startUpload, isUploading } = useUploadThing('bookCover', {
        onClientUploadComplete: (res) => {
            if (res && res.length > 0) {
                onUploadComplete(res)
            }
        },
        onUploadError: (error) => {
            onUploadError(error)
        },
        onUploadBegin: () => {
            onUploadBegin()
        },
    })

    function handleFileChange(e) {
        const file = e.target.files?.[0]
        if (!file) return
        startUpload([file])
    }

    function handleDrop(e) {
        e.preventDefault()
        setIsDragOver(false)
        if (isUploading) return
        const file = e.dataTransfer.files?.[0]
        if (!file || !file.type.startsWith('image/')) return
        startUpload([file])
    }

    function handleDragOver(e) {
        e.preventDefault()
        setIsDragOver(true)
    }

    function handleDragLeave(e) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsDragOver(false)
        }
    }

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 transition-all duration-200 flex flex-col items-center justify-center gap-2 cursor-pointer select-none
                ${isDragOver
                    ? 'border-blue-500 bg-blue-50 scale-[1.01]'
                    : 'border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50'
                }
                ${isUploading ? 'pointer-events-none opacity-70' : ''}
            `}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                onClick={(e) => e.stopPropagation()}
            />

            {imagePreview ? (
                <div className="flex flex-col items-center gap-4">
                    <img src={imagePreview} alt="Book preview" className="w-32 h-48 object-cover rounded-lg" />
                    <p className="text-sm text-gray-600">
                        {isUploading ? 'Uploading...' : 'Click to change image'}
                    </p>
                </div>
            ) : (
                <>
                    <div className={`transition-transform duration-200 ${isDragOver ? 'scale-110' : ''}`}>
                        <ArrowUpFromLine
                            className={`w-8 h-8 transition-colors duration-200 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`}
                        />
                    </div>
                    <p className={`text-sm font-medium transition-colors duration-200 ${isDragOver ? 'text-blue-500' : 'text-gray-600'}`}>
                        {isUploading
                            ? 'Uploading...'
                            : isDragOver
                                ? 'Drop to upload'
                                : 'Drag & drop or click to choose'}
                    </p>
                    {!isDragOver && !isUploading && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation()
                                fileInputRef.current?.click()
                            }}
                            className="mt-2 bg-theme-primary hover:bg-theme-primary/90 text-white font-semibold text-sm px-4 py-2 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-theme-primary"
                        >
                            Choose File
                        </button>
                    )}
                    <span className="text-xs text-gray-400 mt-2">Image (5MB max)</span>
                </>
            )}
        </div>
    )
}

const AddBookForm = ({ addBook, updateBook, book }) => {
    const { data } = authClient.useSession()
    const user = data?.user;

    const router = useRouter()
    const isUpdateMode = !!book
    const inputStyle = 'focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
    const cardBorderClass = 'border-gray-300'
    const sectionTextClass = 'text-gray-600'
    const labelTextClass = 'text-gray-900'
    const pageBgClass = 'bg-gray-50 text-gray-900'

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        image: '',
        price: '',
        availabilityStatus: 'available',
        stock: '',
        visibility: 'visible',
        genres: [],
        totalPages: '',
        publisher: '',
        yearOfPublishing: '',
        author: user?.email,
    })

    const [error, setError] = useState(null)
    const [genreInput, setGenreInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [imageUploadError, setImageUploadError] = useState(null)
    const [imageUploading, setImageUploading] = useState(false)

    // Initialize form data when book is provided (update mode)
    useEffect(() => {
        if (isUpdateMode && book) {
            setFormData({
                title: book.title || '',
                description: book.description || '',
                content: book.content || '',
                image: book.image || '',
                price: book.price || '',
                availabilityStatus: book.availabilityStatus || 'available',
                stock: book.stock || '',
                visibility: book.visibility || 'visible',
                genres: book.genres || [],
                totalPages: book.totalPages || '',
                publisher: book.publisher || '',
                yearOfPublishing: book.yearOfPublishing || '',
                author: user?.email,
            })
            if (book.image) {
                setImagePreview(book.image)
            }
        }
    }, [book, user?.email, isUpdateMode])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setError(null)
    }

    const handleSelectChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }))
        setError(null)
    }

    const handleAddGenre = () => {
        const trimmedGenre = genreInput.trim()
        if (trimmedGenre && !formData.genres.includes(trimmedGenre)) {
            setFormData(prev => ({
                ...prev,
                genres: [...prev.genres, trimmedGenre]
            }))
            setGenreInput('')
        }
    }

    const handleRemoveGenre = (index) => {
        setFormData(prev => ({
            ...prev,
            genres: prev.genres.filter((_, i) => i !== index)
        }))
    }

    const handleImageUploadComplete = (res) => {
        if (res && res.length > 0) {
            const uploadedFile = res[0]
            setImagePreview(uploadedFile.url)
            setFormData(prev => ({
                ...prev,
                image: uploadedFile.url
            }))
            setImageUploadError(null)
            setImageUploading(false)
        }
    }

    const handleImageUploadError = (error) => {
        setImageUploadError(error.message || 'Failed to upload image')
        setImageUploading(false)
    }

    const handleImageUploadBegin = () => {
        setImageUploading(true)
        setImageUploadError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            // Validation
            if (!formData.title.trim()) {
                setError('Title is required')
                setLoading(false)
                return
            }
            if (!formData.description.trim()) {
                setError('Description is required')
                setLoading(false)
                return
            }
            if (!formData.price || isNaN(formData.price)) {
                setError('Valid price is required')
                setLoading(false)
                return
            }
            if (!formData.stock || isNaN(formData.stock)) {
                setError('Valid stock quantity is required')
                setLoading(false)
                return
            }
            if (formData.genres.length === 0) {
                setError('At least one genre is required')
                setLoading(false)
                return
            }
            if (!formData.totalPages || isNaN(formData.totalPages)) {
                setError('Valid total pages is required')
                setLoading(false)
                return
            }

            const submitData = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                totalPages: parseInt(formData.totalPages),
                yearOfPublishing: formData.yearOfPublishing ? parseInt(formData.yearOfPublishing) : new Date().getFullYear(),
            }

            if (isUpdateMode) {
                updateBook && await updateBook(book._id, submitData)
            } else {
                addBook && await addBook(submitData)
            }

            // Reset or redirect
            if (!isUpdateMode) {
                setFormData({
                    title: '',
                    description: '',
                    content: '',
                    image: '',
                    price: '',
                    availabilityStatus: 'available',
                    stock: '',
                    visibility: 'visible',
                    genres: [],
                    totalPages: '',
                    publisher: '',
                    yearOfPublishing: '',
                    author: user?.email,
                })
                setImagePreview(null)
            }
        } catch (err) {
            setError(err.message || 'Failed to save book. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (!user) {
        return (
            <div className={`flex items-center justify-center min-h-screen ${pageBgClass}`}>
                <div className="text-center">
                    <p className="text-xl mb-4">Please log in to add a book</p>
                    <Button
                        onPress={() => router.push('/auth/log-in')}
                        className="bg-theme-primary text-white"
                    >
                        Go to Login
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className={`min-h-screen ${pageBgClass} py-8 px-4 md:px-8`}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">{isUpdateMode ? 'Update Book' : 'Add New Book'}</h1>
                    <p className={`text-lg ${sectionTextClass}`}>
                        {isUpdateMode ? 'Update the book details below' : 'Fill in the details to add a new book to your collection'}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 rounded-lg border-l-4 bg-red-100 border-red-500 text-red-700">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Book Image Section */}
                    <BookImageUploader
                        onUploadComplete={handleImageUploadComplete}
                        onUploadError={handleImageUploadError}
                        onUploadBegin={handleImageUploadBegin}
                        imagePreview={imagePreview}
                    />

                    {imageUploadError && (
                        <div className="p-4 rounded-lg bg-red-100 border-l-4 border-red-500 text-red-700">
                            {imageUploadError}
                        </div>
                    )}

                    {/* Basic Information Section */}
                    <div className={`border rounded-lg p-6 ${cardBorderClass}`}>
                        <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div className="md:col-span-2">
                                <label className={`block text-sm font-semibold mb-2 ${labelTextClass}`}>
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter book title"
                                    className={`w-full px-4 py-2 rounded-lg border ${inputStyle}`}
                                    required
                                />
                            </div>

                            {/* Publisher */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${labelTextClass}`}>
                                    Publisher
                                </label>
                                <input
                                    type="text"
                                    name="publisher"
                                    value={formData.publisher}
                                    onChange={handleChange}
                                    placeholder="Publisher name"
                                    className={`w-full px-4 py-2 rounded-lg border ${inputStyle}`}
                                />
                            </div>

                            {/* Year of Publishing */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${labelTextClass}`}>
                                    Year of Publishing
                                </label>
                                <input
                                    type="number"
                                    name="yearOfPublishing"
                                    value={formData.yearOfPublishing}
                                    onChange={handleChange}
                                    placeholder={new Date().getFullYear()}
                                    className={`w-full px-4 py-2 rounded-lg border ${inputStyle}`}
                                />
                            </div>

                            {/* Total Pages */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${labelTextClass}`}>
                                    Total Pages <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="totalPages"
                                    value={formData.totalPages}
                                    onChange={handleChange}
                                    placeholder="Number of pages"
                                    className={`w-full px-4 py-2 rounded-lg border ${inputStyle}`}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description & Content Section */}
                    <div className={`border rounded-lg p-6 ${cardBorderClass}`}>
                        <h2 className="text-2xl font-semibold mb-6">Content</h2>
                        <div className="space-y-6">
                            {/* Description */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${labelTextClass}`}>
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Brief description of the book"
                                    rows="4"
                                    className={`w-full px-4 py-2 rounded-lg border resize-none ${inputStyle}`}
                                    required
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${labelTextClass}`}>
                                    Content
                                </label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    placeholder="Full content or excerpt of the book"
                                    rows="6"
                                    className={`w-full px-4 py-2 rounded-lg border resize-none ${inputStyle}`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Genres Section */}
                    <div className={`border rounded-lg p-6 ${cardBorderClass}`}>
                        <h2 className="text-2xl font-semibold mb-6">Genres <span className="text-red-500">*</span></h2>
                        <div className="space-y-4">
                            {/* Genre Input */}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={genreInput}
                                    onChange={(e) => setGenreInput(e.target.value)}
                                    placeholder="Type a genre and press add"
                                    className={`flex-1 px-4 py-2 rounded-lg border ${inputStyle}`}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault()
                                            handleAddGenre()
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddGenre}
                                    className="px-4 py-2 rounded-lg bg-theme-primary hover:bg-theme-primary/90 text-white flex items-center gap-2 font-semibold transition"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add
                                </button>
                            </div>

                            {/* Genre Tags */}
                            <div className="flex flex-wrap gap-3">
                                {formData.genres.map((genre, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200"
                                    >
                                        <span className="text-sm font-semibold">{genre}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveGenre(index)}
                                            className="hover:bg-gray-300 p-1 rounded-full transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {formData.genres.length === 0 && (
                                <p className={`text-sm ${sectionTextClass}`}>No genres added yet</p>
                            )}
                        </div>
                    </div>

                    {/* Pricing & Availability Section */}
                    <div className={`border rounded-lg p-6 ${cardBorderClass}`}>
                        <h2 className="text-2xl font-semibold mb-6">Pricing & Availability</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Price */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${labelTextClass}`}>
                                    Price (৳) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    className={`w-full px-4 py-2 rounded-lg border ${inputStyle}`}
                                    required
                                />
                            </div>

                            {/* Stock */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${labelTextClass}`}>
                                    Stock Quantity <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="Number of copies"
                                    className={`w-full px-4 py-2 rounded-lg border ${inputStyle}`}
                                    required
                                />
                            </div>

                            {/* Availability Status */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${labelTextClass}`}>
                                    Availability Status
                                </label>
                                <select
                                    name="availabilityStatus"
                                    value={formData.availabilityStatus}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg border ${inputStyle}`}
                                >
                                    {availabilityStatuses.map(status => (
                                        <option key={status.key} value={status.key}>
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Visibility */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${labelTextClass}`}>
                                    Visibility
                                </label>
                                <select
                                    name="visibility"
                                    value={formData.visibility}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg border ${inputStyle}`}
                                >
                                    {visibilityOptions.map(option => (
                                        <option key={option.key} value={option.key}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-8 py-3 rounded-lg font-semibold transition bg-gray-200 hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 rounded-lg bg-theme-primary text-white font-semibold hover:bg-theme-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : isUpdateMode ? 'Update Book' : 'Add Book'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddBookForm
