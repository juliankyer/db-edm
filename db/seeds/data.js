exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('songs').del()
    .then(() => knex('genres').del())
    .then(() => {
      
      return Promise.all([
        
        knex('genres').insert({
          genre: 'Trance', link: 'trance', description: 'Are you saying "trance, trance, trance, trance"?'
        }, 'id')
        .then((genre) => {
          return knex('songs').insert([
            {
              artist: 'Dash Berlin feat. Emma Hewitt',
              title: 'Waiting',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=MSgnf-tBN9s',
              genre_id: genre[0],
            },
            {
              artist: 'Gareth Emery feat. Christina Novelli',
              title: 'Dynamite',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=gPGTSanBq14',
              genre_id: genre[0],
            },
            {
              artist: 'Armin van Buuren feat. Trevor Guthrie',
              title: 'This Is What It Feels Like',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=BR_DFMUzX4E',
              genre_id: genre[0],
            },
            {
              artist: 'Above & Beyond',
              title: 'Sun and Moon',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=ll5ykbAumD4',
              genre_id: genre[0],
            },
            {
              artist: 'Chicane',
              title: 'Saltwater',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=ET1-6Bef9xU&index=2&list=RDQMXBzN8VmAKsQ',
              genre_id: genre[0],
            },
            {
              artist: 'Ferry Corsten presents Gouryella',
              title: 'Venera (Vee\'s Theme)',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=3wqPQrDda18',
              genre_id: genre[0],
            },
            {
              artist: 'Ferry Corsten feat. JES',
              title: 'In Your Eyes',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=MPS_gZ4HsHo',
              genre_id: genre[0],
            },
            {
              artist: 'Paul van Dyk',
              title: 'Touched By Heaven',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=K2pF4R6xzLM',
              genre_id: genre[0],
            }
          ])
        }),
        knex('genres').insert({
          genre: 'House', link: 'house', description: 'Are you saying boots and cats? Probably house'
        }, 'id')
        .then((genre) => {
          return knex('songs').insert([
            {
              artist: 'Galantis',
              title: 'Runaway (U & I)',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=szj59j0hz_4&index=10&list=RDQM5ky4ylTWJhQ',
              genre_id: genre[0],
            },
            {
              artist: 'Disclosure',
              title: 'You and Me, Flume Remix',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=_zPlr-o-YEQ',
              genre_id: genre[0],

            },
            {
              artist: 'Zedd',
              title: 'Stay',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=h--P8HzYZ74',
              genre_id: genre[0],
            },
            {
              artist: 'The Chainsmokers and Tritonal',
              title: 'Until You Were Gone',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=iPAac-0IUKQ',
              genre_id: genre[0],
            },
            {
              artist: 'Avicii',
              title: 'Broken Arrows',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=V6iKSUoUN48',
              genre_id: genre[0],
            },
            {
              artist: 'Deadmau5 feat. Rob Swire',
              title: 'Ghosts N Stuff',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=h7ArUgxtlJs&list=PLj5YGBYOnfpV0VC3xyVz3k9CzZiQvZHkV',
              genre_id: genre[0],
            },
            {
              artist: 'Seeb',
              title: 'I Took a Pill in Ibiza - Mike Posner',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=foE1mO2yM04&index=4&list=RDQM5ky4ylTWJhQ',
              genre_id: genre[0],
            },
          ]);
        }),
        knex('genres').insert({
          genre: 'Big Room House', link: 'bigroomhouse', description: 'Harder and Louder than house, slower and deeper than hardstyle.'
        }, 'id')
        .then((genre) => {
          return knex('songs').insert([
            {
              artist: 'Tiesto & The Chainsmokers',
              title: 'Split',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=klIF0nhsxxM',
              genre_id: genre[0],
            },
            {
              artist: 'Tujamo',
              title: 'Drop That Low (When I Dip)',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=souJM4aCk6w',
              genre_id: genre[0],
            },
            {
              artist: 'Borgeous',
              title: 'They Don\'t Know Us',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=JKwr064-PBY',
              genre_id: genre[0],
            },
            {
              artist: 'BVBBS & Borgeous',
              title: 'TSUNAMI',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=0EWbonj7f18',
              genre_id: genre[0],
            },
            {
              artist: 'W&W',
              title: 'Bigfoot',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=9ytt1ELA82U',
              genre_id: genre[0],
            },
            {
              artist: 'Dimitri Vegas, Martin Garrix, Like Mike',
              title: 'Tremor',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=9vMh9f41pqE',
              genre_id: genre[0],
            },
            {
              artist: 'Dimitri Vegas & Like Mike vs Ummet Ozcan',
              title: 'The Hum',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=exJlapzPnlc',
              genre_id: genre[0],
            },
            {
              artist: 'Showtek feat. Vassy',
              title: 'Bad',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=oC-GflRB0y4',
              genre_id: genre[0],
            },
            {
              artist: 'Tommy Trash',
              title: 'Reload',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=GuAtcpFQpMw&list=PL5-mr_apq-DqgIi1VNrKLk2B6qqVTBQiR',
              genre_id: genre[0],
            },
          ]);
        }),
        knex('genres').insert({
          genre: 'Drum and Bass', link: 'drumandbass', description: 'Fast, deep, bass? You know this one.',
        }, 'id')
        .then((genre) => {
          return knex('songs').insert([
            {
              artist: 'Sub Focus',
              title: 'Tidal Wave',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=B8vlk1UR99k&list=PLr9smI_szfwmoB6HvBF6uC-ax1XQsm9SV',
              genre_id: genre[0],
            },
            {
              artist: 'Chase & Status',
              title: 'When It All Goes Wrong',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=hkDGGsuVKVo&list=PLouYY4V1TOzO_oMidi07IYXmfRHqF4Lgu',
              genre_id: genre[0],
            },
            {
              artist: 'Rusko',
              title: 'Hold On',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=8RVKLcaIAE8',
              genre_id: genre[0],
            },
            {
              artist: 'Netsky',
              title: 'Come Alive',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=0z7omu2UNVA',
              genre_id: genre[0],
            },
            {
              artist: 'Rudimental',
              title: 'Feel the Love',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=oABEGc8Dus0&list=PL0P09vVCAJ0ruBhRBZnV14XHmZ1M-Ayhh',
              genre_id: genre[0],
            },
            {
              artist: 'Sigma',
              title: 'Nobody to Love',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=KD5fLb-WgBU&list=PL0P09vVCAJ0ruBhRBZnV14XHmZ1M-Ayhh&index=3',
              genre_id: genre[0],
            },
            {
              artist: 'High Maintenance',
              title: 'Keep You Down',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=e3O4hSC-LPU',
              genre_id: genre[0],
            },
          ]);
        }),
        knex('genres').insert({
          genre: 'Dubstep', link: 'dubstep', description: 'Wobbles and drops? Does it sound like robots fighting?',
        }, 'id')
        .then((genre) => {
          return knex('songs').insert([
            {
              artist: 'Skrillex',
              title: 'First Of The Year(Equinox)',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=2cXDgFwE13g&list=PL6NdnG7BqDd8fPjp3PyRAlYObAPGonwVd',
              genre_id: genre[0],
            },
            {
              artist: 'Borgore feat. Miley Cyrus',
              title: 'Decisions',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=jQd5OEl1W-Q&list=PLzbzxAt5HvQpYrBUDD_NUzeuStPQI33MG',
              genre_id: genre[0],
            },
            {
              artist: 'Knife Party',
              title: 'Bonfire',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=e-IWRmpefzE&list=RDQMalFwGqv6X5I&index=6',
              genre_id: genre[0],
            },
            {
              artist: 'Kill the Noise',
              title: 'Kill It 4 The Kids',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=imrDkegrY1o',
              genre_id: genre[0],
            },
            {
              artist: 'Flux Pavilion',
              title: 'I Can\'t Stop',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=3Q9rewnLFYw',
              genre_id: genre[0],
            },
            {
              artist: 'Adventure Club',
              title: 'Gold',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=09wdQP1FFR0&index=22&list=RDQMalFwGqv6X5I',
              genre_id: genre[0],
            },
            {
              artist: 'Pegboard Nerds',
              title: 'Self Destruct',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=lWDnwTsdtaw&index=37&list=RDQMalFwGqv6X5I',
              genre_id: genre[0],
            },
            {
              artist: 'Flux Pavillion',
              title: 'Bass Cannon',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=gYGioWinQQE',
              genre_id: genre[0],
            },
            {
              artist: 'Excision',
              title: 'X-Rated feat. Messinian',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=wxNT8ONn-To',
              genre_id: genre[0],
            },
            {
              artist: 'Nero',
              title: 'Promises',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=llDikI2hTtk',
              genre_id: genre[0],
            },
          ]);
        }),
        knex('genres').insert({
          genre: 'Hardstyle', link: 'hardstyle', description: 'Are you imagining a Dutch person on a pogo-stick playing Mario Kart?',
        }, 'id')
        .then((genre) => {
          return knex('songs').insert([
            {
              artist: 'Headhunterz',
              title: 'Colors',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=hfAD6fwKUFo',
              genre_id: genre[0],
            },
            {
              artist: 'Noisecontrollers',
              title: 'Rocked',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=ZiY1kkYPODM&index=3&list=PLI6i2zzCGjttRefOqrGaHSW6j74x_46oz',
              genre_id: genre[0],
            },
            {
              artist: 'Blasterjaxx & DBSTF',
              title: 'Beautiful World',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=ka6HFK7dYtA&list=PLmdmPCCyvrhm6nTt3GBAFef-PrJgVcMzj',
              genre_id: genre[0],
            },
            {
              artist: 'W&W and Headhunterz',
              title: 'We Control the Sound',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=MTwGvNGZPKA',
              genre_id: genre[0],
            },
            {
              artist: 'The Prophet',
              title: 'One Moment',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=a7tNRq8ac3c',
              genre_id: genre[0],
            },
            {
              artist: 'Technoboy',
              title: 'Mellow',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=hyCK8QBOh_I&list=PLixTphmBM7hlyTI2I8OLSNmZNZN78F7c4',
              genre_id: genre[0],
            },
            {
              artist: 'Brennan Heart',
              title: 'We Come and Go',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=k8qgeGON_zM&list=PLptachkly-u0b9tF8Bf4wwsE_8zY7d3oH&index=2',
              genre_id: genre[0],
            },
          ]);
        }),
        knex('genres').insert({
          genre: 'Trap', link: 'trap', description: 'Southern hip-hop meets EDM. Are you twerking?',
        }, 'id')
        .then((genre) => {
          return knex('songs').insert([
            {
              artist: 'Major Lazer',
              title: 'Original Don - Flosstradamus remix',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=lgrDPqzlHtY',
              genre_id: genre[0],
            },
            {
              artist: 'Eiffel 65 - KNY Factory remix',
              title: 'Blue',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=pVLmZMjxfjw',
              genre_id: genre[0],
            },
            {
              artist: 'RL Grime',
              title: 'Core',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=04ufimjXEbA',
              genre_id: genre[0],
            },
            {
              artist: 'San Holo',
              title: 'The Next Episode Remix',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=vZv9-TWdBJM&list=RDQM6C4rXjH6Dl8',
              genre_id: genre[0],
            },
            {
              artist: 'Flosstradamus',
              title: 'Soundclash',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=SIhotgx5E_Q',
              genre_id: genre[0],
            },
            {
              artist: 'GTA',
              title: 'Help Me!',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=TKd4GKi2olk',
              genre_id: genre[0],
            },
            {
              artist: 'Yellow Claw',
              title: 'Shotgun',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=oIwFJNguQgY&index=3&list=PLvNolaUTgoKMNUUFWfLTY3mqjsx7HGx7H',
              genre_id: genre[0],
            },
            {
              artist: 'Flosstradamus',
              title: 'Rollup - Baauer remix',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=M5USD-Smthk',
              genre_id: genre[0],
            },
          ]);
        }),
        knex('genres').insert({
          genre: 'Electro', link: 'electro', description: 'Synth-heavy with funk roots.',
        }, 'id')
        .then((genre) => {
          return knex('songs').insert([
            {
              artist: 'ZHU',
              title: 'In The Morning',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=5_ARibfCMhw',
              genre_id: genre[0],
            },
            {
              artist: 'The Knife',
              title: 'Heartbeats',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=pPD8Ja64mRU',
              genre_id: genre[0],
            },
            {
              artist: 'Mat Zo',
              title: 'Soul Food',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=eubJfCm_8cE',
              genre_id: genre[0],
            },
            {
              artist: 'Daft Punk',
              title: 'Giorgio by Moroder',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=zhl-Cs1-sG4&list=PLcdN8reXV1kyF2mzYDoC5tDi0K2NpCU-G&index=3',
              genre_id: genre[0],
            },
            {
              artist: 'Justice',
              title: 'D.A.N.C.E.',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=sy1dYFGkPUE',
              genre_id: genre[0],
            },
            {
              artist: 'Dada Life',
              title: 'Happy Violence',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=e0AD3w67_-o',
              genre_id: genre[0],
            },
            {
              artist: 'The Bloody Beetroots',
              title: 'Rocksteady',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=KSqttO3NtCg&list=PLpDK3uy-TwXriLVM9jYg6AhKDY-dDEOgs',
              genre_id: genre[0],
            },
          ]);
        }),
        knex('genres').insert({
          genre: 'Moombahton', link: 'moombahton', description: 'House crashes into Reggaeton at the low, low speed of 110bpm.',
        }, 'id')
        .then((genre) => {
          return knex('songs').insert([
            {
              artist: 'Dillon Francis',
              title: 'Get Low',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=12CeaxLiMgE&list=PLNvEn3gnq8QTRH-mN8ZWb5E6ROZ-vdcBY',
              genre_id: genre[0],
            },
            {
              artist: 'Diplo',
              title: 'Express Yourself',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=BKaL7WL-onI',
              genre_id: genre[0],
            },
            {
              artist: 'Major Lazer',
              title: 'Come to Me',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=lWzdORxIbNk&list=RDQM3nFvvBaRPts&index=7',
              genre_id: genre[0],
            },
            {
              artist: 'Major Lazer & DJ Snake',
              title: 'Lean On',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=YqeW9_5kURI&index=30&list=RDQM3nFvvBaRPts',
              genre_id: genre[0],
            },
            {
              artist: 'JackÜ',
              title: 'Take Ü There',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=C9slkeFXogU',
              genre_id: genre[0],
            },
            {
              artist: 'Skrillex and Diplo',
              title: 'Mind',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=fDrTbLXHKu8',
              genre_id: genre[0],
            },
            {
              artist: 'Aluna George',
              title: 'I\'m in Control',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=NSdcG1e9APE&list=RDQM3nFvvBaRPts&index=38',
              genre_id: genre[0],
            },
            {
              artist: 'Afrojack',
              title: 'Replica',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=es-ryHvW52s&list=RDQM3nFvvBaRPts&index=2',
              genre_id: genre[0],
            },
            {
              artist: 'Eva Simons ft. Konshens',
              title: 'Policeman',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=h2mJDy8WMEU&index=6&list=RDQM3nFvvBaRPts',
              genre_id: genre[0],
            },
          ]);
        }),
        knex('genres').insert({
          genre: 'Wildcards', link: 'wildcards', description: 'Where do YOU think these fit in?',
        }, 'id')
        .then((genre) => {
          return knex('songs').insert([
            {
              artist: 'Alison Wonderland',
              title: 'I Want U',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=YLCm9lP-3Uk&list=PLuProZYVVUYkhrVZucfH-5gXOX2I0eNEY&index=2',
              genre_id: genre[0],
            },
            {
              artist: 'Justice - K?d remix',
              title: 'We Are Your Friends',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=XCma-5rJYHs',
              genre_id: genre[0],
            },
            {
              artist: 'Marshmello',
              title: 'Alone',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=ALZHF5UqnU4',
              genre_id: genre[0],
            },
            {
              artist: 'Slushii',
              title: 'Catch Me',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=LBNDzFEF-Xs',
              genre_id: genre[0],
            },
            {
              artist: 'Antics feat. Fabian James',
              title: 'Your Love',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=sWM1xOxStfk',
              genre_id: genre[0],
            },
            {
              artist: 'Adventure Club feat. SONDAR',
              title: 'Breathe',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=V3CXtwEohCw',
              genre_id: genre[0],

            },
            {
              artist: 'Marshmello feat. Wrabel',
              title: 'Ritual',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=VEou0QBeHlk',
              genre_id: genre[0],
            },
            {
              artist: 'Duke Dumont',
              title: 'I Got You',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=FHCYHldJi_g',
              genre_id: genre[0],
            },
            {
              artist: 'Bebe Rexha',
              title: 'I Got You',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=jwYBmtXMCyw',
              genre_id: genre[0],
            },
            {
              artist: 'Illenium',
              title: 'Afterlife',
              service: 'youtube',
              video: 'https://www.youtube.com/watch?v=f4kqIruQcvQ',
              genre_id: genre[0],
            },
          ]);
        }),
      ]);
    });
};