export default {
  name: 'projectItem',
  title: 'Recent Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project/Client Name',
      type: 'string',
      description: 'e.g., Personal Website - Brian WILLIE, Porea Potato Farmers Cooperative System',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Project Category',
      type: 'string',
      description: 'e.g., Personal Website, Agricultural Ecosystem Platform',
      validation: Rule => Rule.required()
    },
    {
      name: 'imageUrl',
      title: 'Project Snapshot Image',
      type: 'image',
      description: 'Upload a clear desktop or mobile screenshot snapshot mockup of the built website platform.',
      options: {
        hotspot: true // Allows you to crop and center faces perfectly inside your studio layout dashboard
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'tags',
      title: 'Technologies Used (Tags)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add tech descriptors like React, Next.js, Sanity CMS, Vercel Deploy, etc.',
      validation: Rule => Rule.required()
    },
    {
      name: 'liveUrl',
      title: 'Live Production URL',
      type: 'url',
      description: 'Paste the exact Vercel deployment redirect link address (e.g., https://vercel.app)',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    },
    {
      name: 'hasLiveSite',
      title: 'Activate Live Redirect Button?',
      type: 'boolean',
      description: 'Toggle this ON to display the clickable "Launch Live Site" action button link on the project card canvas container.',
      initialValue: true
    }
  ]
}
