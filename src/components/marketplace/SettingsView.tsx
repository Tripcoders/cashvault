'use client'

import React, { useState } from 'react'
import { User, Mail, Shield, Save, CheckCircle } from 'lucide-react'
import { useUserStore } from '@/stores/user-store'
import { useUser } from "@stackframe/stack"

export function SettingsView() {
    const { user, updateUsername } = useUserStore()
    const stackUser = useUser()
    const [username, setUsername] = useState(user?.username || '')
    const [success, setSuccess] = useState(false)

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        updateUsername(username)
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
    }

    return (
        <div className="max-w-2xl mx-auto py-8 animate-face-in-up">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
                <p className="text-muted-foreground mt-2">Manage your public profile and preferences.</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <form onSubmit={handleSave} className="space-y-6">

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-500" />
                            Profile Details
                        </h2>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-muted-foreground">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-4 bg-muted/50 border border-border rounded-xl focus:border-blue-500 outline-none transition-all"
                                placeholder="Enter new username"
                            />
                        </div>

                        <div className="grid gap-2 opacity-60 pointer-events-none">
                            <label className="text-sm font-medium text-muted-foreground">Email Address (Managed via Auth)</label>
                            <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                                <Mail className="w-4 h-4" />
                                <span>{user?.email || stackUser?.primaryEmail || 'user@example.com'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all hover-lift flex items-center gap-2"
                        >
                            {success ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                            {success ? 'Saved!' : 'Save Changes'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
