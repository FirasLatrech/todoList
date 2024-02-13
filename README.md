# Front-end guidelines

## Overview

These guidelines are destined for all front-end developers in SoftyLines.

The first step any new developer should take before starting on a production project is to read these guidelines and use only the 
company starters.

You should not create your own starter for a production project.

These guidelines allow us to :

 - Ensure consistent code quality across all our projects by following the same coding standards and practices

 - Facilitate collaboration among multiple developers working on the same codebase. This makes it easier for developers even to  
   review each other's code, debug issues, and onboard new team members

 - Serve as a reference point for understanding the project structure, coding conventions, and development workflows,... 
 

## Contributing

The developer is not free to choose his own architecture and starter; he should follow the guidelines.
The quality and consistency of code are more important that the developer freedom, but we welcome any suggestion that will ameliorate there guidelines.
If you have any amelioration or suggestion you should create a suggestion/new-update-name branch with a detailed commit described why you want to update or add guideline

## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

## General Development Guidelines

  ### Performance

     - Minimize Http requests, duplicated calls

    - Minimize Component Renders: Optimize your components to render only when necessary :
      Loading only the necessary resources on-demand

    - Lazy Loading: Utilize React.lazy and Suspense to lazily load components that are not immediately required. This can improve 
      the perceived performance of your application by deferring the loading of non-essential components until they are needed.

    - Memoization: Use memoization techniques, such as useMemo or useCallback, to memoize expensive calculations or function 
      references. This can prevent unnecessary recalculations and improve the performance of your components.

    - Using appropriate image formats (e.g., SVG, WebP)

  ### Testing 

   "a developer who is good at testing is a good developer"

   "Don't use testers as bug catchers"

   Is your responsability to test your code on different devices and with different cases to catch issues and bugs before 
   committing
  
 
  ### Code line length

    Code lines shouldn't be so long that they require horizontal scrolling to read (long lines need to be breaking)

## General Coding Rules

 ### Write a readable code

    "keep it simple, stupid"

    prioritize clarity and simplicity and avoid complexity in your code to enhance readability and maintainability.

 ### Don't Repeat yourself (DRY)
    
    If you find yourself duplicating any code that has already been defined elsewhere in the codebase, take the opportunity to refactor it in a way that ensures there's only a single representation of that code throughout


 ### Comments

    - Use comment only to explain some decision, architecture that cannot be explained in code
    - For information (to be refactored, ...) 
    - keep comments brief and informative

### Code Standards Guidelines

  ### React
    ## Use JSX ShortHand

Try to use JSX shorthand for passing boolean variables. Let\'s say you want to control the title visibility of a Navbar component.

**Bad:**

```jsx
return (
  <Navbar showTitle={true} />
);
```

**Good:**

```jsx
return(
  <Navbar showTitle />  
)
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Use Ternary Operators

Let\'s say you want to show a particular user\'s details based on role.

**Bad:**

```jsx
const { role } = user;

if(role === ADMIN) {
  return <AdminUser />
}else{
  return <NormalUser />
} 
```

**Good:**

```jsx
const { role } = user;

return role === ADMIN ? <AdminUser /> : <NormalUser />
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Use Object Literals

Object literals can help make our code more readable. Let\'s say you want to show three types of users based on their role. You can\'t use ternary because the number of options is greater than two.

**Bad:**

```jsx
const {role} = user

switch(role){
  case ADMIN:
    return <AdminUser />
  case EMPLOYEE:
    return <EmployeeUser />
  case USER:
    return <NormalUser />
}
```

**Good:**

```jsx
const {role} = user

const components = {
  ADMIN: AdminUser,
  EMPLOYEE: EmployeeUser,
  USER: NormalUser
};

const Component = components[role];

return <Componenent />;
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Use Fragments

Always use Fragment over Div. It keeps the code clean and is also beneficial for performance because one less node is created in the virtual DOM.

**Bad:**

```jsx
return (
  <div>
     <Component1 />
     <Component2 />
     <Component3 />
  </div>  
)
```

**Good:**

```jsx
return (
  <>
     <Component1 />
     <Component2 />
     <Component3 />
  </>  
)
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Do not define a function inside Render

Don\'t define a function inside render. Try to keep the logic inside render to an absolute minimum.

