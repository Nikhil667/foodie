import { defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title: "Restaurant name",
      validation: (Rule)=> Rule.required(),
    },
    {
      name: "short_description",
      type: "string",
      title: "Short description",
      validation: (Rule)=> Rule.max(200),
    },
    {
      name: "image",
      type: "image",
      title: "Image Of Restaurant"
    },
    {
      name: "lat",
      type: "number",
      title: "Latitude Of Restaurant"
    },
    {
      name: "long",
      type: "number",
      title: "Longitude Of Restaurant"
    },
    {
      name: "address",
      type: "string",
      title: "Restaurant address",
      validation: (Rule)=> Rule.required(),
    },
    {
      name: "rating",
      type: "number",
      title: "Enter rating from 1 -5 star",
      validation: (Rule)=> Rule.required().min(1).max(5).error("Enter between 1 and 5"),
    },
    {
      name: "type",
      title: "Category",
      validation: (Rule)=> Rule.required(),
      type: "reference",
      to: [{ type: "category" }]
    },
    {
      name: "dishes",
      title: "Dishes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "dish" }] }]
    }
  ],
})
