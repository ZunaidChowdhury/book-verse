'use client'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Trash2, Edit2, ChevronDown } from 'lucide-react';
import { getAllUsers, updateUserRole, deleteUser } from '@/lib/api/admin';
import Link from 'next/link';

export default function ManageUsersPage() {
    const { isDark } = useSelector((state) => state.theme);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [selectedRole, setSelectedRole] = useState({});
    const [sortBy, setSortBy] = useState('name-az');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await getAllUsers();
                const usersArray = Array.isArray(data) ? data : [];
                setUsers(usersArray);
                const roleMap = {};
                usersArray.forEach(user => {
                    roleMap[user._id] = user.role;
                });
                setSelectedRole(roleMap);
            } catch (err) {
                setError('Failed to load users');
                toast.error('Failed to load users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleUpdateRole = async (userId, newRole) => {
        try {
            await updateUserRole(userId, newRole);
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
            setSelectedRole(prev => ({ ...prev, [userId]: newRole }));
            setEditingId(null);
            toast.success('User role updated successfully');
        } catch (err) {
            toast.error('Failed to update user role');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            await deleteUser(userId);
            setUsers(users.filter(u => u._id !== userId));
            toast.success('User deleted successfully');
        } catch (err) {
            toast.error('Failed to delete user');
        }
    };

    const getSortedUsers = () => {
        const sorted = [...users];
        if (sortBy === 'name-az') {
            sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        } else if (sortBy === 'name-za') {
            sorted.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
        } else if (sortBy === 'role') {
            sorted.sort((a, b) => a.role.localeCompare(b.role));
        } else if (sortBy === 'email') {
            sorted.sort((a, b) => (a.email || '').localeCompare(b.email || ''));
        }
        return sorted;
    };

    const sortedUsers = getSortedUsers();

    if (loading) {
        return (
            <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'} p-4 sm:p-6 lg:p-8`}>
                <div className="text-center py-12">
                    <p className={`text-lg ${isDark ? 'text-text-secondary' : 'text-text-secondary'}`}>
                        Loading users...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'} p-4 sm:p-6 lg:p-8`}>
                <div className="text-center py-12">
                    <p className="text-lg text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-background transition-colors`}>
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className={`text-3xl sm:text-4xl font-bold mb-2 text-text-primary`}>
                        Manage Users
                    </h1>
                    <p className={`text-sm sm:text-base text-text-secondary`}>
                        View and manage user roles and permissions
                    </p>
                </div>

                {/* Sort Dropdown */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="text-sm sm:text-base">
                        <span className={'text-text-secondary'}>
                            Total: {users.length} user{users.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={`px-4 py-2 rounded-lg border transition-all text-sm sm:text-base ${
                            isDark
                                ? 'bg-foreground border-border-dark text-text-primary'
                                : 'bg-foreground border-border-light text-text-primary'
                        }`}
                    >
                        <option value="name-az">Name: A-Z</option>
                        <option value="name-za">Name: Z-A</option>
                        <option value="email">Email</option>
                        <option value="role">Role</option>
                    </select>
                </div>

                {users.length === 0 ? (
                    <div className={`text-center py-16 rounded-lg bg-foreground`}>
                        <p className={`text-lg text-text-secondary`}>
                            No users found
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto rounded-lg border border-border-dark">
                            <table className={`w-full text-sm bg-foreground`}>
                                <thead>
                                    <tr className={`border-b ${isDark ? 'border-border-dark bg-black/50' : 'border-border-light bg-gray-50'}`}>
                                        <th className={`px-4 py-3 text-left font-semibold text-text-primary`}>
                                            Name
                                        </th>
                                        <th className={`px-4 py-3 text-left font-semibold text-text-primary`}>
                                            Email
                                        </th>
                                        <th className={`px-4 py-3 text-left font-semibold text-text-primary`}>
                                            Role
                                        </th>
                                        <th className={`px-4 py-3 text-left font-semibold text-text-primary`}>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedUsers.map((user) => (
                                        <tr key={user._id} className={`border-b ${isDark ? 'border-border-dark hover:bg-black/30' : 'border-border-light hover:bg-gray-50'} transition-colors`}>
                                            <td className={`px-4 py-3 font-medium ${isDark ? 'text-text-primary' : 'text-text-primary'}`}>
                                                <Link href={`/user/${user._id}`} className="underline">
                                                    {user.name || 'N/A'}
                                                </Link>
                                            </td>
                                            <td className={`px-4 py-3 ${isDark ? 'text-text-secondary' : 'text-text-secondary'}`}>
                                                {user.email}
                                            </td>
                                            <td className="px-4 py-3">
                                                {editingId === user._id ? (
                                                    <select
                                                        value={selectedRole[user._id] || user.role}
                                                        onChange={(e) => setSelectedRole(prev => ({ ...prev, [user._id]: e.target.value }))}
                                                        className={`px-2 py-1 rounded text-sm border ${
                                                            isDark
                                                                ? 'bg-black/50 border-border-dark text-text-primary'
                                                                : 'bg-white border-border-light text-text-primary'
                                                        }`}
                                                    >
                                                        <option value="reader">Reader</option>
                                                        <option value="writer">Writer</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                ) : (
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        user.role === 'admin'
                                                            ? 'bg-red-100/20 text-red-600'
                                                            : user.role === 'writer'
                                                                ? 'bg-blue-100/20 text-blue-600'
                                                                : 'bg-green-100/20 text-green-600'
                                                    }`}>
                                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 flex gap-2">
                                                {editingId === user._id ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleUpdateRole(user._id, selectedRole[user._id])}
                                                            className="px-3 py-1 bg-theme-primary text-white rounded text-sm hover:opacity-90"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingId(null)}
                                                            className={`px-3 py-1 rounded text-sm ${
                                                                isDark
                                                                    ? 'bg-foreground border border-border-dark text-text-primary'
                                                                    : 'bg-gray-100 border border-border-light text-text-primary'
                                                            }`}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => setEditingId(user._id)}
                                                            className="p-2 text-text-primary  hover:bg-theme-primary/20 rounded transition-colors"
                                                            title="Edit role"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteUser(user._id)}
                                                            className="p-2 hover:bg-red-500/20 rounded transition-colors text-red-500"
                                                            title="Delete user"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden grid grid-cols-1 gap-4">
                            {sortedUsers.map((user) => (
                                <div 
                                    key={user._id}
                                    className={`p-4 rounded-lg border transition-all ${
                                        isDark 
                                            ? 'bg-foreground border-border-dark' 
                                            : 'bg-background border-border-light'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className={`font-semibold text-sm sm:text-base ${isDark ? 'text-text-primary' : 'text-text-primary'}`}>
                                                {user.name || 'N/A'}
                                            </h3>
                                            <p className={`text-xs sm:text-sm ${isDark ? 'text-text-secondary' : 'text-text-secondary'}`}>
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <p className={`text-xs mb-2 ${isDark ? 'text-text-secondary' : 'text-text-secondary'}`}>
                                            Role
                                        </p>
                                        <select
                                            value={selectedRole[user._id] || user.role}
                                            onChange={(e) => setSelectedRole(prev => ({ ...prev, [user._id]: e.target.value }))}
                                            className={`w-full px-2 py-1 rounded border text-sm ${
                                                isDark
                                                    ? 'bg-black/50 border-border-dark text-text-primary'
                                                    : 'bg-white border-border-light text-text-primary'
                                            }`}
                                        >
                                            <option value="reader">Reader</option>
                                            <option value="writer">Writer</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdateRole(user._id, selectedRole[user._id])}
                                            className="flex-1 px-3 py-2 bg-theme-primary text-white rounded text-sm hover:opacity-90"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="px-3 py-2 hover:bg-red-500/20 rounded transition-colors text-red-500"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