**Bad:**

```jsx
return (
    <button onClick={() => dispatch(ACTION_TO_SEND_DATA)}>    // NOTICE HERE
      This is a bad example 
    </button>  
)
```

**Good:**

```jsx
const submitData = () => dispatch(ACTION_TO_SEND_DATA)

return (
  <button onClick={submitData}>  
    This is a good example 
  </button>  
)
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Use Memo

React.PureComponent and Memo can significantly improve the performance of your application. They help us to avoid unnecessary rendering.

**Bad:**

```jsx
import React, { useState } from "react";

export const TestMemo = () => {
  const [userName, setUserName] = useState("faisal");
  const [count, setCount] = useState(0);
  
  const increment = () => setCount((count) => count + 1);
  
  return (
    <>
      <ChildrenComponent userName={userName} />
      <button onClick={increment}> Increment </button>
    </>
  );
};

const ChildrenComponent =({ userName }) => {
  console.log("rendered", userName);
  return <div> {userName} </div>;
};
```

Although the child component should render only once because the value of count has nothing to do with the ChildComponent. But, it renders each time you click on the button.
Output

Let\'s edit the ChildrenComponent to this:

**Good:**

```jsx
import React ,{useState} from "react";

const ChildrenComponent = React.memo(({userName}) => {
    console.log('rendered')
    return <div> {userName}</div>
})
```

Now no matter how many times you click on the button, it will render only when necessary.

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Use Object Destructuring

Use object destructuring to your advantage. Let\'s say you need to show a user\'s details.

**Bad:**

```jsx
return (
  <>
    <div> {user.name} </div>
    <div> {user.age} </div>
    <div> {user.profession} </div>
  </>  
)
```

**Good:**

```jsx
const { name, age, profession } = user;

return (
  <>
    <div> {name} </div>
    <div> {age} </div>
    <div> {profession} </div>
  </>  
)
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## String Props do not need Curly Braces

When passing string props to a children component.

**Bad:**

```jsx
return(
  <Navbar title={"My Special App"} />
)
```

**Good:**

```jsx
return(
  <Navbar title="My Special App" />  
)
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Remove JS Code From JSX

Move any JS code out of JSX if that doesn\'t serve any purpose of rendering or UI functionality.

**Bad:**

```jsx
return (
  <ul>
    {posts.map((post) => (
      <li onClick={event => {
        console.log(event.target, 'clicked!'); // <- THIS IS BAD
        }} key={post.id}>{post.title}
      </li>
    ))}
  </ul>
);
```

**Good:**

```jsx
const onClickHandler = (event) => {
   console.log(event.target, 'clicked!'); 
}

return (
  <ul>
    {posts.map((post) => (
      <li onClick={onClickHandler} key={post.id}> {post.title} </li>
    ))}
  </ul>
);
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Use Template Literals

Use template literals to build large strings. Avoid using string concatenation. It\'s nice and clean.

**Bad:**

```jsx
const userDetails = user.name + "'s profession is" + user.proffession

return (
  <div> {userDetails} </div>  
)
```

**Good:**

```jsx
const userDetails = `${user.name}'s profession is ${user.proffession}`

return (
  <div> {userDetails} </div>  
)
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Import in Order

Always try to import things in a certain order. It improves code readability.

**Bad:**

```jsx
import React from 'react';
import ErrorImg from '../../assets/images/error.png';
import styled from 'styled-components/native';
import colors from '../../styles/colors';
import { PropTypes } from 'prop-types';
```

**Good:**

The rule of thumb is to keep the import order like this:
Built-in
External
Internal
So the example above becomes:

```jsx
import React from 'react';

import { PropTypes } from 'prop-types';
import styled from 'styled-components/native';

import ErrorImg from '../../assets/images/error.png';
import colors from '../../styles/colors';
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Use Implicit return

Use the JavaScript feature of implicit return to write beautiful code. Let\'s say your function does a simple calculation and returns the result.

**Bad:**

```jsx
const add = (a, b) => {
  return a + b;
}
```

**Good:**

```jsx
const add = (a, b) => a + b;
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Component Naming

Always use PascalCase for components and camelCase for instances.

**Bad:**

```jsx
import reservationCard from './ReservationCard';

const ReservationItem = <ReservationCard />;
```

