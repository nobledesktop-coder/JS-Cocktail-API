// Lesson 09.03 - PROG
// Cocktail API 

/* There are 3 ways to get cocktails: 
- search box: input keyword /ingredient
- select menu: choose keyword / ingredient
- button: get random cocktail
ALL 3 ways call the same function: getCocktail
*/

// Get the DOM elements:

// 1. Get search box (input) and have it call fetchCocktail():
const searchBox = document.getElementById('search-box');
searchBox.addEventListener('change', fetchCocktail);

// 2. Get the select menu and have it call fetchCocktail():
const selectMenu = document.getElementById('menu');
selectMenu.addEventListener('change', fetchCocktail);

// 2B-2G: Make the options for select menu, dynamically using cocktail-keywords.js
// which contains a big array of keywords. The idea is choose from menu to load all drinks which include that keyword in the name

// 2B. Sort the cocktailKeywords array in alphabetical order:
cocktailKeywords.sort();

// 2C. Iterate the cocktailKeywords array:
cocktailKeywords.forEach(kw => {
    // 2D. Make an option tag for that keyword
    const optn = document.createElement('option');
    // 2E. Give option its value, which is the keyword, to lowercase:
    optn.value = kw.toLowerCase();
    // 2F. Give option its text, which is keyword as is (capitalized):
    optn.text = kw;
    // 2G. Append option to the select menu:
    selectMenu.appendChild(optn);
});

// 3. Get the Random button and have it call fetchCocktail():
const randBtn = document.querySelector('#rand-btn');
randBtn.addEventListener('click', fetchCocktail);

// 4. Get the button div (letter button holder)
const letterBtnDiv = document.getElementById('letter-btn-div');

// 4B-2X: Make the letter buttons, each w id = the letter
// clicking letter sends req to API for all cocktails
// starting w that letter

// 4C. Make an array of letters from A-Z, dyanmically
//     using str.charCodeAt and String.fromCharCode(i)
const lettersArr = [];
let startCharCode = "A".charCodeAt(0); // 65
let endCharCode = startCharCode + 26; // 91
for(let i = startCharCode; i < endCharCode; i++) {
    let letterFromCharCode = String.fromCharCode(i);
    lettersArr.push(letterFromCharCode);
}
console.log(lettersArr); // ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

// 4D. Iterate letters array, making a button for each letter:
lettersArr.forEach(letter => {
    // 4E. Make a button for each letter, except for "U" and "X":
    if(letter != "U" && letter != "X") {
        const letterBtn = document.createElement('button');
        // 4F. Assign the button its class:
        letterBtn.className = "letter-btn";
        // 4G. Assign the button its text, which is just the letter:
        letterBtn.textContent = letter; 
        // 4H. Assign the button its id, which is letter to lowercase:
        letterBtn.id = letter.toLowerCase(); // assign btn id of letter
        // 4I. Have button call fetchCocktail function on click:
        letterBtn.addEventListener('click', fetchCocktail);
        // 4J. Append letter button to letter button div / holder:
        letterBtnDiv.appendChild(letterBtn);
    }
});

// 5. Get the "Cocktail Box" (where all results appear)
const cocktailBox = document.querySelector('#cocktail-box');

// 6. Define the fetchCocktail() function
/*
all 3 ways of hitting API use the same func: text input, select menu, random button function concats rest of url from id of elem that is calling the func API returns JSON for the cocktail(s); structure is one obj w "drinks" key, the value of which is an array of individual drink objects each drink obj has numerous keys, including strDrink, strGlass, among others; oddly, the ingredients and measures are NOT arrays, but instead are individual key-value pairs: strIngredient1: "rum", strIngredient2: "lime juice", etc. (same for corresponding strMeasure1, strMeasure2, etc) function will loop the array of drink results, making divs containing img of drink, name of drink, glass, instructions, and even a ul of ingredients with their measures
*/

