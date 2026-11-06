export default {
  name: 'customer',
  title: 'Customer',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      description: 'The name of the customer or company.'
    },
    {
      name: 'logo',
      title: 'Customer Logo',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Upload the logo of the customer. Recommended dimensions are 200x200 pixels.'
    }
  ]
}