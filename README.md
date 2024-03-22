# Shopify-ecommerce

## Description
This is a MERN Stack website where front end part is done using React and Basic CSS but for Navbar and Cart Badge Bootstrap has been used and for Modal AntD has been used. React has been used for rest all the Frontend part. For Backend purpose Express has been used for server and MongoDB for database. Every filter like search and others like price and Category is being controlled by backend. The backend also accepts images which is sent to backend using formidable(NodeJS Library) and fs(FileSystem-Node Library). React has been used for rest all the Frontend part. This uploaded file is the Production build of react

## User

User can buy products by adding them to the cart. This app also has payment gateway bbut the payment button is disabled until user add an item to the cart. It has filter in its right bottom corner. This app has infinite scroll so user can load the page without much force on internet. It also has search and price filter for easy navgation through products. Items can be added to cart or removed from the same without login but for order user must register or login through their account. User can also change address before proceeding for payment

## Admin

Admin has the access to order of all users and can change the process of order from NotProcess to Processing to Shipped to Delivered to Cancel, all options are given to admin.
Admin can also add or remove product and can also add or remove category or edit both. At the same time admin can't place order so the order button will be disabled for admin.
