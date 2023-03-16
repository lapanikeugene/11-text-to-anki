# Read favorite texts and learn languages.
[DEMO LINK](https://kanji-helper.com/kotoba/)

## Description
User add text to the indexedDB, and choose words he don't know. Then when user will add next texts that words will be highlighted. In addition, user can download csv files for anki, special program, that using flash cards and spaced repetition system. 
it can be used not only with Japanese but also with other languages that has spaces. 
[Full description](https://www.linkedin.com/pulse/how-i-created-kotoba-project-from-prototype-eugene-lapanik-/)
 
## Aim. 
I would like to learn new technologies related to frontend stack. That's why I used here zustand instead of redux toolkit. 

## Technologies Used
1. React
2. Zustand
3. Dexie.js. This library makes work with indexeddb easier.  
4. Typescript
5. Tailwind 
6. Material UI
7. Jest
8. Intl.Segmenter to separate Japanese sentences to array of words, because Japanese language hasn't spaces between words.
9. Franc (https://www.npmjs.com/package/franc) to define language of text. 


## Features
0.  Mobile first. Site's design is fully responsive. 
1.  Zustand as state managmenent system.
2.  IndexedDB as database 
3.  Light/dark mode 
5.  Dynamical search. 
6.  Jest tests.
7.  Plenty of custom hooks.

## Lessons Learned During Development
-  How to implement dark and light modes.
-  How to use factory design pattern. 
-  How to test app with Jest.
-  Using zustand 
-  Using Material UI
-  How to move some parts of code in separate classes

![Screenshot](https://media.licdn.com/dms/image/D4E12AQHX4v-JCKdlpA/article-cover_image-shrink_423_752/0/1678893885205?e=1684368000&v=beta&t=T4TlyWCRmkeU6mT1Rrv_QlEsOot2PpWzqMyoU30gDqs "Screenshot")


## Planned Features
1. Fix all bugs.
2. Add opportunity not only add words into db but also phrases. 
3. Themes
4. Add opportunity to change language of text. 
5. Online sync.
6. Backup system. 



