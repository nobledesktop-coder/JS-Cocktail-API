// Lesson 09.03 - START
// Cocktail API 

/* There are 3 ways to get cocktails: 
- search box: input keyword /ingredient
- select menu: choose keyword / ingredient
- button: get random cocktail
ALL 3 ways call the same function: getCocktail
*/

// get the search box (input):


// get the select menu:


// searchUrl + "i=" + this.value

// get Random Cocktai btn
// click Random Cocktail btn to call function

// output here

// define getCocktail() function:

    // "https:thecocktaildb.com/api/json/v1/1/"
    
        // `search.php?s=`
   
        // `search.php?f=`

        // "random.php"

    // "search-box" ""
    // "menu"
    // "GET"
    // .t
    // .t
        console.log('obj.drinks[0]:');
        // ""
        // sort results by strDrink (drink name from A-Z)
        // obj
        // a,b 1 -1
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
// };

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

// make the select menu choices
const cocktailkKeywords = [
    "Amaretto", "Beer", "Black", "Bloody", "Bourbon", "Fizz",
    "Brandy", "Cherry", "Chocolate", "Coffee", "Coke", "Cream",
    "Gin", "Green","Iced", "Island", "Lemon", "Lime", "Liqueur", 
    "Milk", "Orange", "Red", "Rum", "Salt", "Scotch", "Soda", 
    "Sour", "Spiced", "Tea", "Tequila", "Vodka", "Whiskey", "Wine",
    "Royal", "Punch", "Peach", "Cranberry", "Russian", "Captain", 
    "Port", "Cooler", "Smash", "Cocktail", "Irish", "Jamaican",
    "Tonic", "Slammer", "Apple", "Grape", "Cider", "High", "Long",
    "Caribbean", "Hot", "Almond", "Shot", "-", "Sweet", "Old",
    "Banana", "Classic", "Electric", "Big", "Bermuda", "English",
    "Italian", "Smoothie", "Ginger", "Banana", "Papaya", "Frozen",
    "Pineapple", "Kiwi", "Rose", "Blue", "Mojito", "Martini",
    "French", "Mango", "Negroni", "Golden", "Night", "Cold", 
    "Mint", "Daiquiri", "Margarita", "Smash", "Shake", " and ", 
    "Sling", "Berry", "Champagne", "Jack", "Hawaii", "Cordial", 
    "Fruit", "Spring", "Spice", "Toddy", "Watermelon", "Lassi ", 
];

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
I made the ingredients as a bulleted list, so to hold the p tag and list, I made a new div under the h1, called drinkText. Inside drinkText goes the drink info, followed by an h3 that says "ingredients".
Beneath the h3 comes the bulleted list (ul tag with li tags nested inside). There needs to be one li for each ingredient, so we loop the ingredientsArr, making one li each time.. I used forEach() for this, as opposed to a for loop, just to give you some practice w the forEach() array method.
Below, the new code for all this is bolded within the context of the entire second then() .. The new sort() code is also bolded in case you missed that upgrade, posted previously to Slack here..
There is new CSS to go with this, as well. That too is pasted below:
*/