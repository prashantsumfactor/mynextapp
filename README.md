Section-2:

1. What is next js - Next.js is a flexible React framework that gives you building blocks to create fast web applications.
2. Benefite of next js -
    - Different render technique [ static, server, incremental side regeneration]
    - Performance [ code splitting, minifying, image optimize, pre-fetching assets]
    - File based routing 
    - SEO - make your page top of other by doing proper formatting of page/code.
    - Serverless fundtion - call function start server-> execute with new server -> shut down.

3. Why next.js popular.

Section-3:
    
1. Create new project discover coffee store, and run dev server also see how it is llok like in browser.
2. upgrade version of next and lib & fix issue.
3. feature of next.js 
4. Fast refresh
5. CSS modules work based on scope on same name class
6. Background update and text color.
7. Banner component.

Section-4:

1. Routing in next
2. Add routRoutinger
3. Dynamic routing with custom ID
4. Linking non-dynamic
    - By 'a' with referesh page, also for external links
    - By 'Link' without refresh page, linking within application
5. Linking dynamic
    - By 'Link' mention path

Section-5:

1. Home page update style.
2. Hero image on home
3. image component
4. Font download and apply
5. Create document file
    - Html have 2 part - head & body
    - _app.js is responsible for only 'body', and routing for all page
    - 'html', 'head' can be done by _document.js [ entire application]

Section-6:

1. SEO
2. Pre-rendering, hydration
3. Rendering techniques
    - SSG : static generation
    - ISR : incremental site regeneration
    - SSR : server side renedering
4. Performance
5. CDN - content delivery network
6. SSG - generate at build time external data [ without load all static files, with fetch api data in advance and
   pre-render later after build ]
7. ISG - reload data after every time period & generate HTML
8. SSR - server side rendering . new HTML generate every time
9. CSR - all operation handle on client side. rendering pages directly in the browser using JavaScript

Section-7:

1. component arch
2. Card component
3. apply card style
4. grid layout for card
5. add coffee store data [ json ]
6. add coffee store on page
7. pre-render in coffee store page getStaticProps
8. implement Static site generation - with external data
9. Characteristics of Get Static Props
10. coffee store heading
11. getStaticPaths implement
12. Characteristics of Get Static Paths
13. getStaticPaths in code
14. fallback key
15. show coffee data in dynamic page
16. fallback true and false cases
17. refactor page update name of dynamic page
18. Coffee store details page
19. add icon and image
20. Coffee store page styling
21. Foursquare account set-up and ket generate
22. Foursquare place api
23. rate limit
24. Foursquare API playground
25. Foursquare get static paths
26. Fetch API async await
27. Env local variable vs next.config
28. coffee store lib
29. Update foursquare api in getStaticPaths
30. update coffee store details data
31. set-up unsplash API
32. invoke unsplash api p-1
33. invoke unsplash api p-2
34. update coffee-store library with images
35. unsplash api per page -30
36. display all coffee store card image
37. update each card with different image
38. update app styling

Section-8 :

1. Geolocation api
2. using react hook
3. creat hook for retrieving location
4. use hook for getting location
5. use effect in function
6. CSR, client side rendering
7. display coffee store by location
8. refresh dynamic route (non static)
9. fallback in next
10. use react context and why use it
11. create store context
12. create store reducer in context
13. store coffee stores in StoreContext
14. coffee store page with context
15. coffee store page for non SSG route
16. refactor coffee store page