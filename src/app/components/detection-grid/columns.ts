// define detection columns setting in detection grid
export const columnsOrder = [
  {
      field: 'detectionId',
      filter: 'numeric',
      filterable: true,
      hidden: true,
      title: 'Detection Id',
      width: 80
  },
  {
      field: 'cameraId',
      filter: 'numeric',
      filterable: true,
      hidden: false,
      title: 'Camera Id',
      width: 80
  },
  {
    field: 'date',
    filter: 'text',
    filterable: true,
    hidden: false,
    title: 'Date',
    width: 80,
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
      field: 'weatherId',
      filter: 'numeric',
      filterable: true,
      hidden: true,
      title: 'Weather Id',
      width: 80
  },

];
