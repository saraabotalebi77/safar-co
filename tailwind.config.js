/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	screens: {
  		xs: '512px',
  		sm: '640px',
  		md: '768px',
  		lg: '896px',
  		xl: '1024px',
  		'2xl': '1280px',
  		'3xl': '1536px'
  	},
  	colors: {
  		primary: {
  			'200': '#8FFFF',
  			'300': '#4FF9F2',
  			'400': '#1BE6E3',
  			'500': '#03C9C9',
  			'600': '#00A0A3',
  			'700': '#047C81'
  		},
  		secondary: {
  			'200': '#FFC478',
  			'300': '#FFC152',
  			'400': '#FFAB16',
  			'500': '#FF8F00',
  			'600': '#CC6902',
  			'700': '#A1510B'
  		},
  		accent: {
  			'200': '#9DDAF9',
  			'300': '#1EB5FF',
  			'400': '#0698FF',
  			'500': '#007DF0',
  			'600': '#0865c5',
  			'700': '#0D579B'
  		},
  		black: '#000',
  		white: '#fff',
  		green: '#0E453A',
  		error: '#d00',
  		gray: {
  			'100': '#3D3D3D',
  			'200': '#797979',
  			'300': '#B7B7B7',
  			'400': '#E6E6E6'
  		},
  		transparent: 'transparent'
  	},
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			vazir: 'vazir',
  			nastaliq: 'iran-nastaliq'
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
