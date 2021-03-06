var TESTDATA = [ {
    title: 'Attended The University of Nottingham',
    types: [ 'work and education' ],
    dates: [ // event with start and end
      { start: new Date('September 2011'), end: new Date('July 2015') },
    ],
  }, {
    title: 'Graduated',
    types: [ 'work and education' ],
    dates: [ // event with one date
      { start: new Date('8 July 2015') },
    ],
  }, {
    title: 'in a ship',
    types: [ 'relationships' ],
    dates: [
      { start: new Date('14 December 2015'), end: new Date() },
    ],
  }, {
    title: 'had a takeaway :)',
    types: [ 'other' ],
    dates: [ // event many one dates
      { start: new Date('8 February 2016') },
      { start: new Date('25 February 2016') },
      { start: new Date('28 February 2016') },
      { start: new Date('20 December 2015') },
      { start: new Date('5 November 2015') },
    ],
  }, {
    title: 'moved back to London',
    types: [ 'travel and location' ],
    dates: [ // event many one dates
      { start: new Date('16 March 2016') },
    ],
  } ]
