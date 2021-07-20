module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx', './storyblok/**/*.tsx'],
  darkMode: 'class', // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        bg2: 'var(--color-bg2)',
        fg: 'var(--color-fg)',
        accent: 'var(--color-accent)',
        accent2: 'var(--color-accent2)',
        accent3: 'var(--color-accent3)',
        'accent-alt': 'var(--color-accent-alt)',
        border: 'var(--color-border)',
      },
    },
    borderColor: (theme) => ({
      ...theme('colors'),
      DEFAULT: 'var(--color-border)',
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