**Good:**

```jsx
import ReservationCard from './ReservationCard';

const reservationItem = <ReservationCard />;
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Reserved Prop Naming

Do not use DOM component prop names for passing props between components because others might not expect these names.

**Bad:**

```jsx
<MyComponent style="dark" />

<MyComponent className="dark" />
```

**Good:**

```jsx
<MyComponent variant="fancy" />
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Quotes

Use double quotes for JSX attributes and single quotes for all other JS.

**Bad:**

```jsx
<Foo bar="bar" />

<Foo style={{ left: "20px" }} />
```

**Good:**

```jsx
<Foo bar='bar' />

<Foo style={{ left: '20px' }} />
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Prop Naming

Always use camelCase for prop names or PascalCase if the prop value is a React component.

**Bad:**

```jsx
<Component
  UserName="hello"
  phone_number={12345678}
/>
```

**Good:**

```jsx
<MyComponent
  userName="hello"
  phoneNumber={12345678}
  Component={SomeComponent}
/>
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## JSX in Parentheses

If your component spans more than one line, always wrap it in parentheses.

**Bad:**

```jsx
return <MyComponent variant="long">
           <MyChild />
         </MyComponent>;
```

**Good:**

```jsx
return (
    <MyComponent variant="long">
      <MyChild />
    </MyComponent>
);
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Self-Closing Tags

If your component doesn\'t have any children, then use self-closing tags. It improves readability.

**Bad:**

```jsx
<SomeComponent variant="stuff"></SomeComponent>
```

**Good:**

```jsx
<SomeComponent variant="stuff" />
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Underscore in Method Name

Do not use underscores in any internal React method.

**Bad:**

```jsx
const _onClickHandler = () => {
  // do stuff
}
```

**Good:**

```jsx
const onClickHandler = () => {
  // do stuff
}
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

## Short-Circuit evaluation in JSX

**Bad:**

```jsx
// Avoid
const sampleComponent = () => {
  return isTrue ? <p>True!</p> : null
};
```

**Good:**

```jsx
// Recommended: short-circuit evaluation
const sampleComponent = () => {
  return isTrue && <p>True!</p>
};
```

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>


  ### CSS/SCSS

    - Use the naming convention followed in the starter, do not use other rules.

    - Use SCSS variables (like colors) appropriately to ensure you code is kept DRY

        // no
          h3 {
            color: white;
          }

          // yes
          $white: #fff;

          h3 {
            color: $white;
          }

      
    - Each selector and style declaration should be on its own line to help with Git diffs and error reporting.

      // good
          h3,
          .title,
           {
            color: blue;
          }

          // not so good
          h3, .title {
            color: blue
          }
        
    - Write colours in lowercase

    - Use whitespace to aid readability. Anything which modifies the context such as a selector or a media query should be preceded with a blank line
        
        // bad
          .foo {
            color: $blue;
            @media screen and (min-width: 1000px) { 
              color: $yellow;
            }
            .bar {
              color: $red;
              @media screen and (min-width: 1000px) { 
                color: $green;
              }
            }    
          }

          // good
            .foo {
              color: $blue;

              @media screen and (min-width: 1000px) { 
                color: $yellow;
              }

              .bar {
                color: $red;

                @media screen and (min-width: 1000px) { 
                  color: $green;
                }
              }
            }

  ### Packages

  - Check for Active Maintenance: Ensure that the package is actively maintained by checking its GitHub repository or other relevant sources. Abandoned or unmaintained packages may introduce security vulnerabilities and compatibility issues

  - Bundle Size Optimization: Be mindful of the impact of external packages on your application's bundle size. Larger bundles can lead to slower load times. Use tools like Webpack Bundle Analyzer to analyze the bundle size and consider tree-shaking techniques to remove unused code

  - Documentation: read the documentation of external packages before integrating them into your project. Understanding how the package works and its API will help in efficient usage and troubleshooting

  - Minimalism: Avoid adding too many external dependencies unnecessarily. Each additional package increases the complexity of your project and introduces potential points of failure

 # Project structure 

Feature-based structure: In this approach, code is organized based on application features or modules. Each feature has its own folder containing all the related files, including HTML, CSS, and TypeScript. This structure helps in better separation of concerns and enables teams to work on different features independently.

To directly clone the project just use our command "npx create-softy-app ./{folder-name}"

```
/my-react-app                                                                                                                                 
|-- /.husky                                      # Husky directory to manage Git hooks
|-- /public                                      # Contains static assets like HTML files, images, etc.
|-- /src                                         # Source code for the application
    |-- /app                                     # App-level configuration and setup components
    |-- /modules                                 # Feature modules for the application
        |-- /auth                                # Authentication module containing related components and logic
        |-- /dashboard                           # Dashboard module with components specific to the dashboard feature
        |-- /shared                              # Shared resources used across the entire application
             |-- /assets                         # Static files like images, fonts, etc.
             |-- /components                     # Reusable components
                    |-- /Button
                         |-- Button.tsx          # Button component implementation
                         |-- _Button.scss        # Styles specific to the Button component
                         |-- index.tsx           # Entry file to export the Button component
                         |-- _index.scss         # Aggregated SCSS import file for the Button component
                    |-- index.scss               # Aggregated SCSS import file for all components
             |-- /features                       # Grouped feature-specific components
                    |-- /dashboard
                         |-- Dashboard.tsx       # Main dashboard component
                         |-- _Dashboard.scss     # Styles specific to the Dashboard component
                         |-- index.tsx           # Entry file to export the Dashboard feature component
                         |-- _index.scss         # Aggregated SCSS import file for the Dashboard feature
                    |-- index.scss               # Aggregated SCSS import file for all features
             |-- /guards                         # Route guards to manage access control
                     |-- AuthGuard.tsx           # Guard component for authenticated routes
                     |-- GuestGuard.tsx          # Guard component for guest-only routes
             |-- /hooks                          # Custom React hooks
             |-- /layout                         # Components related to the overall page layout
             |-- /providers                      # Context providers for state management
             |-- /routes                         # Application routing configuration
             |-- /store                          # Redux  state management store configuration
             |-- /types                          # TypeScript type definitions and interfaces
             |-- /utils                          # Utility functions
             |-- index.scss                      # Aggregated SCSS import file for all folders inside the module
        |-- index.scss                           # Aggregated SCSS import file for all fmodules
    |-- config.ts                                # Application configuration settings
    |-- i18n.ts                                  # Internationalization configuration
    |-- main.tsx                                 # Main entry point for the React application
    |-- vite-env.d.ts                            # TypeScript declaration file for Vite environment variables
