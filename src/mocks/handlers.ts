import { HttpResponse, http } from 'msw';

export const handlers = [
  http.post('https://stapi.co/api/v1/rest/animal/search', () => {
    const resp = {
      page: {
        pageNumber: 0,
        pageSize: 10,
        numberOfElements: 10,
        totalElements: 563,
        totalPages: 57,
        firstPage: true,
        lastPage: false,
      },
      sort: {
        clauses: [],
      },
      animals: [
        {
          uid: 'ANMA0000032315',
          name: "'Owon",
          earthAnimal: false,
          earthInsect: false,
          avian: false,
          canine: false,
          feline: false,
        },
        {
          uid: 'ANMA0000264633',
          name: 'Abalone',
          earthAnimal: true,
          earthInsect: false,
          avian: false,
          canine: false,
          feline: false,
        },
        {
          uid: 'ANMA0000262167',
          name: 'Albatross',
          earthAnimal: true,
          earthInsect: false,
          avian: false,
          canine: false,
          feline: false,
        },
        {
          uid: 'ANMA0000034899',
          name: 'Aldebaran mud leech',
          earthAnimal: false,
          earthInsect: false,
          avian: false,
          canine: false,
          feline: false,
        },
        {
          uid: 'ANMA0000008622',
          name: 'Aldebaran serpent',
          earthAnimal: false,
          earthInsect: false,
          avian: false,
          canine: false,
          feline: false,
        },
        {
          uid: 'ANMA0000010045',
          name: 'Aldebaran shellmouth',
          earthAnimal: false,
          earthInsect: false,
          avian: false,
          canine: false,
          feline: false,
        },
        {
          uid: 'ANMA0000028270',
          name: 'Algorian mammoth',
          earthAnimal: false,
          earthInsect: false,
          avian: false,
          canine: false,
          feline: false,
        },
        {
          uid: 'ANMA0000260398',
          name: 'Alien horse',
          earthAnimal: false,
          earthInsect: false,
          avian: false,
          canine: false,
          feline: false,
        },
        {
          uid: 'ANMA0000027729',
          name: 'Alligator',
          earthAnimal: true,
          earthInsect: false,
          avian: false,
          canine: false,
          feline: false,
        },
        {
          uid: 'ANMA0000207062',
          name: 'Alopex lagopus',
          earthAnimal: true,
          earthInsect: false,
          avian: false,
          canine: false,
          feline: false,
        },
      ],
    };

    return HttpResponse.json(resp);
  }),
];
