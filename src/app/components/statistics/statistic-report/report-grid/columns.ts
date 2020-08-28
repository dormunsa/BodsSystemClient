// define report columns setting in report grid
export const columnsOrder = [
  {
      field: 'cameraId',
      filter: 'numeric',
      filterable: true,
      hidden: true,
      title: 'Camera Id',
      width: 80
  },

  {
      field: 'weatherLocationName',
      filter: 'text',
      filterable: true,
      hidden: false,
      title: 'Weather Location Name',
      width: 80
  },
  {
      field: 'longitude',
      filter: 'numeric',
      filterable: true,
      hidden: true,
      title: 'Longitude',
      width: 80
  },
  {
      field: 'latitude',
      filter: 'numeric',
      filterable: true,
      hidden: true,
      title: 'Latitude',
      width: 80
  },
  {
      field: 'windSpeed',
      filter: 'numeric',
      filterable: true,
      hidden: false,
      title: 'Wind Speed KM/h',
      width: 80
  },

  {
      field: 'description',
      filter: 'text',
      filterable: true,
      hidden: false,
      title: 'Description',
      width: 80
  },
  {
      field: 'cameraLocationName',
      filter: 'text',
      filterable: true,
      hidden: false,
      title: 'Camera Location Name',
      width: 80
  },
  {
    field: 'imagePath',
    filter: 'text',
    filterable: true,
    hidden: false,
    title: 'Image',
    width: 80,
    needTemplate: true
},
{
  field: 'date',
  filter: 'text',
  filterable: true,
  hidden: false,
  title: 'Date',
  width: 80
}

];

