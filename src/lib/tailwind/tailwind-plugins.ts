import plugin from 'tailwindcss/plugin';

export const TailwindChildren = plugin(({ addVariant }) => {
  addVariant('child', '& > *');
  addVariant('child-hover', '& > *:hover');
  addVariant('child-group-hover', '& > *:group-hover');
  addVariant('not-last', '&:not(:last-child)');
});

export const TailwindFlexible = plugin(({ addUtilities }) => {
  addUtilities({
    '.horizontal': {
      display: 'flex',
      flexDirection: 'row'
    },

    '.horizontal.center-v, .flex-row.center-v': {
      alignItems: 'center'
    },

    '.horizontal.center-h, .flex-row.center-h': {
      justifyContent: 'center'
    },

    '.horizontal.center, .flex.center': {
      justifyContent: 'center',
      alignItems: 'center'
    },

    '.vertical': {
      display: 'flex',
      flexDirection: 'column'
    },

    '.vertical.center-v, .flex-col.center-v': {
      justifyContent: 'center'
    },

    '.vertical.center-h, .flex-col.center-h': {
      alignItems: 'center'
    },

    '.vertical.center, .flex-col.center': {
      justifyContent: 'center',
      alignItems: 'center'
    },

    '.space-between': {
      justifyContent: 'space-between'
    }
  });
});
