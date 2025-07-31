/** @type {import('tailwindcss').Config} */
export const inkTailwindConfig = {
  prefix: 'tw-',
  important: true,
  content: [],
  plugins: [
    function ({ addVariant }) {
      addVariant('readonly', '&[readonly]'); // Apply styles to read-only elements
    },
  ],
  theme: {
    extend: {
      screens: {
        md: { max: '576px' },
        tl: { max: '992px' },
        lg: { max: '1024px' },
        xl: { max: '1200px' },
        betterhover: { raw: '(hover: hover)' },
      },
      colors: {
        gray: {
          50: '#FAFAFC',
          100: '#F3F3F6',
          200: '#EBEBF0',
          300: '#DDDFE8',
          400: '#8F90A6',
          500: '#7C7D97',
          600: '#676A88',
          700: '#555770',
          800: '#353650',
          900: '#28293D',
        },
        primary: {
          50: '#E6ECFE',
          100: '#D5DFFE',
          200: '#B9CCFE',
          300: '#8FAFFF',
          400: '#527DFF',
          500: '#4C3FFF',
          600: '#3A3AF8',
          700: '#0E33EF',
          800: '#0F00E2',
          900: '#001ECC',
        },
        secondary: {
          50: '#FFFDE5',
          100: '#FFF8BF',
          200: '#FFF394',
          300: '#FFEF67',
          400: '#FEEA3F',
          500: '#FCE400',
          600: '#FFD600',
          700: '#FEBC00',
          800: '#FEA200',
          900: '#FC7600',
        },
        danger: {
          50: '#FFECF1',
          400: '#F7193E',
          500: '#D8002F',
        },
        success: {
          50: '#E7F7EE',
          400: '#54E4B7',
          500: '#00A65E',
        },
        warning: {
          50: '#FFFDE5',
          400: '#FFD600',
          500: '#E7B800',
        },
        info: {
          50: '#E6ECFE',
          400: '#527DFF',
          500: '#4C3FFF',
        },
        paper: {
          500: '#F9F4ED',
        },
      },
      minWidth: {
        auto: 'auto',
      },
      borderRadius: {
        none: '0px',
        sm: '0.375rem', // 6px
        md: '.25rem', // 4px
        DEFAULT: '0.5rem', // 8px
        full: '9999px',
      },
      boxShadow: {
        DEFAULT: '0 2px 6px rgba(199, 201, 217, 0.5)',
        md: '0 4px 20px rgba(199, 201, 217, 0.5)',
        l:'0px 4px 4px rgb(199 201 217 / 50%)',
        lg: '0 12px 36px rgba(199, 201, 217, 0.5)',
        none: 'none',
      },
      fontFamily: {
        awesome: ['"Font Awesome 6 Pro"'],
      },
      fontSize: {
        xxs: ['0.625rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '400' }], // 10px
        'size-xxs': '0.625rem', // 10px
        xs: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '400' }], // 12px
        'size-xs': '0.75rem', // 12px
        sm: ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '400' }], // 14px
        'size-sm': '0.875rem', // 14px
        base: ['1rem', { lineHeight: '1.375', letterSpacing: '0.02em', fontWeight: '400' }], // 16px
        'size-base': '1rem', // 16px
        // below used for xxmix(xlmix, 2xlmix, 3xlmix)
        lg: ['1.125rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '600' }], // 18px
        'size-lg': '1.125rem', // 18px
        xl: ['1.25rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '600' }], // 20px
        'size-xl': '1.25rem', // 20px
        '2xl': ['1.5rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '600' }], // 24px
        'size-2xl': '1.5rem', // 24px
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0.02em', fontWeight: '600' }], // 30px
        'size-3xl': '1.875rem', // 30px
        // below unused 
        '4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '600' }], // 36px
        'size-4xl': '2.25rem', // 36px
        '5xl': ['3rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '600' }], // 48px
        'size-5xl': '3rem', // 48px
        '6xl': ['4rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '600' }], // 64px
        'size-6xl': '4rem', // 64px
      },
      lineHeight: {
        7.5: '1.875rem',
      },
      opacity: {
        45: '0.45',
        65: '0.65',
      },
      spacing: {
        4.5: '1.125rem',
        '7px': '0.4375rem',
      },
      btnSize:({theme})=> ({
        sm:{
          padding: theme('spacing[2]'),
          fontSize: theme('fontSize.sm[0]'),
          lineHeight: theme('lineHeight.normal'),
          py: theme('spacing[2]'),
          px: theme('spacing[2]'),
        },
      }),
      btnColor:({theme})=> ({
        quaternary: {
          borderColor: theme('colors.gray.400'),
          fontColor: theme('colors.gray.900'),
          hoverBgColor: theme('colors.gray.200'),
        }
      }),
      inputSize:({theme})=> ({
        md:{
          fontSize: theme('fontSize.sm[0]'),
        },
      })
    },
  },
  safelist: ['v-popper__popper', 'v-popper__inner', 'v-popper__arrow-outer'],
}

export default {
  ...inkTailwindConfig,
  content: [
  "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
}
