# Product-Explorer Frontend Challenge

A production-ready, scalable Product Explorer application built with Angular 17+ standalone components, signals, and modern best practices. 

##Challenge Overview

Product Explorer is a small, production-like Single Page Application that allows users to browse a product catalog, search/filter products, view detailed product information, and save items to favorites. The architecture is designed with micro-frontend readiness in mind, showcasing how to build scalable enterprise applications.

## 🚀 Features

- **Product Catalog**: Browse products with advanced filtering and sorting capabilities
- **Product Details**: View comprehensive product information with parameterized routes
- **Favorites Management**: Save and manage favorite products with localStorage persistence
- **Search & Filter**: Real-time search, category filtering, and multiple sort options
- **Pagination**: Reusable pagination component for optimal data navigation
- **State Management**: Signal-based reactive state management with computed values
- **Performance**: Lazy loading, OnPush change detection, and optimized bundle size
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation, and focus management
- **Security**: Route guards for protected admin area and content sanitization
- **Testing**: Comprehensive unit tests with Jasmine and Karma


## Prerequisites

Before you begin, ensure you have the following installed:

```bash
# Check your Node.js version
node -v
# Should show v18.20.8 or higher

## Clone repo

```bash
git clone <repository-url>
```
## Navigate to the project directory

```bash
cd product-explorer
```

## Install Dependencies
To start a local development server, run:

```bash
npm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

## Running unit tests

This project uses [Karma](https://karma-runner.github.io) as the test runner for unit tests with Jasmine as the testing framework.

```bash
ng test
```




