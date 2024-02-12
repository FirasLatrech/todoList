# Front-end guidelines

## Overview

These guidelines are destined for all front-end developers in SoftyLines.

The first step any new developer should take before starting on a production project is to read these guidelines and use only the company starters.

You should not create your own starter for a production project.

These guidelines allow us to :
 - Ensure consistent code quality across all our projects
 - Facilitate collaboration among multiple developers working on the same codebase
 -
 -....

## Contributing

The developer is not free to choose his own architecture and starter; he should follow the guidelines.
The quality and consistency of code are more important that the developer freedom, but we welcome any suggestion that will ameliorate there guidelines.
If you have any amelioration or suggestion you should create a suggestion/new-update-name branch with a detailed commit described why you want to update or add guideline

## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

## General Development Guidelines

  ### Performance

    - Minimize Http requests, duplicated calls
    - Lazy loading
    - ....

  ### Testing 

   "a developer who is good at testing is a good developer"
   "Don't use testers as bug catchers"
   - Is your responsability to test your code on different devices and with different cases to catch issues and bugs before 
     committing
  
 
  ### Editor

## General Coding Rules

 ### Write a readable code
    "keep it simple, stupid"
 ### Don't Repeat yourself (DRY)

 ### Comments
    Use comment only to explain some decision, ....
### Code Standards Guidelines

  ### React
    - Component max size
    - Don't use semi-colons - javascript doesn't require them
    - .....

  ### CSS/SCSS

    - Utilise BEM

    - Use short hex values where applicable, e.g. #fff instead of #ffffff

    - Use SCSS variables (like colors) appropriately to ensure you code is kept DRY
        example
    
    - Each selector and style declaration should be on its own line to help with Git diffs and error reporting.
        example
        
    - Avoid inline CSS
        example

    - Use shorthand properties

    - Write colours in lowercase

    - Use whitespace to aid readability. Anything which modifies the context such as a selector or a media query should be preceded with a blank line

    - See about units

  ### Packages

  - Check for Active Maintenance: Ensure that the package is actively maintained by checking its GitHub repository or other relevant sources. Abandoned or unmaintained packages may introduce security vulnerabilities and compatibility issues

  - Bundle Size Optimization: Be mindful of the impact of external packages on your application's bundle size. Larger bundles can lead to slower load times. Use tools like Webpack Bundle Analyzer to analyze the bundle size and consider tree-shaking techniques to remove unused code

  - Documentation: read the documentation of external packages before integrating them into your project. Understanding how the package works and its API will help in efficient usage and troubleshooting

  - Minimalism: Avoid adding too many external dependencies unnecessarily. Each additional package increases the complexity of your project and introduces potential points of failure

 # Starter Architecture

/my-react-app                                                                                                                                 
|-- /.husky                     # Husky directory to manage Git hooks
|-- /public                     # Contains static assets like HTML files, images, etc.
|-- /src                        # Source code for the application
    |-- /app                    # App-level configuration and setup components
    |-- /modules                # Feature modules for the application
        |-- /auth               # Authentication module containing related components and logic
        |-- /dashboard          # Dashboard module with components specific to the dashboard feature
        |-- /shared             # Shared resources used across the entire application
             |-- /assets        # Static files like images, fonts, etc.
             |-- /components    # Reusable components
                    |-- /Button
                         |-- Button.tsx          # Button component implementation
                         |-- _Button.scss        # Styles specific to the Button component
                         |-- index.tsx           # Entry file to export the Button component
                         |-- _index.scss         # Aggregated SCSS import file for the Button component
                    |-- index.scss              # Aggregated SCSS import file for all components
             |-- /features      # Grouped feature-specific components
                    |-- /dashboard
                         |-- Dashboard.tsx       # Main dashboard component
                         |-- _Dashboard.scss     # Styles specific to the Dashboard component
                         |-- index.tsx           # Entry file to export the Dashboard feature component
                         |-- _index.scss         # Aggregated SCSS import file for the Dashboard feature
                    |-- index.scss               # Aggregated SCSS import file for all features
             |-- /guards        # Route guards to manage access control
                     |-- AuthGuard.tsx          # Guard component for authenticated routes
                     |-- GuestGuard.tsx         # Guard component for guest-only routes
             |-- /hooks         # Custom React hooks
             |-- /layout        # Components related to the overall page layout
             |-- /providers     # Context providers for state management
             |-- /routes        # Application routing configuration
             |-- /store         # Redux  state management store configuration
             |-- /types         # TypeScript type definitions and interfaces
             |-- /utils         # Utility functions
             |-- index.scss     # Aggregated SCSS import file for all folders inside the module
        |-- index.scss          # Aggregated SCSS import file for all fmodules
    |-- config.ts               # Application configuration settings
    |-- i18n.ts                 # Internationalization configuration
    |-- main.tsx                # Main entry point for the React application
    |-- vite-env.d.ts           # TypeScript declaration file for Vite environment variables



