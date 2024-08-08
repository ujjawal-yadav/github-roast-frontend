# GitHub Roast

GitHub Roast is a playful and interactive web application designed to generate humorous and slightly mean-spirited roasts based on GitHub profiles. The application leverages a variety of modern web technologies to provide a dynamic and engaging user experience.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Components](#components)
- [Hooks](#hooks)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Description

GitHub Roast takes a GitHub username as input and generates a creative roast based on the user's GitHub statistics. The generated roast is displayed with a typing effect for added dramatic effect. The application supports theme switching between light and dark modes and uses real-time communication to fetch and display data dynamically.

## Features

- **Humorous Roasts**: Generates funny and playful roasts based on GitHub statistics.
- **Typing Effect**: Displays roasts with a typing animation for a dynamic feel.
- **Theme Switching**: Allows users to switch between light and dark themes.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Real-Time Communication**: Utilizes WebSockets to fetch and display data in real-time.

## Technologies Used

### React

- **Usage**: The core library for building the user interface.
- **Details**: React's component-based architecture is used to build the UI, manage state, and handle user interactions.

### Next.js

- **Usage**: A React framework for server-side rendering and static site generation.
- **Details**: Next.js is used to set up the project structure, manage routing, and optimize performance.

### Socket.IO

- **Usage**: For real-time, bidirectional communication between the client and server.
- **Details**: Socket.IO is utilized to establish a WebSocket connection, enabling real-time updates and data fetching for the roasts.

### Tailwind CSS

- **Usage**: A utility-first CSS framework for styling the application.
- **Details**: Tailwind CSS is used to create a responsive and modern design with minimal custom CSS.

### TypeScript

- **Usage**: For type safety and improved development experience.
- **Details**: TypeScript is used across the project to define component props, state, and other types, reducing bugs and enhancing code readability.

### react-hot-toast

- **Usage**: For displaying notifications.
- **Details**: This library is used to show toast notifications for various actions and events, providing feedback to the user.

## Components

### Heading

- **Description**: The `Heading` component is responsible for setting the document's head metadata. This includes setting the title, description, and keywords for the page. It ensures that the page is properly described and optimized for search engines.

### ThemeProvider

- **Description**: The `ThemeProvider` component wraps the `NextThemesProvider` to provide theme context to the application. It allows the application to switch between light and dark themes based on user preference or system settings.

### ThemeSwitcher

- **Description**: The `ThemeSwitcher` component allows users to toggle between light and dark themes. It uses icons to represent the current theme and switches the theme when the icon is clicked. The component ensures that the theme switch is smooth and provides visual feedback to the user.

### useTypingEffect

- **Description**: The `useTypingEffect` hook is used to simulate a typing effect for displaying text dynamically. It gradually reveals the text as if it were being typed, adding a dramatic effect to the roasts displayed on the screen. The hook takes the text and speed as parameters and manages the state to update the displayed text accordingly.

### `SocketContext`

- **Description**: The `SocketContext` is used to manage the WebSocket connection within the application. It provides the socket instance to all child components, enabling them to communicate with the server in real-time. The context ensures that the WebSocket connection is established when the application loads and cleaned up when it unmounts.

### `SocketProvider`

- **Description**: The `SocketProvider` is a higher-order component that wraps the application with the `SocketContext`. It initializes the Socket.IO connection and provides the socket instance to the context. This setup allows any component within the provider to access the socket and use it for real-time data communication.

### Landing

- **Description**: The `Landing` component serves as the entry point for the application. It allows users to input their GitHub username and initiate the roasting process. The component manages the state for the input field and handles the submission of the username.

### Roasting

- **Description**: The `Roasting` component displays the generated roast for the given GitHub username. It uses the `useTypingEffect` hook to reveal the roast text with a typing animation. The component listens for real-time updates from the server via the Socket.IO connection and updates the displayed roast accordingly.

## Hooks

### `useTypingEffect`

- **Description**: This custom hook is designed to simulate a typing effect for text. It takes a string and a delay as inputs and returns the text gradually revealed as if it were being typed. This effect adds a dynamic and engaging feel to the roast display, making it appear more interactive.


## Usage

1. **Landing Page**: Enter a GitHub username to start the roasting process.
2. **Roasting Page**: View the generated roast with a typing effect.
3. **Theme Switcher**: Toggle between light and dark modes using the theme switcher.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/fooBar`).
3. Commit your changes (`git commit -am 'Add some fooBar'`).
4. Push to the branch (`git push origin feature/fooBar`).
5. Create a new Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.
