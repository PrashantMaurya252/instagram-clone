/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {},
		screens:{
			"screen-1350":{min:'0px',max:'1350px'},
			"screen-1100":{min:'0px',max:'1100px'},
			"screen-900":{min:'0px',max:'900px'},
			"screen-680":{min:'0px',max:'680px'},
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