function fetchCocktail() {

    // 7. Save the base url to a var. All queries to API 
    //    start with this same base url: 
    //    note correct url does not have www.
    let apiUrl = "https:thecocktaildb.com/api/json/v1/1/";

    // 7B. Clear the cocktail-box for a fresh load:
    cocktailBox.innerHTML = "";
    
    /* Add the custom part to the API URL: finish the API URL by adding value 
    (or id) of element that called the func. In the case on the input box and 
    the select menu, we want to add the value to the URL but in the case of 
    the random button, the URL is already complete */

    // 8. Decide which API request we are making: Keyword Search, Select Menu or Random Button and complete the API URL, accordingly:
    if(this.id == "search-box" || this.id == "menu") {
        apiUrl += 'search.php?s=' + this.value;
    // if id of elem calling func is just 1 char long, it's letter btn:
    } else if(this.id.length == 1) { 
        apiUrl += 'search.php?f=' + this.id;
    } else { // only other search elem is Random Btn
        apiUrl += 'random.php';
    }

    // 9. Send the fetch() request to the API:
    fetch(apiUrl, {method:"GET"})
    .then(j => j.json())
    .then(obj => {
        // the result is an object, represented here as obj
        // the obj has just one key: "drinks"
        // the value of drinks is an array of drink objects
        // each drink object has keys, the values of which
        // are what we want to display on the DOM 
        // log the name of the first drink:
        // console.log('obj.drinks:', obj.drinks);

        // 10. Sort results by strDrink (drink name from A-Z)
        // this involves sorting an array of obj by a string key
        obj.drinks.sort((a,b) => a.strDrink > b.strDrink ? 1 : -1);
        console.log('obj.drinks:', obj.drinks);

        // Output drinks to "cocktail-box" div, one drink per child div
        
        // 11. Iterate drinks array
        obj.drinks.forEach(drink => {

            // 12. Make div of class drink-div:
            const drinkDiv = document.createElement('div');
            
            // 13. Assign the div its class and output it:
            drinkDiv.className = 'drink-div';
            cocktailBox.appendChild(drinkDiv);

            // 14. Output the name of the drink to drinkDiv:
            const drinkH2 = document.createElement('h2');
            drinkH2.textContent = drink.strDrink;

            // 15. Output the h3 drink name to drinkDiv
            drinkDiv.appendChild(drinkH2);

            // 15B. Output the glass under the h2 name, as:
            //      Cocktail glass, Martini glass (etc.)
            //     probably does not need its own tag: 
            //     just the text inside the drinkDiv
            //     right under the h2
            drinkDiv.innerHTML += drink.strGlass;

            // 16. Make drink text div to hold all content
            //     which comes between h2 drink name and 
            //     drink image -- this is a scrolling box
            //     so that all can be same height 
            const drinkTextDiv = document.createElement('div');
            drinkTextDiv.className = "drink-text-div";
            drinkDiv.appendChild(drinkTextDiv);

            // 17. Make a p-tag, put instructions in it, 
            //     and output p-tag to the drinkTextDiv:
            const instructionsP = document.createElement('p');
            instructionsP.textContent = drink.strInstructions;
            drinkTextDiv.appendChild(instructionsP);

            // 18. Output the static string "Ingredients:"
            drinkTextDiv.innerHTML += "Ingredients:";
            // 19. Make a ul for the ingredients-measures list:
            const ul = document.createElement('ul');

            // 20. Make the li tags on a loop:
            for(let i = 1; i <= 15; i++) {
                // 21. Concat the key name: strIngredient1, etc.
                let ingred = "strIngredient" + i;
                // 22. Make if statement check if ingred is not falsey
                //     so, if the ingredient is null, it won't make an li:
                if(drink[ingred]) {
                    const li = document.createElement('li'); 
                    // 23. Concat corresponding measure: strMeasure1, etc.
                    let measur = "strMeasure" + i;
                    // 24. Assign ingred - measur as text content of li:
                    li.textContent = drink[ingred] + " - " + drink[measur];
                    // 25. Add the li to the ul     
                    ul.appendChild(li); 
                // 26. else drink[ingred] is falsey / null, so end loop:
                } else { // drink ingredient is null
                    break; // end loop (all subsequent ingredients are also null)
                }
            } // end for loop through the ingredients - measures

            // 26. Output the finished ul to the drinkTextDiv
            drinkTextDiv.appendChild(ul);

            // 27. Make drink image -- last element in drink div:
            let drinkPic = new Image();
            drinkPic.src = drink.strDrinkThumb;
            drinkDiv.appendChild(drinkPic);

        });

    })
    
    // for
            console.log('drink:');
            // the ingredients come in as separate properties: 
            // 'strIngredient1': 'rum', 'strIngredient2': 'ginger ale', etc.
            // all obj have same number of 'strIngredientN' properties, so some of them 
            // are null; this makes outputting ingredients list difficult
            // start by getting all the non-null ingredients into an array of strings:
            // []
            // for
                // if key includes 'strIngredient', it is an ingredient
                // if drink[key] is true, the key is not null (not falsey)
                // 'strIngredient'
                    // Tequila Sour lists "lemon" twice as an ingredient
                    // so only push not-yet-included ingredients into array:
                    // if ! key
                        // push
                        // add the correspondingly numberered strMeasure to the array,
                        // getting the number from the last char of strIngredient
                        let num;
                        console.log('num:', num);
                        // "strMeasure"
     
            console.log('\ningredMeasurArr:');

            // "div"
            // "drink-div"
            // append

            // 'h1'
            // drink.
            // append

            // 'div'
            // 'drink-text-div'
            // append

            // 'p'
            // drink.
            // append
    
            // ingredients + measure list:
            // 'h3'
            // "Ingredients:"
            // append   

            // 'ul'
            // append
            
            // loop the ingredients + measures array, where these are consecutive items
            // increment by += 2 each time to get pairs: ingredient + measure
            // for
                // 'li'
                // add the ingredient and its measure as the text of the list item:
                let ingredient;
                let measure; // replace null measures with empty string
                // text
            //  append
            // }

            // Glass:
            // 'p'
            // append
            // "Serve in "
            // "italic"
            // 0
            // 0
            // append

            // new
            // src
            // append

            // if ! br
        // }
    // })
    // .catch(err => console.log("Something went wrong", err))

} // end function fetchCocktail() 

