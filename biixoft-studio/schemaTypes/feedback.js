// biixoft-studio/schemaTypes/feedback.js
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'feedback',
  title: 'Customer Feedback',
  type: 'document',
  fields: [
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'role',
      title: 'Role / Company',
      type: 'string',
    }),
    defineField({
      name: 'comment',
      title: 'Customer Review Comment',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1-5)',
      type: 'number',
      validation: Rule => Rule.min(1).max(5)
    }),
    defineField({
      name: 'approved',
      title: 'Approved for Live Website',
      type: 'boolean',
      initialValue: false, // Moderation gate flag
    }),
    // See if this works for the future, but we can also add a "date" field to track when the feedback was submitted.
    defineField({
      name: 'dateSubmitted',
      title: 'Date Submitted',
      type: 'datetime',
    }),
  ],
})
