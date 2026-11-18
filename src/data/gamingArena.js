/**
 * gamingArena.js
 * Playable browser games showcased inside The Gaming Arena.
 * Extensible cartridge array — add new games here to automatically appear in the Arena dock.
 */

export const gamingArenaData = {
  featuredGames: [
    {
      id: 'ferro-runner',
      slot: '01',
      title: 'Ferro Runner',
      subtitle: 'Magnetic Polarity Endless Runner',
      genre: 'Arcade Physics',
      status: 'Playable Live',
      badgeColor: '#EF4444',
      secondaryColor: '#2563EB',
      liveUrl: 'https://vanshuj.github.io/Ferro_Runner/',
      repoUrl: 'https://github.com/Vanshuj/Ferro_Runner',
      videoUrl: './videos/ferro-runner-demo.mp4',
      description:
        'An endless side-scrolling browser game built with pure HTML5, CSS3, and vanilla JavaScript. Flip the polarity of a magnetic ball between North (N) and South (S) to snap between charged rails, weave past hazards, and collect gems.',
      controls: [
        { keys: ['SPACE', '↑', 'CLICK'], action: 'Flip Polarity (N ↔ S)' },
        { keys: ['P'], action: 'Pause / Resume Run' },
        { keys: ['ASSIST'], action: 'Gentler Speed & Force Mode' },
      ],
      techStack: ['HTML5 Canvas', 'Vanilla JS', 'CSS3', 'Dipole Physics', '60 FPS Loop'],
      highlights: [
        'Real-time North/South magnetic attraction & repulsion rail mechanics',
        'Zero external game engines — custom 60 FPS canvas physics loop',
        'Accessible Assist Mode toggle for smoother speed & gentler magnetic pull',
      ],
    },
  ],

  quickLaunchExtras: [
    {
      id: 'shola-parchi',
      slot: '02',
      title: 'Shola Parchi Thapa',
      genre: '4-Player Realtime Card',
      liveUrl: 'https://shola-parchi-thapa.vercel.app/',
      accent: '#38BDF8',
    },
    {
      id: 'snake-arcade',
      slot: '03',
      title: 'Snake Canvas Arcade',
      genre: 'Classic Grid Runner',
      liveUrl: 'https://vanshuj.github.io/SnakeGame-js-/',
      accent: '#10B981',
    },
  ],
};
