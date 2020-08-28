// define user columns setting in user grid
export const columnsOrder = [

  {
      field: 'userId',
      filter: 'numeric',
      filterable: true,
      hidden: true,
      title: 'User Id',
      width: 80
  },
  {
      field: 'userName',
      filter: 'text',
      filterable: true,
      hidden: false,
      title: 'User Name',
      width: 80
  },
  {
      field: 'isAdmin',
      filter: 'numeric',
      filterable: true,
      hidden: true,
      title: 'Is Admin',
      width: 80
  },
  {
      field: 'firstName',
      filter: 'text',
      filterable: true,
      hidden: false,
      title: 'First Name',
      width: 80
  },

  {
    field: 'lastName',
    filter: 'text',
    filterable: true,
    hidden: false,
    title: 'Last Name',
    width: 80
},
{
  field: 'phone',
  filter: 'text',
  filterable: true,
  hidden: false,
  title: 'Phone',
  width: 80
},
{
  field: 'slackWebHook',
  filter: 'text',
  filterable: true,
  hidden: true,
  title: 'Slack Web Hook',
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
