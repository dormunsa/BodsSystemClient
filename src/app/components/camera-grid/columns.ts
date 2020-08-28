// define camera columns setting in camera grid
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
      field: 'locationName',
      filter: 'text',
      filterable: true,
      hidden: false,
      title: 'Location Name',
      width: 80
  },
  {
      field: 'longitude',
      filter: 'numeric',
      filterable: true,
      hidden: false,
      title: 'Longitude',
      width: 80
  },
  {
      field: 'latitude',
      filter: 'numeric',
      filterable: true,
      hidden: false,
      title: 'Latitude',
      width: 80
  },

  {
    field: 'isWorking',
    filter: 'numeric',
    filterable: true,
    hidden: false,
    title: 'Is Working',
    needTemplate: true,
    width: 80
},
{
  field: 'dateAdded',
  filter: 'text',
  filterable: true,
  hidden: true,
  title: 'Date',
  width: 80
},
  {
      title: 'Action',
      filterable: false,
      hidden: false,
      needTemplate: true,
      width: 120
  }
];
