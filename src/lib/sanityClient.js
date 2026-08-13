import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  // Go to your biixoft-studio/sanity.config.js file to copy your exact 8-character projectId string
  projectId: 'p7hok33v', 
  dataset: 'production',
  useCdn: false, // Set to false to ensure immediate real-time data updates on publish!
  apiVersion: '2026-08-13', // Uses the current calendar operational date
})
