export default {
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      description: 'e.g., Dynamic Agency Platform, Domain Registration'
    },
    {
      name: 'category',
      title: 'Category Slot',
      type: 'string',
      options: {
        list: [
          { title: '🖥️ Design & Development', value: 'development' },
          { title: '🌐 Domains & Hosting Resale', value: 'hosting' }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'A brief summary of who this plan is tailored for.'
    },
    {
      name: 'priceText',
      title: 'Price Display',
      type: 'string',
      description: 'e.g., K2,140 or K47'
    },
    {
      name: 'priceLabel',
      title: 'Price Label Unit',
      type: 'string',
      description: 'e.g., One-Time Development Fee, billed annually, per month'
    },
    {
      name: 'features',
      title: 'Plan Features checklist',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add individual checkmark lines for services included in this package.'
    },
    {
      name: 'cta',
      title: 'Call To Action Text',
      type: 'string',
      description: 'e.g., Build My Agency Platform, Secure My Domain'
    },
    {
      name: 'popular',
      title: 'Mark as Highly Recommended?',
      type: 'boolean',
      description: 'If turned on, this card will highlight in your vibrant Electric Blue accent frame.'
    }
  ]
}
