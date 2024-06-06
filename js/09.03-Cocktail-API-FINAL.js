// Lesson 09.03 - FINAL
// Cocktail API 

/* There are 3 ways to get cocktails: 
- search box: input keyword /ingredient
- select menu: choose keyword / ingredient
- button: get random cocktail
ALL 3 ways call the same function: getCocktail
*/

// get the search box (input):
const search = document.querySelector('#search-box');
search.addEventListener('change', getCocktail);

// get the select menu:
const select = document.querySelector('select'); // for 
select.addEventListener('change', getCocktail);
// searchUrl + "i=" + this.value

const btn = document.querySelector('button'); // for Random Cocktail
btn.addEventListener('click', getCocktail);

const cocktailBox = document.querySelector('#cocktail-box'); // output here

// define getCocktail() function:
function getCocktail() {
    let url = "https:thecocktaildb.com/api/json/v1/1/";
    if(this.value) {
        url += `search.php?s=${this.value}`;
    } else if(this.id.length == 1) {
        url += `search.php?f=${this.id}`;
    } else {
        url += "random.php";
    }
    if(this.id != "search-box") search.value = "";
    if(this.id != "menu") select.selectedIndex = 0;
    fetch(url, {method: "GET"})
    .then(res => res.json())
    .then(obj => {
        console.log('obj.drinks[0]:', obj.drinks[0]);
        cocktailBox.innerHTML = "";
        // sort results by strDrink (drink name from A-Z)
        const drinksArr = obj.drinks;
        drinksArr.sort((a,b) => a.strDrink > b.strDrink ? 1 : -1);
        for(let i = 0; i < drinksArr.length; i++) {
            const drink = drinksArr[i];
            console.log('drink:', drink);
            // the ingredients come in as separate properties: 
            // 'strIngredient1': 'rum', 'strIngredient2': 'ginger ale', etc.
            // all obj have same number of 'strIngredientN' properties, so some of them 
            // are null; this makes outputting ingredients list difficult
            // start by getting all the non-null ingredients into an array of strings:
            const ingredMeasurArr = [];
            for(key in drink) {
                // if key includes 'strIngredient', it is an ingredient
                // if drink[key] is true, the key is not null (not falsey)
                if(key.includes('strIngredient') && drink[key]) { 
                    // Tequila Sour lists "lemon" twice as an ingredient
                    // so only push not-yet-included ingredients into array:
                    if(!ingredMeasurArr.includes(drink[key])) {
                        ingredMeasurArr.push(drink[key]);
                        // add the correspondingly numberered strMeasure to the array,
                        // getting the number from the last char of strIngredient
                        let num = drink[key].slice(-1);
                        console.log('num:', num);
                        ingredMeasurArr.push(drink["strMeasure" + key.slice(-1)]);
                    } 
                } 
            }
            console.log('\ningredMeasurArr:', ingredMeasurArr);

            const drinkDiv = document.createElement("div");
            drinkDiv.className = "drink-div";
            cocktailBox.appendChild(drinkDiv);

            let drinkNameH1 = document.createElement('h1');
            drinkNameH1.textContent = drink.strDrink;
            drinkDiv.appendChild(drinkNameH1);

            let textDiv = document.createElement('div');
            textDiv.className = 'drink-text-div';
            drinkDiv.appendChild(textDiv);

            let drinkInfoP = document.createElement('p');
            drinkInfoP.textContent = drink.strInstructions;
            textDiv.appendChild(drinkInfoP); 
    
            // ingredients + measure list:
            const h3 = document.createElement('h3');
            h3.textContent = "Ingredients:";
            textDiv.appendChild(h3);    

            const ul = document.createElement('ul');
            textDiv.appendChild(ul);  
            
            // loop the ingredients + measures array, where these are consecutive items
            // increment by += 2 each time to get pairs: ingredient + measure
            for(let j = 0; j < ingredMeasurArr.length; j+=2) {
                const li = document.createElement('li');
                // add the ingredient and its measure as the text of the list item:
                let ingredient = ingredMeasurArr[j];
                let measure = ingredMeasurArr[j+1] ? " - " + ingredMeasurArr[j+1] : ""; // replace null measures with empty string
                li.textContent = ingredient + measure;
                ul.appendChild(li);
            }

            // Glass:
            const glassP = document.createElement('p'); 
            textDiv.appendChild(glassP);
            glassP.textContent = "Serve in " + drink.strGlass;
            glassP.style.fontStyle = "italic";
            glassP.style.margin = 0;
            glassP.style.padding = 0;
            textDiv.appendChild(glassP); 

            let drinkPic = new Image();
            drinkPic.src = drink.strDrinkThumb;
            drinkDiv.appendChild(drinkPic);

        }
    })
    // .catch(err => console.log("Something went wrong", err))
};

// Challenge 2: Make 26 buttons, one per letter, and put them into the btn-div. The css for the buttons is already done. Use the letter-btn class for each button. Have each button call a function called getCocktailsByLetter():
// Hint: refer to Chinese Zodiac Animals (06.02-06.03) for how to make elements dynamicallyw/ a loop.
// Hint 2: each button needs an id and text content, which in both cases is just the letter.

const btnDiv = document.getElementById("btn-div");

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

let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lettersArr = letters.split('');

// for (let l = 'A'; l <= 'Z'; l = String.fromCharCode(l.charCodeAt(0) + 1)) {
lettersArr.forEach(l => {
    if(l != "U" && l != "X") {
        const button = document.createElement("button");
        button.textContent = l;
        button.id = l.toLowerCase();
        button.className = "letter-btn";
        button.addEventListener("click", getCocktail);
        btnDiv.appendChild(button);
    }
});

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

cocktailkKeywords.sort();

cocktailkKeywords.forEach((e,i) => {
    let option = document.createElement('option');
    option.value = e.toLowerCase();
    option.text = e;
    menu.appendChild(option);
});

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