'use client'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getReaderProfile, updateReaderProfile } from '@/lib/api/readers';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import MyCustomSpinner from '@/components/spinner/MyCustomSpinner'

export default function ProfileManagementPage() {
    const { isDark } = useSelector((state) => state.theme);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        image: ''
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await getReaderProfile();
                setProfile(data);
                setFormData({
                    name: data.name || '',
                    email: data.email || '',
                    bio: data.bio || '',
                    image: data.image || ''
                });
            } catch (err) {
                setError('Failed to load profile');
                toast.error('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const formDataImage = new FormData();
            formDataImage.append('file', file);

            // Replace with your actual image upload endpoint
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formDataImage
            });

            if (response.ok) {
                const data = await response.json();
                setFormData(prev => ({ ...prev, image: data.url }));
                toast.success('Image uploaded successfully');
            }
        } catch (err) {
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        try {
            setUploading(true);
            await updateReaderProfile(formData);
            setProfile(formData);
            setEditing(false);
            toast.success('Profile updated successfully');
        } catch (err) {
            toast.error('Failed to update profile');
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className={`my-30`}>
                <MyCustomSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 transition-colors">
                <div className="text-center py-12">
                    <p className="text-lg text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background transition-colors">
            <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-text-primary">
                        Profile Settings
                    </h1>
                    <p className="text-sm sm:text-base text-text-secondary">
                        Manage your reader profile
                    </p>
                </div>

                {/* Profile Card */}
                <div className={`rounded-lg border p-6 sm:p-8 transition-all ${
                    isDark
                        ? 'bg-foreground border-border-dark'
                        : 'bg-foreground border-border-light'
                }`}>
                    {/* Profile Image Section */}
                    <div className={`flex flex-col sm:flex-row gap-6 mb-8 pb-8 border-b ${
                        isDark ? 'border-border-dark' : 'border-border-light'
                    }`}>
                        <div className="relative">
                            <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-theme-primary flex items-center justify-center ${
                                isDark ? 'bg-black/30' : 'bg-black/5'
                            }`}>
                                {formData.image ? (
                                    <Image
                                        src={formData.image}
                                        alt={formData.name}
                                        width={128}
                                        height={128}
                                        className="object-cover"
                                    />
                                ) : (
                                    <span className="text-4xl">👤</span>
                                )}
                            </div>
                            {editing && (
                                <label className="absolute bottom-0 right-0 p-2 bg-theme-primary rounded-full cursor-pointer hover:opacity-90 transition-opacity">
                                    <Camera size={16} className="text-white" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                    />
                                </label>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col items-start justify-center ">
                            <p className="text-base sm:text-lg font-semibold mb-2 text-text-primary">
                                {formData.name || 'Reader'}
                            </p>
                            <p className="text-sm text-text-secondary">
                                {formData.email}
                            </p>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-text-primary">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={!editing}
                                className={`w-full px-4 py-2 rounded-lg border transition-all text-sm sm:text-base ${
                                    editing
                                        ? isDark
                                            ? 'bg-black/30 border-border-dark text-text-primary focus:border-theme-primary outline-none'
                                            : 'bg-white border-border-light text-text-primary focus:border-theme-primary outline-none'
                                        : isDark
                                            ? 'bg-black/10 border-border-dark text-text-primary cursor-not-allowed'
                                            : 'bg-black/5 border-border-light text-text-primary cursor-not-allowed'
                                }`}
                            />
                        </div>

                        {/* Email (Read-only) */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-text-primary">
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                disabled
                                className={`w-full px-4 py-2 rounded-lg border text-sm sm:text-base ${
                                    isDark
                                        ? 'bg-black/10 border-border-dark text-text-secondary cursor-not-allowed'
                                        : 'bg-black/5 border-border-light text-text-secondary cursor-not-allowed'
                                }`}
                            />
                            <p className="text-xs mt-1 text-text-secondary pl-2 pt-2">
                                Email cannot be changed
                            </p>
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-text-primary">
                                Bio (Optional)
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                disabled={!editing}
                                rows="4"
                                placeholder="Tell us about yourself..."
                                className={`w-full px-4 py-2 rounded-lg border transition-all text-sm sm:text-base resize-none ${
                                    editing
                                        ? isDark
                                            ? 'bg-black/30 border-border-dark text-text-primary focus:border-theme-primary outline-none placeholder:text-text-secondary'
                                            : 'bg-white border-border-light text-text-primary focus:border-theme-primary outline-none placeholder:text-text-secondary'
                                        : isDark
                                            ? 'bg-black/10 border-border-dark text-text-primary cursor-not-allowed'
                                            : 'bg-black/5 border-border-light text-text-primary cursor-not-allowed'
                                }`}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex gap-3 mt-8 pt-8 border-t ${
                        isDark ? 'border-border-dark' : 'border-border-light'
                    }`}>
                        {!editing ? (
                            <button
                                onClick={() => setEditing(true)}
                                className="flex-1 px-6 py-2 bg-theme-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm sm:text-base"
                            >
                                Edit Profile
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        setEditing(false);
                                        setFormData({
                                            name: profile?.name || '',
                                            email: profile?.email || '',
                                            bio: profile?.bio || '',
                                            image: profile?.image || ''
                                        });
                                    }}
                                    disabled={uploading}
                                    className={`flex-1 px-6 py-2 rounded-lg font-medium text-sm sm:text-base transition-all border text-text-primary ${
                                        isDark
                                            ? 'bg-black/10 border-border-dark hover:border-theme-primary'
                                            : 'bg-black/5 border-border-light hover:border-theme-primary'
                                    }`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={uploading}
                                    className="flex-1 px-6 py-2 bg-theme-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm sm:text-base disabled:opacity-50"
                                >
                                    {uploading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
