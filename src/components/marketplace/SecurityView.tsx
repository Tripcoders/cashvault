'use client'

import React from 'react'
import { Shield, Lock, Key, AlertTriangle, Smartphone } from 'lucide-react'

export function SecurityView() {
    return (
        <div className="max-w-3xl mx-auto py-8 animate-face-in-up">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                    <Shield className="w-8 h-8 text-blue-500" />
                    Security Center
                </h1>
                <p className="text-muted-foreground mt-2">Manage your account security and authentication methods.</p>
            </div>

            <div className="space-y-6">
                {/* 2FA Section */}
                <div className="bg-card border border-border rounded-2xl p-6 hover:border-blue-500/30 transition-all">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full h-fit">
                                <Smartphone className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Two-Factor Authentication</h3>
                                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                                    Add an extra layer of security to your account by requiring a code from your phone.
                                </p>
                            </div>
                        </div>
                        <button className="px-5 py-2 border border-border rounded-full text-sm font-bold hover:bg-muted transition-colors">
                            Enable
                        </button>
                    </div>
                </div>

                {/* Password Section */}
                <div className="bg-card border border-border rounded-2xl p-6 hover:border-blue-500/30 transition-all">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full h-fit">
                                <Key className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Password</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Last changed: Never (Social Login Active)
                                </p>
                            </div>
                        </div>
                        <button className="px-5 py-2 border border-border rounded-full text-sm font-bold hover:bg-muted transition-colors">
                            Change
                        </button>
                    </div>
                </div>

                {/* Activity Log */}
                <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        Recent Login Activity
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl text-sm">
                            <div>
                                <p className="font-bold">New Login</p>
                                <p className="text-xs text-muted-foreground">Chrome on Linux • Frankfurt, DE</p>
                            </div>
                            <span className="text-green-600 font-bold text-xs bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">Current Session</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-2xl flex items-center gap-3">
                    <Lock className="w-5 h-5 text-blue-600" />
                    <p className="text-xs text-blue-800 dark:text-blue-300">
                        Your account is secured with standard encryption. We recommend enabling 2FA for maximum protection.
                    </p>
                </div>

            </div>
        </div>
    )
}
