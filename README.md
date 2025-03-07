# Dublin Football NG

This is an Angular-based project designed for building a web application related to Dublin Football. The project utilizes several Angular modules, third-party libraries, and UI components to deliver a rich and interactive user experience.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Development Server](#development-server)
- [Build](#build)
- [Running Unit Tests](#running-unit-tests)
- [Dependencies](#dependencies)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js**: [Download Here](https://nodejs.org/)
- **npm**: Comes with Node.js by default
- **Angular CLI**: Install globally using:

  ```bash
  npm install -g @angular/cli
  ```

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-repo/dublin-football-ng.git
   cd dublin-football-ng
   ```

2. Install all required dependencies:

   ```bash
   npm install
   ```

---

## Development Server

Run the development server to start the application:

```bash
npm start
```

After running this command, navigate to `http://localhost:4200/` in your browser to view the application. The application will automatically reload if you make any code changes.

---

## Build

To build the project for production, run:

```bash
npm run build
```

The compiled project files will be located in the `dist/` directory.

---

## Running Unit Tests

You can execute the unit tests using the following command:

```bash
npm test
```

This will run all tests through Karma and display the results.

---

## Dependencies

The project uses the following libraries and frameworks:

### Angular Core:

- `@angular/animations`
- `@angular/common`
- `@angular/core`
- `@angular/forms`
- `@angular/material`
- `@angular/platform-browser`
- `@angular/router`

### Third-Party Libraries:

- `ag-grid-angular`: For grid-based data tables.
- `jquery`: A popular JavaScript library.
- `ngx-slick-carousel`: For implementing slick carousels.
- `ng-image-slider`: For image sliders in Angular.
- `slick-carousel`: Carousel implementation.
- `rxjs`: Reactive programming utilities for Angular.
- `zone.js`: Required by Angular.

### Development Tools:

- `@angular/cli`: Command-line interface for Angular.
- `typescript`: TypeScript support for development.
- `karma`, `jasmine`: For unit testing.

---

## Troubleshooting

### Common Issues:

1. **Compatibility Errors**:
   Ensure all installed Angular packages are on the same version. Use this command to verify:

   ```bash
   npm list @angular/core
   ```

2. **Missing Dependencies**:
   Run the following command to install missing dependencies:

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run Cache Cleanup**:
   Clear the npm cache in case of issues with installation:

   ```bash
   npm cache clean --force
   ```

4. **TypeScript Compilation Errors**:
   If you encounter issues, check the `tsconfig.json` file for invalid settings and ensure dependencies align correctly.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## Contributing

We welcome contributions to the Dublin Football project! If you'd like to contribute, please submit a pull request or feel free to log an issue.

---

## Author

Developed by a passionate Angular Developer. 🎉
