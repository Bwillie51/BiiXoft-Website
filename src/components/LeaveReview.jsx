// src/components/LeaveReview.jsx
import React, { useState } from 'react'

export default function LeaveReview({ onSuccessClose }) {
  const [formData, setFormData] = useState({ client: '', role: '', comment: '', rating: 5 })
  const [status, setStatus] = useState({ loading: false, success: false, error: null })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: null })

    // ⚠️ TODO: Replace 'your_project_id' with your actual Project ID from sanity.config.js
    const projectId = 'p7hok33v' 
    const dataset = 'production'
    
    // ⚠️ IMPORTANT: Generate a token with "Editor" permission from https://sanity.io
    // and place it here or map it cleanly inside an environmental file (.env)
    const writeToken = 'skSLNMQiVLQVEghbOZ4mKe7A5kMGrCoLl9YY9Jypwe9XTO6kQRjeud5jrKitCJSH7DIdUFiJGUiFO87CBfjUAK3Ciis06lRhDroP5c97aH9RYpkFuiQDznXoekJVY6ck64gL4Fmf0O3iKtbxCsooT1hdUUwrkXZA44JCBA8KxITl09Or3gk6' 

    const mutations = [{
      create: {
        _type: 'feedback',
        client: formData.client,
        role: formData.role,
        comment: formData.comment,
        rating: Number(formData.rating),
        approved: false // Stays unapproved in content lake until you manually approve inside Studio
      }
    }]

    try {
      const response = await fetch(`https://${projectId}.api.sanity.io/v2026-11-05/data/mutate/${dataset}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${writeToken}`
        },
        body: JSON.stringify({ mutations })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Failed to submit your review.')
      }

      setStatus({ loading: false, success: true, error: null })
      setFormData({ client: '', role: '', comment: '', rating: 5 })
      
      // Fires the automatic closure window timeout routine inside App.jsx
      if (onSuccessClose) {
        onSuccessClose()
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message })
    }
  }

  return (
    <div className="w-full bg-card p-6 sm:p-8 rounded-3xl">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-1">Share Your Experience</h2>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Your feedback will help us build better services. All fields except your position are required.
        </p>
      </div>

      {status.success && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm font-semibold">
          🎉 Thank you! Your review has been submitted and is currently pending moderation.
        </div>
      )}

      {status.error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm font-semibold">
          ❌ {status.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">Full Name</label>
          <input 
            type="text" 
            required
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-foreground"
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            placeholder="e.g., John Doe"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">Company / Position (Optional)</label>
          <input 
            type="text" 
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-foreground"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="e.g., CTO at Biixoft"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">Star Rating</label>
          <select 
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-foreground"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
          >
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">Your Review</label>
          <textarea 
            rows="4"
            required
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none text-foreground"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            placeholder="Write details about your experience working with us..."
          />
        </div>

        <button 
          type="submit" 
          disabled={status.loading || status.success}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-sm transition-colors text-sm disabled:opacity-50 cursor-pointer mt-2"
        >
          {status.loading ? 'Submitting Review...' : status.success ? 'Submitted' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  )
}
