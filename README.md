# Bouncing Footballs Animation

A simple and interactive web animation featuring bouncing footballs with physics-based collisions using HTML5 Canvas, CSS, and JavaScript.

## Features

- Multiple footballs with different colors (yellow, blue, red, and white)
- Physics-based bouncing and collision detection
- Smooth animations using requestAnimationFrame
- Responsive design that adapts to window size
- Energy loss simulation for realistic bouncing effects

## Project Structure

```
bouncing-footballs/
│
├── index.html          # Main HTML file
├── styles.css         # CSS styles
├── script.js         # JavaScript animation logic
└── README.md        # Project documentation
```

## How to Run

1. Download or clone this repository
2. Simply open the `index.html` file in a modern web browser
3. The animation will start automatically

## Browser Compatibility

This project works in all modern browsers that support HTML5 Canvas:
- Chrome
- Firefox
- Safari
- Edge

## Customization

You can customize the animation by modifying the following parameters in `script.js`:

- Number of balls: Change the value in the for loop (currently 8)
- Ball colors: Modify the `colors` array
- Ball size: Adjust the `radius` value in the Football class
- Speed: Modify the velocity multiplier (currently 8) in the constructor
- Physics: Adjust the energy loss factor (currently 0.95) in the update method

## License

This project is open source and available under the MIT License. 