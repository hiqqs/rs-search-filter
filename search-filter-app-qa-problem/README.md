# Product Search and Filter

In this exercise you will review and test a search query component that allows a user to search a list of items based on various filters.

The goal of this exercise is to focus on the logical functionality of the feature, we are not concerned with the app styling. Please review the requirements and user story below, and then proceed to each step in the exercise.

## Requirements
1. Search Functionality
   1. The application must provide a search input field where users can enter a search term.
   2. The search term should filter the list of items by matching the item names, case-insensitively.
   3. The search results should update dynamically as the user types in the search term.
2. Category Filter
   1. The application must dynamically populate a category dropdown based on the available categories in the items data.
   2. Users must be able to select a category from the dropdown to filter the items list.
   3. Only items belonging to the selected category should be displayed when a category is selected.
3. Price Range Filter
   1. The application must provide a dropdown for selecting a price range.
   2. Users must be able to select a price range from predefined options.
   3. Only items within the selected price range should be displayed when a price range is selected.
4. Rating Filter
   1. The application must provide a dropdown for selecting a minimum rating.
   2. Users must be able to select a minimum rating from predefined options.
   3. Only items with a rating greater than or equal to the selected rating should be displayed when a rating is selected.
5. Sorting
   1. The application must provide a dropdown for selecting a sorting option.
   2. Users must be able to sort the items by "Price: Low to High", "Price: High to Low", and "Rating: High to Low".
   3. The items list should be sorted according to the selected sorting option.
6. No Results Handling
   1. If no items match the search term or filter criteria, a message indicating "No results found" should be displayed.


## User Story

As a user,
I want to be able to search for items by entering a keyword,
so that I can quickly find items that match the search term.

I also want to filter items by category, price range, and rating,
so that I can narrow down the results to items that meet my criteria.

Additionally, I want to sort the items by price or rating,
so that I can view the items in my preferred order.

If no items match my search or filter criteria,
I want to see a message indicating that no results were found,
so that I know to adjust my search or filters.

# Step 1 - Get Familiar with the environment

This project requires `>= nodejs v18.16, >= npm 9.5.1`

open a terminal in the root project directory and run `npm install`

then run `npm run dev` and navigate to `[localhost:](http://localhost:5173/)` to view the site.

Please confirm the environment is working properly before proceeding to next steps.

# Step 2 - Test Planning, est. 1 hour

Create a high-level test plan and test cases for this feature. Use whatever format you are most comfortable with (text document, excel, etc...).

# Step 3 - Run Test Plan, est. 1 hour

Run all test cases from test plan manually and report results. There are a number of bugs present in this feature so be on the lookout for strange behavior!

# Step 4 (bonus), est. 1-2 hours

Fix as many bugs found in the previous step as you can, and then implement automated test coverage using playwright to confirm the fixes.

There is a basic playwright project enabled in the project in the `./tests` directory. Add tests to the `example.spec.js` file.


