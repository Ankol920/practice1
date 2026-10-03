// Education, newest first, so the qualification still in progress leads and the
// page reads as a reverse-chronological timeline. Same plain-data convention as
// projects.js and skills.js: no React, no JSX, an array this component maps over.
//
// `strand` and `ongoing` are optional and simply absent on the entries they do
// not apply to. There is no program on record for three of these four schools,
// and inventing one would be worse than omitting it.
//
// There is no `achievements` or `certifications` field. Those were considered
// and deliberately left out rather than filled with invented honours: a
// fabricated award on a graded portfolio is worse than an empty one.
//
// Grade ranges use an en dash, the correct character for a span.

export const education = [
  {
    id: 'bulacan-state-university',
    stage: 'College',
    school: 'Bulacan State University',
    gradeSpan: '1st – 3rd year',
    ongoing: true,
  },
  {
    id: 'la-consolacion-university-philippines',
    stage: 'Senior High School',
    school: 'La Consolacion University Philippines',
    strand: 'STEM strand',
    gradeSpan: 'Grade 11 – 12',
  },
  {
    id: 'paombing-high-school',
    stage: 'Junior High School',
    school: 'Paombing High School Inc.',
    gradeSpan: 'Grade 7 – 10',
  },
  {
    id: 'malolos-adventist-elementary',
    stage: 'Elementary School',
    school: 'Malolos Adventist Elementary School',
    gradeSpan: 'Kinder – Grade 6',
  },
]