// Challenge 2: Make 26 buttons, one per letter, and put them into the btn-div. The css for the buttons is already done. Use the letter-btn class for each button. Have each button call a function called getCocktailsByLetter():
// Hint: refer to Chinese Zodiac Animals (06.02-06.03) for how to make elements dynamicallyw/ a loop.
// Hint 2: each button needs an id and text content, which in both cases is just the letter.

// "btn-div"

// for (let l = 'A'; l <= 'Z'; l = String.fromCharCode(l.charCodeAt(0) + 1)) {
//     let l = lettersArr[i];
//     if(l == "U" || l == "X") continue;
//     const button = document.createElement("button");
//     button.textContent = l;
//     button.id = l.toLowerCase();
//     button.className = "letter-btn";
//     button.addEventListener("click", getCocktail);
//     btnDiv.appendChild(button);
// }

// "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
// ''

// for (let l = 'A'; l <= 'Z'; l = String.fromCharCode(l.charCodeAt(0) + 1)) {
// forEa
    // "U" "X"
        // "button"
        // l
        // Case
        // "letter-btn"
        // "click"
        // append
//     }
// });

// for(let i = 0; i < lettersArr.length; i++) {
//     let l = lettersArr[i];
//     if(l == "U" || l == "X") continue;
//     const button = document.createElement("button");
//     button.textContent = l;
//     button.id = l.toLowerCase();
//     button.className = "letter-btn";
//     button.addEventListener("click", getCocktail);
//     btnDiv.appendChild(button);
// }

// sort

// for(let i = 0; i < cocktailkKeywords.length; i++) {
// forEa
    // 'option'
    // val
    // ". "
    // "-" ". - (hyphen)"
    // append
// });

/*
I added ingredients to the text. This was tricky to do, because the ingredients don't come as an array, which is what you want. Instead, they come in as a bunch of separate properties: "strIngredient1": "rum", "strIngredient2": "ginger ale", -- like that.
To make it even trickier to get the ingredients in a clean, usable format, all drink objects have the same number of "strIngredient" properties, but with the value set to null when they run out of actual ingredients..
What we need to do is extract the values of all keys that include the sub-string "strIngredient" AND (&&) whose values are not null.
To get the ingredient values into a new array, I looped the drink object, key by key, pushing to a new array all those values whose key includes the sub-string "strIngredient"..
We didn't do much looping of objects by key in this course--we mostly looped arrays--so this is an EXCELLENT example to study closely so as to add "looping objects by key" to your ever-growing repertoire of JS moves:
I made the ingredients as a bulleted list, so to hold the p tag and list, I made a new div under the h3, called drinkText. Inside drinkText goes the drink info, followed by an h3 that says "ingredients".
Beneath the h3 comes the bulleted list (ul tag with li tags nested inside). There needs to be one li for each ingredient, so we loop the ingredientsArr, making one li each time.. I used forEach() for this, as opposed to a for loop, just to give you some practice w the forEach() array method.
Below, the new code for all this is bolded within the context of the entire second then() .. The new sort() code is also bolded in case you missed that upgrade, posted previously to Slack here..
There is new CSS to go with this, as well. That too is pasted below:
*/