```


# Git and branches

  ## naming

    - feature branches: these branches are used for developing new features or making changes to existing features. Feature branches 
      should be created off of the develop branch and should be named using the following convention: feature/<feature-name>
    - hotFix branches: these branches are for hotfixes in the prod (urgent fixes) hotFix/<fix-issue>
    - fix branches: these branches are for normal fixes 

  ## workflow

     The typical Git workflow for this project will involve the following steps:
        a. Pull the development branch: if it is a new feature always update your local develop branch with the remote changes and fix conflicts that exist. If it is a hotFix pull the specific branch (master/develop/staging) and fix conflicts if they exist.
        b. Create a feature branch: When starting work on a new feature or bug fix, create a new feature branch off of the main development feature (master or develop branch) using the naming convention described above.
        c. Work on the feature: Make the necessary changes to the code to implement the new feature or fix the bug. Commit to your changes regularly.
        d. Commit and Push branch: Don't commit the pre-push scripts. Fix all the eslint issues. Be sure that all the texts are translated into the three languages. No console log is allowed.
        f. Create a merge request: When you have finished working on the feature, create a merge request to merge your changes into the develop branch.
        g. Fix conflicts: if there are conflicts while creating a merge request, merge the development branch into your current branch fix conflicts, and push the branch with a clear commit like “update feature with develop”
        h. Testing: After a pull request is created, run the tests and check if everything is ok. Make sure that everything is working before updating the task status to “to be merged”
        i. Code review: The merge request will be reviewed by another member of the team.

    ❌ Don't work on the same branch for a long time. Each task has it is own branch
    
   ## TAM

    - Ensure that you have a ticket assigned to you before starting any task 
    - Ensure that your ticket has the tester and the reviewer (for code review) assigned as watchers
    - Ensure you answer the daily questions 
